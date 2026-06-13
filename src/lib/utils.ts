import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  QueryDocumentSnapshot,
  FirestoreDataConverter,
  DocumentData,
  WithFieldValue,
} from "firebase/firestore";
import type { DateTime } from "luxon";

// Used for adding Tailwind classes to the existing ones in ShadCN components, traditional concatenation doesn't work
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Converts data to and from Firestore documents and the passed type
export function converter<
  T extends { id?: string },
>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: WithFieldValue<T>): DocumentData {
      const { id, ...rest } = data as T;
      return rest;
    },
    fromFirestore(snap: QueryDocumentSnapshot): T {
      return { id: snap.id, ...snap.data() } as T;
    },
  };
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function getWeekRangeFromDate(now: DateTime, startOnDay: number) {
  const today = now.startOf("day");
  // Find the most recent occurrence of startOnDay (0=Sun … 6=Sat)
  // Luxon weekday: 1=Mon … 7=Sun, so convert
  const luxonTarget = startOnDay === 0 ? 7 : startOnDay;
  const diff = (today.weekday - luxonTarget + 7) % 7;
  const from = today.minus({ days: diff }).toJSDate();
  const to = today.minus({ days: diff - 6 }).toJSDate();
  return { from, to };
}
