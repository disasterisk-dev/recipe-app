import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/lib/helpers/protected-route";
import { useAuth } from "@/lib/context/authContext";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Spinner } from "@/components/ui/spinner";
import Welcome from "@/components/welcome";
import WeekMenu from "@/components/week-menu";
import { MenuProvider } from "@/lib/context/menuContext";
import WeekDate from "@/components/week-date";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {!user && <Spinner />}
      {user && (
        <>
          <MenuProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <WeekDate />
                </header>
                <main className="px-4 py-8">
                  {!user.preferences && <Welcome />}
                  {user.preferences && <WeekMenu />}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </MenuProvider>
        </>
      )}
    </ProtectedRoute>
  );
}
