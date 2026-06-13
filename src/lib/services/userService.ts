import { db } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { converter } from "../utils";
import { User } from "@/lib/types/user";
import type { UserPrefs } from "@/lib/types/user";

export class UserService {
  private _currentUser: User | null = null;

  async getUser(id: string): Promise<User | null> {
    const snap = await getDoc(doc(userCollection, id));
    return snap.exists() ? snap.data() : null; // already typed as User
  }

  async setCurrentUser(uid: string | null) {
    if (!uid) {
      this._currentUser = null;
      return;
    }
    this._currentUser = await this.getUser(uid);
  }

  async createUser(id: string, data: Omit<User, "id">): Promise<void> {
    await setDoc(doc(userCollection, id), data as User);
  }

  async updatePrefs(data: UserPrefs): Promise<void> {
    await updateDoc(doc(userCollection, this._currentUser?.id), {
      preferences: data,
    });
    if (this._currentUser)
      this._currentUser = new User(
        this._currentUser.id,
        this._currentUser.name,
        this._currentUser.emailAddress,
        data
      );
  }

  get currentUser(): User | null {
    return this._currentUser;
  }

  get userInitials() {
    const names = this._currentUser?.name.split(" ") ?? [];
    let initials = "";

    names.forEach((name) => {
      initials = initials.concat(name.split("")[0].toUpperCase());
    });

    return initials;
  }
}

const userCollection = collection(db, "users").withConverter(converter<User>());
