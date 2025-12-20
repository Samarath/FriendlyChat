import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { setAllUsers, setError, setLoading } from "../store/slices/chatSlice";
import { AppDispatch } from "../store/store";
import { ChatUser } from "@/types/types";

// Function to start the continuous listener
export const startUserListener = (
  dispatch: AppDispatch,
  currentAuthId: string
) => {
  dispatch(setLoading(true));

  //  Define the query:
  // - Listen to the 'users' collection
  // -  Filter to only include 'Active' users
  // - Order by status (to show Active first) and last active time
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("status", "==", "Active"),
    orderBy("lastActive", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      try {
        const users: ChatUser[] = [];

        snapshot.docs.forEach((doc) => {
          const data = doc.data();

          // Convert Firestore Timestamp to JavaScript Date/string
          const lastActive =
            data.lastActive instanceof Timestamp
              ? data.lastActive.toDate().toISOString()
              : new Date().toISOString();

          users.push({
            authId: data.authId,
            name: data.name,
            age: data.age,
            gender: data.gender,
            country: data.country,
            status: data.status,
            lastActive: lastActive,
          } as ChatUser);
        });

        // Dispatch the new, fresh user list to the Redux store
        dispatch(setAllUsers(users));
        // eslint-disable-next-line
      } catch (err: any) {
        console.error("Error fetching user snapshot:", err);
        dispatch(setError(err.message || "Failed to fetch users."));
      }
    },
    (error) => {
      console.error("Listener error:", error);
      dispatch(setError(error.message));
    }
  );

  //returns the unsubscribe function to stop listening when the component unmounts
  return unsubscribe;
};
