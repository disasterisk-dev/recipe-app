import { createFileRoute, Navigate } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/lib/helpers/protectedRoute"
import { authService } from "@/lib/services/authService"
import { userService } from "@/lib/services/userService"
import { useAuth } from "@/lib/context/authContext"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const { user: authUser } = useAuth()
  const { data: user, isError, isLoading } = useQuery({
    queryKey: ["user", authUser?.uid],
    queryFn: () => userService.getUser(authUser!.uid),
    enabled: !!authUser,
  })

  if (isError || (!isLoading && !user)) return <Navigate to="/users/notFound" />

  return (
    <ProtectedRoute>
      {isLoading && <h1>Loading</h1>}
      {user && <>
      <div className="flex min-h-svh p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="font-medium">Welcome {user.name}</h1>
            <p>You may now add components and start building.</p>
            <p>We&apos;ve already added the button component for you.</p>
            <Button className="mt-2">Button</Button>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <Button onClick={authService.signOut}>Sign Out</Button>
      </div>
      </> }
      
    </ProtectedRoute>
  )
}
