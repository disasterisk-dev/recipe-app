"use client";

import { useEffect } from "react";

import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { useAuth } from "@/lib/context/authContext";
import { useMenu } from "@/lib/context/menuContext";
import { getWeekRangeFromDate } from "@/lib/utils";

export function WeekSelectCalendar() {
  const { user } = useAuth();
  const { selectedDateRange, setSelectedDateRange } = useMenu();

  const startOnDay = user?.preferences?.startOnDay ?? 1;

  useEffect(() => {
    const anchor = selectedDateRange?.from ?? new Date();
    setSelectedDateRange(
      getWeekRangeFromDate(DateTime.fromJSDate(anchor), startOnDay)
    );
  }, [startOnDay]);

  return (
    <Calendar
      key={startOnDay}
      mode="range"
      selected={selectedDateRange}
      onSelect={(_: DateRange | undefined, day: Date) =>
        setSelectedDateRange(
          getWeekRangeFromDate(DateTime.fromJSDate(day), startOnDay)
        )
      }
      className="w-full border"
      captionLayout="dropdown"
      fixedWeeks
      weekStartsOn={startOnDay}
    />
  );
}
