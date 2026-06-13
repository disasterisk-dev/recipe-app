import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/lib/helpers/protectedRoute";
import { authService, userService } from "@/lib/services";
import { useAuth } from "@/lib/context/authContext";
import PreferencedDialog from "@/components/preferencesDialog";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const { firebaseUser: authUser } = useAuth();
  const {
    data: user,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["user", authUser?.uid],
    queryFn: () => {
      return userService.getUser(authUser!.uid).then((result) => {
        if (result == null) throw Error();
        return result;
      });
    },
    enabled: !!authUser,
  });

  if (isError) {
    return <Navigate to="/users/notFound" />;
  }
  return (
    <ProtectedRoute>
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </header>
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
            </SidebarInset>
          </SidebarProvider>
        </>
      )}
    </ProtectedRoute>
  );
}
