import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export class AuthService {
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  signOut() {
    return signOut(auth);
  }

  // Returns unsubscribe function — use in useEffect
  onAuthStateChanged(cb: (user: User | null) => void) {
    return onAuthStateChanged(auth, cb);
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}
