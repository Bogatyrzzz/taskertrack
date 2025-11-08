import { getTasks } from "@/lib/tasks";
import { ListChecks, CalendarDays, AlertTriangle } from "lucide-react";

export default function TasksPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const status = (searchParams?.status as "active" | "done") || undefined;
  const due = (searchParams?.due as "today" | "any" | "overdue") || undefined;

  const list = getTasks({ status, due });

  const activeFilter = status === "active";
  const todayFilter = due === "today";
  const overdueFilter = due === "overdue";

  return (
    <div className="container mx-auto px-4 pt-16 pb-10 text-foreground">
      <header className="mb-6 flex items-center gap-2 text-white/80">
        <ListChecks className="size-5" />
        <h1 className="text-xl">Задачи</h1>
      </header>

      <div className="mb-6 flex flex-wrap gap-3">
        <span className="text-sm text-white/60">Фильтры:</span>
        {activeFilter && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-white/80 text-sm">
            <ListChecks className="size-4" /> активные
          </span>
        )}
        {todayFilter && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-white/80 text-sm">
            <CalendarDays className="size-4" /> сегодня
          </span>
        )}
        {overdueFilter && (
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/[0.10] px-3 py-1 text-rose-100 text-sm">
            <AlertTriangle className="size-4" /> просрочено
          </span>
        )}
      </div>

      <ul className="space-y-3">
        {list.map((t) => (
          <li
            key={t.id}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white/90"
          >
            <div className="flex items-center justify-between">
              <span>{t.title}</span>
              <span className="text-xs text-white/60">
                {new Date(t.dueDate).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="text-white/60 text-sm">Нет задач по выбранным фильтрам</li>
        )}
      </ul>
    </div>
  );
}