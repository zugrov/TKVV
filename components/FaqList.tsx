import type { FaqItem } from "@/content/faq";

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={item.id} className="rounded-2xl border border-[#39E6D0]/25 bg-[#111D2F] p-4">
          <summary className="cursor-pointer text-lg">{item.question}</summary>
          <p className="mt-3 text-[#B7C3D4]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
