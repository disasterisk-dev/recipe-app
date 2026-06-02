import { createFileRoute, Navigate } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/lib/helpers/protectedRoute"
import { authService } from "@/lib/services/authService"
import { userService } from "@/lib/services/userService"
import { useAuth } from "@/lib/context/authContext"
import PreferencedDialog from "@/components/preferencesDialog"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const { user: authUser } = useAuth()
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user", authUser?.uid],
    queryFn: () => {
      return userService.getUser(authUser!.uid).then((result) => {
        if (result == null) throw Error()
        return result
      })
    },
    enabled: !!authUser,
  })

  if (isError) {
    return <Navigate to="/users/notFound" />
  }
  return (
    <ProtectedRoute>
      {isLoading && <h1>Loading</h1>}
      {user && user.preferences == null && (
        <>
          <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6">
            <h1 className="text-center font-medium">
              Let's get started, {user.name}!
            </h1>
            <p>Set your preferences to begin using Recipeat</p>

            <PreferencedDialog />
          </div>

          <div className="absolute top-2 right-2">
            <Button onClick={authService.signOut}>Sign Out</Button>
          </div>
        </>
      )}
      {user && user.preferences && <h1>home</h1>}
    </ProtectedRoute>
  )
}
