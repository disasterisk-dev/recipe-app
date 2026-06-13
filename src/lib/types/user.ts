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
  startOnDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
