"use client";

import Link from "next/link";
import { getCounts } from "@/lib/tasks";
import { CalendarDays, ListChecks, ArrowRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomeDashboard() {
  const counts = getCounts();
  return (
    <div className="container mx-auto px-4 pt-16 pb-16">
      <header className="mb-10 text-center">
        <h1
          className={cn(
            "text-4xl md:text-5xl font-semibold tracking-tight whitespace-nowrap",
            "text-white",
            "drop-shadow-[0_0_8px_rgba(255,255,255,0.10)]"
          )}
        >
          task <span className="text-white/90">lfg.</span>
        </h1>
      </header>

      <section className="mt-2 grid grid-cols-2 gap-2.5">
        <div className="aspect-square">
          <DashboardCard
            href="/tasks?status=active"
            title="Активные задачи"
            value={counts.totalActive}
            icon={<ListChecks className="size-4" />}
            className="h-full"
          />
        </div>
        <div className="aspect-square">
          <DashboardCard
            href="/tasks?status=active&due=today"
            title="Нужно успеть сегодня"
            value={counts.dueToday}
            icon={<CalendarDays className="size-4" />}
            className="h-full"
          />
        </div>
      </section>

      <section className="mt-3">
        <DashboardCard
          href="/tasks?status=active&due=overdue"
          title="Зона риска"
          value={counts.riskOverdue}
          icon={<AlertTriangle className="size-4" />}
          variant="risk"
        />
      </section>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  href,
  icon,
  variant = "default",
  className,
}: {
  title: string;
  value: number;
  href: string;
  icon: React.ReactNode;
  variant?: "default" | "risk";
  className?: string;
}) {
  const baseClasses = cn(
    "group relative rounded-xl border transition-colors px-3.5 py-4",
    "flex items-center justify-between"
  );
  const defaultClasses = cn("border-white/10", "bg-white/[0.04] hover:bg-white/[0.07]");
  const riskClasses = cn("border-rose-500/30", "bg-rose-500/[0.10] hover:bg-rose-500/[0.14]");
  return (
    <Link
      href={href}
      className={cn(baseClasses, variant === "risk" ? riskClasses : defaultClasses, className)}
    >
      <div className="flex items-center gap-3">
        <div className={cn(variant === "risk" ? "text-rose-300" : "text-white/80")}>{icon}</div>
        <div>
          <div className="text-xs text-white/70">{title}</div>
          <div className="text-xl font-medium text-white">{value}</div>
        </div>
      </div>
      <ArrowRight className={cn("size-4 transition-colors", variant === "risk" ? "text-rose-300/70 group-hover:text-rose-200" : "text-white/50 group-hover:text-white/80")} />
    </Link>
  );
}