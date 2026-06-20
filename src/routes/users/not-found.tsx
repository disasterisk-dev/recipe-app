import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/lib/helpers/protected-route";
import { authService } from "@/lib/services";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/not-found")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">User Not Found</h1>
        <p>
          The account details for this user are not available at this time.
          Please sign out and try again
        </p>
        <Button onClick={authService.signOut}>Sign Out</Button>
      </div>
    </ProtectedRoute>
  );
}
