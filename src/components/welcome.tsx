import { useAuth } from "@/lib/context/authContext";
import PreferencedDialog from "./preferences-dialog";

const Welcome = () => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-center font-medium">
        Let's get started{user ? ` , ${user.name}` : ""}!
      </h1>
      <p>Set your preferences to begin using Recipeat</p>

      <PreferencedDialog />
    </div>
  );
};

export default Welcome;
