import * as React from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  className?: string;
}

type TextProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
    unit?: string;
  };

type SelectProps = BaseProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id" | "className"> & {
    variant: "select";
  };

type RangeProps = BaseProps & {
  variant: "range";
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
};

export type ToolInputProps = TextProps | SelectProps | RangeProps;

export function ToolInput(props: ToolInputProps) {
  const { label, id, error, hint, className } = props;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-navy-900">
        {label}
      </label>
      {"variant" in props && props.variant === "range" ? (
        <RangeField {...(props as Omit<RangeProps, "variant">)} />
      ) : "variant" in props && props.variant === "select" ? (
        <SelectField {...(props as Omit<SelectProps, "variant">)} />
      ) : (
        <TextField {...(props as TextProps)} />
      )}
      {hint && !error && <p className="text-xs text-ink-light">{hint}</p>}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

function inputClasses(error?: string) {
  return cn(
    "block w-full rounded-lg border bg-white px-4 py-2.5 text-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500",
    error ? "border-error focus:ring-error" : "border-navy-800/20"
  );
}

function SelectField({
  id,
  error,
  children,
  ...selectProps
}: Omit<SelectProps, "variant">) {
  return (
    <select id={id} className={inputClasses(error)} {...selectProps}>
      {children}
    </select>
  );
}

function TextField({ id, unit, error, ...inputProps }: TextProps) {
  return (
    <div className="relative">
      <input id={id} className={cn(inputClasses(error), unit && "pr-12")} {...inputProps} />
      {unit && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-light">
          {unit}
        </span>
      )}
    </div>
  );
}

function RangeField({
  id,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
}: Omit<RangeProps, "variant">) {
  return (
    <div className="flex items-center gap-4">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
        className={cn(inputClasses(), "flex-1")}
      />
      <span className="min-w-[4rem] text-right text-sm font-mono font-medium text-navy-900">
        {value}
        {unit ? ` ${unit}` : ""}
      </span>
    </div>
  );
}
