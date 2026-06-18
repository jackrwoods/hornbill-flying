"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

export function NavLink({
  href,
  children,
  className,
  activeClassName = "text-orange-500",
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 rounded",
        isActive && activeClassName,
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
