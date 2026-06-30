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
    "bg-dark text-on-dark hover:bg-dark-muted focus:ring-focus-ring",
  secondary:
    "bg-accent text-on-accent hover:bg-accent-hover focus:ring-dark",
  tertiary:
    "bg-transparent border-2 border-dark text-dark hover:bg-dark-subtle focus:ring-dark",
  accent:
    "bg-alert text-on-alert hover:bg-alert-hover focus:ring-focus-ring",
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
