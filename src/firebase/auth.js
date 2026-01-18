import { getAuth } from "firebase/auth";
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";

export const auth = getAuth(app);
export const db = getFirestore(app);
