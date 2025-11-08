"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function PagePaddingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <main className={`relative z-10 min-h-[100svh] ${isHome ? "" : "pt-16"}`}>{children}</main>
  );
}