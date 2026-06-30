"use client";

import { useState, useRef, FormEvent } from "react";
import { Button } from "./Button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  if (!phone.trim()) return true;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function pushAnalyticsEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && "dataLayer" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).dataLayer?.push({ event: eventName, ...params });
  }
}

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const validate = (): FormErrors | null => {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Enter your full name.";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!isValidEmail(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!isValidPhone(formData.phone)) {
      nextErrors.phone = "Enter a valid phone number or leave this blank.";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Enter a message.";
    } else if (formData.message.length > 2000) {
      nextErrors.message = "Keep your message under 2,000 characters.";
    }

    if (Object.keys(nextErrors).length > 0) {
      return nextErrors;
    }
    return null;
  };

  const focusFirstError = (nextErrors: FormErrors) => {
    if (nextErrors.name && nameRef.current) {
      nameRef.current.focus();
    } else if (nextErrors.email && emailRef.current) {
      emailRef.current.focus();
    } else if (nextErrors.phone && phoneRef.current) {
      phoneRef.current.focus();
    } else if (nextErrors.message && messageRef.current) {
      messageRef.current.focus();
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      focusFirstError(validationErrors);
      return;
    }

    setErrors({});

    // Honeypot rejection: silently pretend success so bots cannot tell they
    // were caught, while never actually submitting.
    if (formData.honeypot.trim()) {
      setStatus("success");
      pushAnalyticsEvent("contact_form_submitted", { honeypot: true });
      return;
    }

    const endpoint = siteConfig.contactFormEndpoint;

    // Fallback to mailto when no backend endpoint is configured.
    if (!endpoint) {
      const subject = "Question about flight training";
      const body = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        formData.phone ? `Phone: ${formData.phone}` : "",
        "",
        formData.message,
      ]
        .filter(Boolean)
        .join("\n");
      window.location.href = `mailto:${siteConfig.nap.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      pushAnalyticsEvent("contact_form_submitted", { via: "mailto" });
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          honeypot: formData.honeypot,
          recaptchaToken: undefined,
          page: "/contact/",
        }),
      });

      let result: { success?: boolean; error?: string } = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (response.ok && result.success !== false) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "", honeypot: "" });
        pushAnalyticsEvent("contact_form_submitted", { via: "api" });
      } else {
        setStatus("error");
        setErrorMessage(
          result.error || "Something went wrong. Please call 555-555-1234 or email us directly."
        );
        pushAnalyticsEvent("contact_form_error", {
          status: response.status,
          message: result.error,
        });
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call 555-555-1234 or email us directly."
      );
      pushAnalyticsEvent("contact_form_error", { message: String(err) });
    }
  };

  if (status === "success") {
    return (
      <div className={cn("rounded-lg bg-callout p-6 text-heading", className)} role="status">
        <p className="font-semibold">Thanks. We received your message and will reply soon.</p>
        <p className="mt-2 text-muted">
          If your question is urgent, call{" "}
          <a
            href={`tel:${siteConfig.nap.telephone}`}
            className="font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            data-analytics="phone_click"
          >
            {siteConfig.nap.telephoneFormatted}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${siteConfig.nap.email}`}
            className="font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
            data-analytics="email_click"
          >
            {siteConfig.nap.email}
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5", className)}
      noValidate
    >
      {status === "error" && (
        <div
          className="rounded-lg bg-error/10 p-4 text-error"
          role="alert"
          aria-live="assertive"
        >
          <p className="font-semibold">{errorMessage}</p>
          <p className="mt-1 text-sm">
            Please call{" "}
            <a
              href={`tel:${siteConfig.nap.telephone.replace(/\D/g, "")}`}
              className="font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              data-analytics="phone_click"
            >
              {siteConfig.nap.telephoneFormatted}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${siteConfig.nap.email}`}
              className="font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 rounded"
              data-analytics="email_click"
            >
              {siteConfig.nap.email}
            </a>.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-semibold text-body">
          Full name
        </label>
        <input
          ref={nameRef}
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={cn(
            "rounded-lg border bg-white px-4 py-3 text-body focus:outline-none focus:ring-2 focus:ring-focus-ring",
            errors.name ? "border-error" : "border-border"
          )}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-sm text-error">{errors.name}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-sm font-semibold text-body">
            Email address
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(
              "rounded-lg border bg-white px-4 py-3 text-body focus:outline-none focus:ring-2 focus:ring-focus-ring",
              errors.email ? "border-error" : "border-border"
            )}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-sm text-error">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className="text-sm font-semibold text-body">
            Phone number{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            ref={phoneRef}
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={cn(
              "rounded-lg border bg-white px-4 py-3 text-body focus:outline-none focus:ring-2 focus:ring-focus-ring",
              errors.phone ? "border-error" : "border-border"
            )}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="text-sm text-error">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-semibold text-body">
          Message
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={2000}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(
            "rounded-lg border bg-white px-4 py-3 text-body focus:outline-none focus:ring-2 focus:ring-focus-ring",
            errors.message ? "border-error" : "border-border"
          )}
        />
        <p className="text-xs text-muted">{formData.message.length} / 2000 characters</p>
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-error">{errors.message}</p>
        )}
      </div>

      {/* Honeypot field: hidden from users, rejected if filled. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company">Company
        </label>
        <input
          ref={honeypotRef}
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
          }
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={status === "loading"}
        className="self-start"
        aria-busy={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
