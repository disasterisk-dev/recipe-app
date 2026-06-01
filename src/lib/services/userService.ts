import { db } from "@/lib/firebase"
import { collection, doc, getDoc, addDoc } from "firebase/firestore"
import { converter } from "../utils"

export const userService = {
    async getUser(id: string): Promise<User | null> {
        const snap = await getDoc(doc(userCollection, id))
        return snap.exists() ? snap.data() : null // already typed as User
    },

    async createUser(data: Omit<User, "id">): Promise<string> {
        const ref = await addDoc(userCollection, data as User)
        return ref.id
    },
}

const userCollection = collection(db, "users").withConverter(
    converter<User>()
)
