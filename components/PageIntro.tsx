import type { ReactNode } from "react";

type PageIntroProps = {
  title: string;
  children?: ReactNode;
};

export function PageIntro({ title, children }: PageIntroProps) {
  return (
    <header className="mb-8 max-w-3xl">
      <h1 className="text-4xl leading-none md:text-5xl">{title}</h1>
      {children ? <div className="mt-4 text-[#B7C3D4]">{children}</div> : null}
    </header>
  );
}
