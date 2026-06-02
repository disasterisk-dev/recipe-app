export class User {
    public id: string;
    public name: string;
    public emailAdress: string;
    public preferences: UserPrefs | null;

    constructor(id: string, name: string, emailAddress: string, prefs: UserPrefs) {
        this.id = id;
        this.name = name;
        this.emailAdress = emailAddress;
        this.preferences = prefs;
    }
}

export interface UserPrefs {
    'breakfastCount': number,
    'lunchCount': number,
    'dinnerCount': number,
}