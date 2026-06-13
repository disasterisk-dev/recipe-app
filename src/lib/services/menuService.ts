import type { DateRange } from "react-day-picker";

export class MenuService {
  private _selectedDateRange: DateRange | null = null;

  setSelectedDateRange(date: DateRange) {
    this._selectedDateRange = date;
  }

  get selectedDateRange() {
    return this._selectedDateRange;
  }
}
