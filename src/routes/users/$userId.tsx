import { createFileRoute } from "@tanstack/react-router"
import { userQueries } from "@/lib/queries/user-queries"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ProtectedRoute } from "@/lib/helpers/protected-route"

export const Route = createFileRoute("/users/$userId")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { userId } }) =>
    queryClient.ensureQueryData(userQueries.detail(userId)),
})

function RouteComponent() {
  const { userId } = Route.useParams()
  // Already in cache from the loader — no loading state needed
  const { data: user } = useSuspenseQuery(userQueries.detail(userId))

  return (
    <ProtectedRoute>
      <div>{user?.name}</div>
    </ProtectedRoute>
  )
}
