import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./auth";

export const savedTripsItinerary = async ({
  userId,
  tripContext,
  itineraryText,
}) => {
  if (!userId) {
    throw new Error("Missing userId for trip save.");
  }

  const tripRef = collection(db, "users", userId, "trips");

  const docRef = await addDoc(tripRef, {
    ...(tripContext ?? {}),
    itineraryText,
    createdAt: serverTimestamp(),
  });

  return docRef?.id;
};

export const getUserTrips = async (userId) => {
  const ref = collection(db, "users", userId, "trips");
  const snapShot = await getDocs(ref);

  return snapShot?.docs?.map((doc) => ({
    id: doc?.id,
    ...doc?.data(),
  }));
};

export const getSingleTrip = async (userId, tripId) => {
  if (!userId || !tripId) return null;

  const ref = doc(db, "users", userId, "trips", tripId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

export const deleteTrip = async (userId, tripId) => {
  if (!userId || !tripId) {
    throw new Error("Missing userId or tripId");
  }

  const ref = doc(db, "users", userId, "trips", tripId);
  await deleteDoc(ref);
};
