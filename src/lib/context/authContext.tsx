// src/lib/auth/authContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import type { User as AppUser } from "@/lib/types/user";
import { authService, userService } from "@/lib/services";

interface AuthContext {
  firebaseUser: FirebaseUser | null;
  user: AppUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContext>({
  firebaseUser: null,
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (newUser) => {
      setFirebaseUser(newUser);
      await userService.setCurrentUser(newUser?.uid ?? null);
      setUser(userService.currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
