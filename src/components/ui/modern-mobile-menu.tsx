"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, ListTodo, ShoppingBag, User } from "lucide-react";

type IconComponentType = React.ElementType<{ className?: string }>;

export interface InteractiveMenuItem {
  label: string;
  icon: IconComponentType;
  href: string;
}

export interface InteractiveMenuProps {
  items?: InteractiveMenuItem[];
  accentColor?: string;
  className?: string;
}

const defaultItems: InteractiveMenuItem[] = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Tasks", icon: ListTodo, href: "/tasks" },
  { label: "Shop", icon: ShoppingBag, href: "/shop" },
  { label: "Profile", icon: User, href: "/profile" },
];

const defaultAccentColor = "var(--component-active-color-default)";

const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ items, accentColor, className }) => {
  const router = useRouter();
  const pathname = usePathname();

  const finalItems = useMemo(() => {
    const isValid = items && Array.isArray(items) && items.length >= 2 && items.length <= 5;
    if (!isValid) {
      return defaultItems;
    }
    return items;
  }, [items]);

  const activeIndex = useMemo(() => {
    const exactIndex = finalItems.findIndex((i) => i.href === pathname);
    if (exactIndex !== -1) return exactIndex;
    const matchIndex = finalItems.findIndex((i) => i.href !== "/" && pathname.startsWith(i.href));
    return matchIndex === -1 ? 0 : matchIndex;
  }, [finalItems, pathname]);

  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const setLineWidth = () => {
      const activeItemElement = itemRefs.current[activeIndex];
      const activeTextElement = textRefs.current[activeIndex];
      if (activeItemElement && activeTextElement) {
        const textWidth = activeTextElement.offsetWidth;
        activeItemElement.style.setProperty("--lineWidth", `${textWidth}px`);
      }
    };
    setLineWidth();
    window.addEventListener("resize", setLineWidth);
    return () => window.removeEventListener("resize", setLineWidth);
  }, [activeIndex, finalItems]);

  const handleItemClick = (index: number) => {
    const target = finalItems[index];
    router.push(target.href);
  };

  const navStyle = useMemo(() => {
    const activeColor = accentColor || defaultAccentColor;
    return { "--component-active-color": activeColor } as React.CSSProperties;
  }, [accentColor]);

  return (
    <nav className={`menu ${className ?? ""}`} role="navigation" style={navStyle}>
      {finalItems.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;
        return (
          <button
            key={item.label}
            className={`menu__item ${isActive ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ "--lineWidth": "0px" } as React.CSSProperties}
          >
            <div className="menu__icon">
              <IconComponent className="icon" />
            </div>
            <strong className={`menu__text ${isActive ? "active" : ""}`} ref={(el) => (textRefs.current[index] = el)}>
              {item.label}
            </strong>
          </button>
        );
      })}
    </nav>
  );
};

export { InteractiveMenu };