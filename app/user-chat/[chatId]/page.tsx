"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatBox } from "@/app/components/chat-box/Chatbox";
import { Message, User } from "@/types/types";
import { useAppSelector } from "@/lib/store/hook";
import { useParams } from "next/navigation";
import { getChatId } from "@/utility/chat/ChatUtilityFun";
import Loader from "@/utility/loader/Loader";
import { socket } from "@/lib/socket/socket";

export default function ChatPage() {
  const params = useParams();
  const chatId = params.chatId as string;

  const [messages, setMessages] = useState<Message>();
  const [currentMessageUser, setCurrentMessageUser] = useState<User>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { user: currentActiveUser } = useAppSelector((state) => state.auth);
  const { allUsers } = useAppSelector((state) => state.chat);

  const currentChatId = useMemo(() => {
    if (!currentActiveUser || !chatId) return null;
    return getChatId(currentActiveUser.authId, chatId);
  }, [currentActiveUser, chatId]);

  useEffect(() => {
    if (currentChatId) {
      socket.emit("JOIN_CHAT", currentChatId);
      socket.emit("MARK_AS_READ", {
        chatId: currentChatId,
        userId: currentActiveUser.authId,
      });
      return () => {
        //Telling the backend I am leaving this chat
        socket.emit("LEAVE_CHAT", currentChatId);
      };
    }
  }, [currentChatId]);

  const loadChatData = useCallback(
    async (user: User) => {
      if (!currentChatId) return;
      setIsDataLoaded(false);
      try {
        const response = await fetch(
          `http://localhost:5000/chats/${currentChatId}/messages`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data);
        setCurrentMessageUser(user);
      } catch (err) {
        console.error("Error loading chat data:", err);
        setMessages({});
      } finally {
        setIsDataLoaded(true);
      }
    },
    [currentChatId]
  );

  // Load chat data when recipientId changes
  useEffect(() => {
    if (chatId && allUsers.length > 0 && currentActiveUser) {
      const user = allUsers.find((u) => u.authId === chatId);
      if (user) {
        loadChatData(user);
      } else {
        setIsDataLoaded(true);
      }
    }
  }, [chatId, allUsers, currentActiveUser, loadChatData]);

  const handleSendMessage = useCallback(
    (text: string, type: string, mediaUrl?: string) => {
      if (!currentActiveUser || !chatId) return;
      socket.emit("SEND_MESSAGE", {
        recipientId: chatId,
        content: text,
        type,
        mediaUrl,
      });
    },
    [currentActiveUser, chatId]
  );

  const handleReceiveMessage = useCallback(
    (payload: Message) => {
      // Ensure message belongs to this specific chat session
      if (payload.chatId !== currentChatId) return;
      console.log(payload, "checking recieve payload", messages);
      setMessages((prev) => [...prev, payload]);
    },
    [currentChatId]
  );
  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", handleReceiveMessage);

    return () => {
      socket.off("RECEIVE_MESSAGE", handleReceiveMessage);
    };
  }, [handleReceiveMessage]);

  if (!isDataLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader LoadingText="Loading chat..." />
      </div>
    );
  }

  return (
    <ChatBox
      selectedUser={currentMessageUser}
      messages={messages}
      currentUser={currentActiveUser}
      onSendMessage={handleSendMessage}
    />
  );
}
