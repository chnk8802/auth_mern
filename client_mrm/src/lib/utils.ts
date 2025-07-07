import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isPlainObject, isEqual } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
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
