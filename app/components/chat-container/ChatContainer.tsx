"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { Message, User } from "@/types/types";
import ChatBox from "../chat-box/Chatbox";
import { getChatId } from "@/utility/chat/ChatUtilityFun";
import { socket } from "@/lib/socket/socket";
import Loader from "@/utility/loader/Loader";
import { useAppSelector } from "@/lib/store/hook";

interface ChatContainerProps {
  recipientId: string;
}

export function ChatContainer({ recipientId }: ChatContainerProps) {
  const [messages, setMessages] = useState<Record<string, Message>>({});
  const [currentMessageUser, setCurrentMessageUser] = useState<
    User | undefined
  >();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { user: currentActiveUser } = useAppSelector((state) => state.auth);
  const { allUsers } = useAppSelector((state) => state.chat);

  const currentChatId = useMemo(() => {
    if (!currentActiveUser || !recipientId) return null;
    return getChatId(currentActiveUser.authId, recipientId);
  }, [currentActiveUser, recipientId]);

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
        const historyMap: Record<string, Message> = {};

        if (Array.isArray(data)) {
          data.forEach((msg: any) => {
            historyMap[msg.id] = {
              ...msg,
              timestamp: new Date(msg.timestamp),
            };
          });
        }

        setMessages(historyMap);
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
    if (recipientId && allUsers.length > 0 && currentActiveUser) {
      const user = allUsers.find((u) => u.authId === recipientId);
      if (user) {
        loadChatData(user);
      } else {
        setIsDataLoaded(true);
      }
    }
  }, [recipientId, allUsers, currentActiveUser, loadChatData]);

  const handleReceiveMessage = useCallback(
    (payload: any) => {
      if (payload.chatId !== currentChatId) return;

      setMessages((prev) => {
        const updated = { ...prev };

        // Remove temporary message if it exists
        if (payload.tempId && updated[payload.tempId]) {
          delete updated[payload.tempId];
        }

        // Add the actual message
        updated[payload.id] = {
          ...payload,
          timestamp: new Date(payload.timestamp),
        };

        return updated;
      });
    },
    [currentChatId]
  );

  useEffect(() => {
    socket.on("RECEIVE_MESSAGE", handleReceiveMessage);

    return () => {
      socket.off("RECEIVE_MESSAGE", handleReceiveMessage);
    };
  }, [handleReceiveMessage]);

  const handleSendMessage = useCallback(
    (text: string, type: any, mediaUrl?: string) => {
      if (!currentActiveUser || !recipientId) return;

      const tempId = `temp-${Date.now()}`;

      // Emit message to server
      socket.emit("SEND_MESSAGE", {
        recipientId,
        content: text,
        type,
        mediaUrl,
        tempId,
      });

      // Optimistically add message to UI
      setMessages((prev) => ({
        ...prev,
        [tempId]: {
          id: tempId,
          senderId: currentActiveUser.authId,
          text,
          timestamp: new Date(),
          type,
          mediaUrl,
        },
      }));
    },
    [currentActiveUser, recipientId]
  );

  // Show loader while loading chat
  if (!isDataLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader LoadingText="Loading chat..." />
      </div>
    );
  }

  // Sort messages by timestamp
  const sortedMessages = useMemo(() => {
    return Object.values(messages).sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [messages]);

  return (
    <ChatBox
      selectedUser={currentMessageUser}
      messages={sortedMessages}
      currentUser={currentActiveUser}
      onSendMessage={handleSendMessage}
    />
  );
}
