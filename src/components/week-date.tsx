import { useMenu } from "@/lib/context/menuContext";
import { format } from "date-fns";
import type react from "react";

interface WeekDateProps {}

const WeekDate: react.FC<WeekDateProps> = () => {
  const { selectedDateRange } = useMenu();

  return (
    <span>
      {format(selectedDateRange?.from ?? new Date(), "dd MMM yy")} -{" "}
      {format(selectedDateRange?.to ?? new Date(), "dd MMM yy")}
    </span>
  );
};

export default WeekDate;
