export interface User {
  id: string;
  name: string;
  emailAddress: string;
  preferences: UserPrefs | null;
}

export interface UserPrefs {
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
  startOnDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
