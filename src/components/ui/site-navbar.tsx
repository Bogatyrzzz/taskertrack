"use client";

import { InteractiveMenu } from "@/components/ui/modern-mobile-menu";
import { Home, ListTodo, ShoppingBag, User } from "lucide-react";

const items = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Tasks", icon: ListTodo, href: "/tasks" },
  { label: "Shop", icon: ShoppingBag, href: "/shop" },
  { label: "Profile", icon: User, href: "/profile" },
];

export default function SiteNavbar() {
  return (
    <div className="fixed bottom-[10%] inset-x-4 z-50">
      <div className="w-full max-w-[520px] mx-auto">
        <InteractiveMenu items={items} accentColor="#ffffff" />
      </div>
    </div>
  );
}