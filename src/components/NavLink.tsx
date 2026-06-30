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
  activeClassName,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      data-active={isActive ? "true" : undefined}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded",
        isActive && activeClassName,
        className
      )}
    >
      {children}
    </Link>
  );
}