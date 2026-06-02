import { db } from "@/lib/firebase"
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { converter } from "../utils"
import type { User, UserPrefs } from "@/lib/types/user"

export const userService = {

    async getUser(id: string): Promise<User | null> {
        const snap = await getDoc(doc(userCollection, id))
        return snap.exists() ? snap.data() : null // already typed as User
    },

    async createUser(id: string, data: Omit<User, "id">): Promise<void> {
        await setDoc(doc(userCollection, id), data as User)
    },

    async updatePrefs(userId: string, data: UserPrefs): Promise<void> {
        return await updateDoc(doc(userCollection, userId), { preferences: data });
    }
}

const userCollection = collection(db, "users").withConverter(
    converter<User>()
)
