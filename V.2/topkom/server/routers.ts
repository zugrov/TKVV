import { COOKIE_NAME } from "@shared/const";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createConnectionRequest, hasRecentConnectionRequest } from "./db";
import { sendLeadEmail } from "./leadEmail";

const requestAttempts = new Map<string, { count: number; resetAt: number }>();
const allowedTariffId = z.enum(["vv-10", "vv-20", "vv-50", "vv-100", "ss-3", "ss-6", "ss-12", "ss-24"]).optional();
const leadInput = z.object({
  formId: z.enum(["connect-lead", "business-lead"]),
  settlement: z.string().trim().min(2).max(128),
  address: z.string().trim().min(3).max(255),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{10,20}$/, "Введите корректный телефон"),
  name: z.string().trim().max(128).optional(),
  tariffId: allowedTariffId,
  organization: z.string().trim().max(255).optional(),
  consent: z.literal(true),
  consentVersion: z.literal("2026-11-19"),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    submit: publicProcedure.input(leadInput).mutation(async ({ input, ctx }) => {
      const forwarded = ctx.req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim();
      const ip = forwarded || ctx.req.ip || "unknown";
      const now = Date.now();
      const current = requestAttempts.get(ip);
      if (current && current.resetAt > now && current.count >= 3) {
        throw new Error("Слишком много попыток. Попробуйте ещё раз через несколько минут.");
      }
      if (!current || current.resetAt <= now) requestAttempts.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
      else requestAttempts.set(ip, { count: current.count + 1, resetAt: current.resetAt });

      const duplicate = await hasRecentConnectionRequest(input.phone, input.address);
      if (duplicate) throw new Error("Такая заявка уже была отправлена недавно. Если нужно уточнить данные, позвоните в поддержку.");

      const requestNumber = `TK-${new Date().getFullYear()}-${nanoid(6).toUpperCase()}`;
      const lead = {
        requestNumber,
        formId: input.formId,
        settlement: input.settlement,
        address: input.address,
        phone: input.phone,
        name: input.name,
        tariffId: input.tariffId,
        organization: input.organization,
        consentVersion: input.consentVersion,
      };
      try {
        await sendLeadEmail(lead);
      } catch (error) {
        console.error("[lead-email]", error instanceof Error ? error.message : error);
        throw new Error("Не удалось отправить заявку. Позвоните +7 915 706-67-37.");
      }
      try {
        await createConnectionRequest({
          requestNumber,
          formId: input.formId,
          settlement: input.settlement,
          address: input.address,
          phone: input.phone,
          name: input.name || null,
          tariffId: input.tariffId || null,
          organization: input.organization || null,
          status: "new",
          consentAt: new Date(),
          consentVersion: input.consentVersion,
        });
      } catch (error) {
        console.error("[lead-db]", error instanceof Error ? error.message : error);
      }
      return { requestNumber };
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
