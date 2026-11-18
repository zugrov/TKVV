import { announcement } from "@/content/announcement";

export function Announcement() {
  if (!announcement.isEnabled || !announcement.text) {
    return null;
  }

  return (
    <div className="border-b border-[#39E6D0]/40 bg-[#111D2F] px-4 py-3 text-sm" role="status">
      <p className="mx-auto max-w-6xl">
        {announcement.territory ? `${announcement.territory}. ` : null}
        {announcement.text}
        {announcement.updatedAt ? ` Обновлено: ${announcement.updatedAt}.` : null}
      </p>
    </div>
  );
}
