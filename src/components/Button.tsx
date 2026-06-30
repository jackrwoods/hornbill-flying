import * as React from "react";
import { cn } from "@/lib/utils";
import type { ButtonVariant } from "@/types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 focus:ring-gold-500",
  secondary:
    "bg-gold-500 text-navy-900 hover:bg-gold-400 focus:ring-navy-900",
  tertiary:
    "bg-transparent border-2 border-navy-900 text-navy-900 hover:bg-navy-900/5 focus:ring-navy-900",
  accent:
    "bg-orange text-white hover:bg-rust focus:ring-gold-500",
  "header-cta":
    "bg-header-cta-bg text-header-cta-text hover:bg-header-cta-hover focus:ring-focus-ring",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

export function Button({
  variant = "primary",
  children,
  className,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(baseClasses, variantClasses[variant], className, child.props.className),
      ...props,
    });
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
