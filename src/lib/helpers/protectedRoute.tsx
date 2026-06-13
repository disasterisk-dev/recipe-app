import { Navigate } from "@tanstack/react-router";
import { useAuth } from "../context/authContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { firebaseUser: user, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (!user) return <Navigate to="/signup" />;

  return <>{children}</>;
}
