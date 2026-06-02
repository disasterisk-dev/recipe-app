import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged

} from 'firebase/auth'
import type { User } from 'firebase/auth';
import { auth } from '@/lib/firebase'

export const authService = {
    signIn: (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password),

    signUp: (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password),

    signOut: () => signOut(auth),

    // Returns unsubscribe function — use in useEffect
    onAuthStateChanged: (cb: (user: User | null) => void) =>
        onAuthStateChanged(auth, cb),

    getCurrentUser: () => auth.currentUser,
}