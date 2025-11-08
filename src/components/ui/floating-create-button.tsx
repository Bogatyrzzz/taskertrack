"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Plus } from "lucide-react";

export default function FloatingCreateButton() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!isHome) return null;

  return (
    <button
      type="button"
      aria-label="Создать задачу"
      onClick={() => router.push("/tasks/new")}
      className={[
        "fixed left-1/2 -translate-x-1/2",
        "bottom-[22%] md:bottom-[22%]",
        "z-50",
        "inline-flex items-center justify-center",
        "size-11 md:size-12",
        "rounded-full",
        "border border-white/20",
        "bg-white/[0.10] hover:bg-white/[0.16]",
        "text-white",
        "shadow-md shadow-black/20",
        "backdrop-blur-sm",
        "transition-colors",
      ].join(" ")}
    >
      <Plus className="size-6" />
    </button>
  );
}