import type { LegalSection } from "@/content/legal";

type LegalArticleProps = {
  sections: LegalSection[];
};

export function LegalArticle({ sections }: LegalArticleProps) {
  return (
    <div className="grid max-w-3xl gap-8">
      {sections.map((section) => (
        <section key={section.id}>
          <h2 className="text-2xl">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-[#B7C3D4]">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
