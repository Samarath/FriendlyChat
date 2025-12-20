import { setInbox } from "../store/slices/chatSlice";
import { AppDispatch } from "../store/store";

export const fetchInbox = async (authId: string, dispatch: AppDispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/chats/inbox/${authId}`);
    const data = await response.json();

    // This sets the initial list of chats from Firestore
    dispatch(setInbox(data));
  } catch (error) {
    console.error("Failed to fetch inbox:", error);
  }
};
