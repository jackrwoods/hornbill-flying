/**
 * Conditionally joins class names into a single string.
 * Accepts strings, numbers, arrays, or objects whose keys are included when
 * their value is truthy. Falsy values are ignored.
 */
export function cn(...inputs: Array<
  string | number | boolean | undefined | null | Record<string, unknown> | Array<string | number | boolean | undefined | null>
>): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const joined = cn(...input);
      if (joined) classes.push(joined);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}

/**
 * Formats a phone number as a human-readable string.
 */
export function formatPhone(tel: string): string {
  // Assumes a US/Canada-style number with country code stripped.
  const digits = tel.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return tel;
}

/**
 * Builds an absolute URL from a path and the configured base URL.
 */
export function absoluteUrl(path: string, baseUrl: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Trims a string to a maximum length, adding an ellipsis when truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}
