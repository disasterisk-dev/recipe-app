import { useAuth } from "@/lib/context/authContext";
import RecipeSheet from "./recipe-sheet";

const WeekMenu = () => {
  const { user } = useAuth();

  return (
    <>
      <section>
        <h1>Menu</h1>
      </section>
      <RecipeSheet />
    </>
  );
};

export default WeekMenu;
