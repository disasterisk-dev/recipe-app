"use client";

import { useEffect, useState, useMemo } from "react";

import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { useAuth } from "@/lib/context/authContext";
import { getWeekRangeFromDate } from "@/lib/utils";

export function WeekSelectCalendar() {
  const { user } = useAuth();

  const startOnDay = user?.preferences?.startOnDay ?? 1;

  const defaultRange = useMemo(
    (): DateRange => getWeekRangeFromDate(DateTime.now(), startOnDay),
    [startOnDay]
  );

  const [selected, setSelected] = useState<DateRange | undefined>(defaultRange);

  useEffect(() => {
    const anchor = selected?.from ?? new Date();
    setSelected(getWeekRangeFromDate(DateTime.fromJSDate(anchor), startOnDay));
  }, [startOnDay]);

  return (
    <Calendar
      key={startOnDay}
      mode="range"
      selected={selected}
      onSelect={(_: DateRange | undefined, day: Date) =>
        setSelected(getWeekRangeFromDate(DateTime.fromJSDate(day), startOnDay))
      }
      className="w-full border"
      captionLayout="dropdown"
      fixedWeeks
      weekStartsOn={startOnDay}
    />
  );
}
