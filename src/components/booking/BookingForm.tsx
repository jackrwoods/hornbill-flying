"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/types/booking";

interface BookingFormProps {
  value: BookingFormData;
  onChange: (value: BookingFormData) => void;
}

interface FieldError {
  field: keyof BookingFormData;
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[\d\s\-().]{10,}$/;

function validateForm(value: BookingFormData): FieldError[] {
  const errors: FieldError[] = [];

  if (!value.firstName.trim()) {
    errors.push({ field: "firstName", message: "First name is required." });
  }

  if (!value.lastName.trim()) {
    errors.push({ field: "lastName", message: "Last name is required." });
  }

  if (!value.phone.trim()) {
    errors.push({ field: "phone", message: "Phone number is required." });
  } else if (!phoneRegex.test(value.phone.trim())) {
    errors.push({ field: "phone", message: "Enter a valid phone number." });
  }

  if (!value.email.trim()) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!emailRegex.test(value.email.trim())) {
    errors.push({ field: "email", message: "Enter a valid email address." });
  }

  if (value.weight && Number.isNaN(Number(value.weight))) {
    errors.push({ field: "weight", message: "Weight must be a number." });
  }

  return errors;
}

/**
 * Student details form for the booking widget.
 * Keeps visible fields to five or fewer per step, validates inline, and
 * surfaces accessible error messages with aria-describedby.
 */
export function BookingForm({ value, onChange }: BookingFormProps) {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => validateForm(value), [value]);
  const errorsByField = errors.reduce((acc, error) => {
    acc[error.field] = error.message;
    return acc;
  }, {} as Record<string, string>);

  const update = (field: keyof BookingFormData, inputValue: string) => {
    onChange({ ...value, [field]: inputValue });
  };

  const handleBlur = (field: keyof BookingFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const inputClasses = (field: keyof BookingFormData) =>
    cn(
      "w-full rounded-lg border bg-white px-4 py-3 text-body focus:outline-none focus:ring-2",
      touched[field] && errorsByField[field]
        ? "border-error focus:border-error focus:ring-error/50"
        : "border-border focus:border-accent focus:ring-focus-ring"
    );

  return (
    <form className="grid gap-5" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-heading">
            First name
          </span>
          <input
            type="text"
            value={value.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
            className={inputClasses("firstName")}
            required
            aria-invalid={touched.firstName && !!errorsByField.firstName}
            aria-describedby={
              touched.firstName && errorsByField.firstName
                ? "error-firstName"
                : undefined
            }
          />
          {touched.firstName && errorsByField.firstName && (
            <span id="error-firstName" className="mt-1 block text-sm text-error">
              {errorsByField.firstName}
            </span>
          )}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-heading">
            Last name
          </span>
          <input
            type="text"
            value={value.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
            className={inputClasses("lastName")}
            required
            aria-invalid={touched.lastName && !!errorsByField.lastName}
            aria-describedby={
              touched.lastName && errorsByField.lastName
                ? "error-lastName"
                : undefined
            }
          />
          {touched.lastName && errorsByField.lastName && (
            <span id="error-lastName" className="mt-1 block text-sm text-error">
              {errorsByField.lastName}
            </span>
          )}
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-heading">Phone</span>
          <input
            type="tel"
            value={value.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={inputClasses("phone")}
            required
            aria-invalid={touched.phone && !!errorsByField.phone}
            aria-describedby={
              touched.phone && errorsByField.phone ? "error-phone" : undefined
            }
          />
          {touched.phone && errorsByField.phone && (
            <span id="error-phone" className="mt-1 block text-sm text-error">
              {errorsByField.phone}
            </span>
          )}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-heading">Email</span>
          <input
            type="email"
            value={value.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={inputClasses("email")}
            required
            aria-invalid={touched.email && !!errorsByField.email}
            aria-describedby={
              touched.email && errorsByField.email ? "error-email" : undefined
            }
          />
          {touched.email && errorsByField.email && (
            <span id="error-email" className="mt-1 block text-sm text-error">
              {errorsByField.email}
            </span>
          )}
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-heading">
            Weight (optional)
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={value.weight || ""}
            onChange={(e) => update("weight", e.target.value)}
            onBlur={() => handleBlur("weight")}
            placeholder="lbs"
            className={inputClasses("weight")}
            aria-invalid={touched.weight && !!errorsByField.weight}
            aria-describedby={
              touched.weight && errorsByField.weight ? "error-weight" : undefined
            }
          />
          {touched.weight && errorsByField.weight && (
            <span id="error-weight" className="mt-1 block text-sm text-error">
              {errorsByField.weight}
            </span>
          )}
        </label>
      </div>
    </form>
  );
}

export { validateForm };
