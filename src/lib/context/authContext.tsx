// src/lib/auth/authContext.tsx
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "firebase/auth"
import { authService } from "@/lib/services/authService"

interface AuthContext {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContext>({ user: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((newUser) => {
      setUser(newUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
