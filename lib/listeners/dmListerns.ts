import { socket } from "../socket/socket";
import { AppDispatch } from "../store/store";
import { setInbox, updateInboxItem } from "../store/slices/chatSlice";

export const initSocketInboxListener = (dispatch: AppDispatch) => {
  socket.on("INBOX_UPDATE", (data) => {
    console.log("New DM Alert:", data);

    dispatch(
      updateInboxItem({
        chatId: data.chatId,
        lastMessage: data.lastMessage,
        unreadCount: data.unreadCount,
        updatedAt: data.updatedAt,

        recipient: data.recipient,
      })
    );
  });

  //Clear badge when backend confirms user read the chat
  socket.on("COUNT_RESET", ({ chatId }) => {
    console.log("Resetting count for:", chatId);

    dispatch(
      updateInboxItem({
        chatId,
        unreadCount: 0,
      })
    );
  });
};
