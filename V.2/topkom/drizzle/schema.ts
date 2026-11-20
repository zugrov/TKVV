import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const connectionRequests = mysqlTable("connection_requests", {
  id: int("id").autoincrement().primaryKey(),
  requestNumber: varchar("requestNumber", { length: 32 }).notNull().unique(),
  formId: varchar("formId", { length: 64 }).notNull(),
  settlement: varchar("settlement", { length: 128 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  name: varchar("name", { length: 128 }),
  tariffId: varchar("tariffId", { length: 32 }),
  organization: varchar("organization", { length: 255 }),
  status: mysqlEnum("status", ["new", "in_progress", "closed"]).default("new").notNull(),
  consentAt: timestamp("consentAt").notNull(),
  consentVersion: varchar("consentVersion", { length: 32 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConnectionRequest = typeof connectionRequests.$inferSelect;
export type InsertConnectionRequest = typeof connectionRequests.$inferInsert;

// TODO: Add your tables here
