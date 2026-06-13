export class User {
  public id: string;
  public name: string;
  public emailAddress: string;
  public preferences: UserPrefs | null;

  constructor(
    id: string,
    name: string,
    emailAddress: string,
    prefs: UserPrefs
  ) {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
    this.preferences = prefs;
  }
}

export interface UserPrefs {
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
  startOnDay:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
}
