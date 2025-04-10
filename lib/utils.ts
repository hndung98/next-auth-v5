import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGreeting = (): string => {
  if (typeof window === "undefined") {
    return "Hello! 👋"; // avoid errors on SSR
  }
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning! ☀️";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon! 🌞";
  } else if (hour >= 18 && hour < 21) {
    return "Good evening! 🌆";
  } else {
    return "Good night! 🌙";
  }
};
