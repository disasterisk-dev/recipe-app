import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  QueryDocumentSnapshot,
  FirestoreDataConverter,
  DocumentData,
  WithFieldValue,
} from "firebase/firestore";

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
