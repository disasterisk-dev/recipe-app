import { createContext, useContext, useState } from "react";
import type { DateRange } from "react-day-picker";
import { getWeekRangeFromDate } from "@/lib/utils";
import { DateTime } from "luxon";

interface MenuContext {
  selectedDateRange: DateRange | undefined;
  setSelectedDateRange: (range: DateRange) => void;
}

const MenuContext = createContext<MenuContext>({
  selectedDateRange: undefined,
  setSelectedDateRange: () => {},
});

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(
    getWeekRangeFromDate(DateTime.now(), 1)
  );

  return (
    <MenuContext.Provider value={{ selectedDateRange, setSelectedDateRange }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
