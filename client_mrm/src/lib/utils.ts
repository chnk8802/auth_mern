import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isPlainObject, isEqual } from "lodash";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseDecimal = (value: any): number => {
  if (typeof value === "object" && value !== null && "$numberDecimal" in value) {
    return parseFloat(value.$numberDecimal);
  }
  return typeof value === "number" ? value : 0;
};

export const formatCurrency = (
  amount: number,
  currency: string = "INR",
  locale: string = "en-IN"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};


export function formatDate(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
}

export function formatSnakeCaseLabel(input: string): string {
  return input.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export function cleanObject<T extends object>(obj: T): T {
  const cleaned = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      continue;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      const nested = cleanObject(value);
      if (Object.keys(nested).length > 0) {
        cleaned[key as keyof T] = nested;
      }
    } else {
      cleaned[key as keyof T] = value;
    }
  }

  return cleaned;
}


export function getChangedFields<T extends Record<string, any>>(current: T, original: T): Partial<T> {
  const diff: Partial<T> = {};

  for (const key in current) {
    const currentValue = current[key];
    const originalValue = original[key];

    if (isPlainObject(currentValue) && isPlainObject(originalValue)) {
      const nestedDiff = getChangedFields(currentValue, originalValue);
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = nestedDiff as T[typeof key];
      }
    } else if (!isEqual(currentValue, originalValue)) {
      diff[key] = currentValue;
    }
  }

  return diff;
}