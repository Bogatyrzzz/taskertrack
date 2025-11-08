"use client";

import React, { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide on home page
  if (pathname === "/") {
    return null;
  }

  const handleBack = useCallback(() => {
    // If there is history, go back; otherwise go home
    try {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    } catch {
      router.push("/");
    }
  }, [router]);

  return (
    <button
      type="button"
      aria-label="Назад"
      onClick={handleBack}
      className={
        [
          "fixed",
          "top-4 left-4 md:top-5 md:left-5",
          "z-50",
          "inline-flex items-center justify-center",
          "size-9 md:size-10",
          "rounded-full",
          "border border-white/20",
          "bg-white/[0.07] hover:bg-white/[0.12]",
          "text-white",
          "shadow-md shadow-black/20",
          "backdrop-blur-sm",
          "transition-colors",
        ].join(" ")
      }
    >
      <ArrowLeft className="size-5" />
    </button>
  );
}