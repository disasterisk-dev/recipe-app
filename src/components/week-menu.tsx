import { format } from "date-fns";
import { useMenu } from "@/lib/context/menuContext";

const WeekMenu = () => {
  const { selectedDateRange } = useMenu();

  return (
    <>
      <h1>Menu</h1>
      <h2>
        {format(selectedDateRange?.from ?? new Date(), "dd MM yyyy")} -{" "}
        {format(selectedDateRange?.to ?? new Date(), "dd MM yyyy")}
      </h2>
    </>
  );
};

export default WeekMenu;
