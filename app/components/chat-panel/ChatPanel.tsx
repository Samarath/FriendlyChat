"use client";

import { useCallback, useEffect, useState } from "react";
import UserListCard from "../user-list-card/UserListCard";
import Header from "../header/Header";
import { Message, User } from "@/types/types";
import { ChatBox } from "../chat-box/Chatbox";
import { MessageSquare, Users, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { startUserListener } from "@/lib/listeners/userListeners";
import { getChatId } from "@/utility/chat/ChatUtilityFun";
import { socket } from "@/lib/socket/socket";
import Loader from "@/utility/loader/Loader";

const tabs = ["Group Chat", "Nearby Chat", "DMs"];

export function ChatPanel() {
  const [activeTab, setActiveTab] = useState("Nearby Chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageUser, setCurrentMessageUser] = useState<User>();
  const [isDmsSliderOpen, setIsDmsSliderOpen] = useState(false);
  const [isUsersSliderOpen, setIsUsersSliderOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { user: currentActiveUser } = useAppSelector((state) => state.auth);
  const { allUsers, error, loading } = useAppSelector((state) => state.chat);
  // console.log(loading, "checking loading");

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (currentActiveUser?.authId) {
      unsubscribe = startUserListener(dispatch, currentActiveUser.authId);

      // Socket.IO Connection and Identification
      if (!socket.connected) {
        socket.connect();
      }
      // Emit USER_IDENTIFY to tell the server who we are
      socket.emit("USER_IDENTIFY", currentActiveUser.authId);
    }

    // Disconnect socket on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (socket.connected) {
        // We rely on the server's 'disconnect' listener (on the user's socket)
      }
    };
  }, [dispatch, currentActiveUser?.authId]);

  const handleReceiveMessage = useCallback(
    (payload: any) => {
      // The payload comes from the backend's io.to().emit('RECEIVE_MESSAGE', payload)
      const newMessage: Message = {
        id: payload.id || Date.now().toString(),
        senderId: payload.senderId,
        text: payload.content,
        timestamp: new Date(payload.timestamp),
        type: payload.type || "text",
        mediaUrl: payload.mediaUrl,
      };

      // Only add the message to the state if it belongs to the currently active chat
      if (payload.chatId === currentChatId) {
        setMessages((prev) => [...prev, newMessage]);
      }

      //If chatId != currentChatId, show a notification/DM badge
    },
    [currentChatId]
  );

  useEffect(() => {
    // Set up the listener when the component mounts
    socket.on("RECEIVE_MESSAGE", handleReceiveMessage);

    // Cleanup: Remove the listener when the component unmounts
    return () => {
      socket.off("RECEIVE_MESSAGE", handleReceiveMessage);
    };
  }, [handleReceiveMessage]);

  const handleUserSelect = (user: User) => {
    if (!currentActiveUser) return;

    // Calculate the deterministic Chat ID
    const chatId = getChatId(currentActiveUser.authId, user.authId);
    setCurrentChatId(chatId);

    // Set the recipient user for the ChatBox header
    setCurrentMessageUser(user);

    // Close mobile sliders
    setIsUsersSliderOpen(false);
    setIsDmsSliderOpen(false);

    // FUTURE: Load previous messages for this chatId from Firestore
    // For now, reset messages to an empty array when switching users.
    setMessages([]);
  };

  const handleSendMessage = useCallback(
    (text: string, type: "text" | "image" | "video", mediaUrl?: string) => {
      if (!currentActiveUser || !currentMessageUser) return;

      const payload = {
        recipientId: currentMessageUser.authId,
        content: text,
        type: type,
        mediaUrl: mediaUrl,
      };

      // 1. Emit the message to the backend for persistence & delivery
      socket.emit("SEND_MESSAGE", payload);

      // 2. Optimistic Update (Add message to local state immediately)
      const optimisticMessage: Message = {
        id: Date.now().toString(),
        senderId: currentActiveUser.authId,
        text,
        timestamp: new Date(),
        type,
        mediaUrl,
      };
      setMessages((prev) => [...prev, optimisticMessage]);
    },
    [currentActiveUser, currentMessageUser]
  );

  const loggedInUser = {
    name: currentActiveUser?.name || "Unknown",
    avatar: currentActiveUser?.name?.[0]?.toUpperCase() || "?",
  };

  return (
    <div className="flex h-screen w-full items-center justify-center lg:px-4">
      <div className="flex h-screen lg:h-[90vh] w-full lg:w-[80%] flex-col lg:rounded-2xl lg:border lg:border-white/10 bg-white/5 lg:backdrop-blur-md relative">
        {/* Single unified header */}
        <Header
          loggedInUser={loggedInUser}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userCount={allUsers?.length || 0}
        />

        {/* Main content area - takes remaining height */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left section - Main content */}
          <div className="flex flex-1 flex-col lg:border-r border-white/10">
            <ChatBox
              selectedUser={currentMessageUser}
              messages={messages}
              currentUser={currentActiveUser}
              onSendMessage={handleSendMessage}
              setCurrentMessageUser={handleUserSelect}
            />
          </div>

          {/* Right sidebar - All Users (Desktop only) */}
          <div className="hidden lg:flex w-80 flex-col">
            <div className="custom-scrollbar flex-1 overflow-y-auto">
              {loading ? (
                <div>
                  {" "}
                  <Loader LoadingText="getting users..." />
                </div>
              ) : (
                allUsers
                  ?.filter((u) => u.authId !== currentActiveUser?.authId)
                  .map((user) => (
                    <UserListCard
                      key={user.authId}
                      setCurrentMessageUser={handleUserSelect}
                      user={user}
                    />
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation (visible only on mobile) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-between bg-[#242938] border-t border-white/10 px-6 py-4 z-50">
          {/* DMs Button - Left */}
          <button
            onClick={() => setIsDmsSliderOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1f2e] text-teal-400 transition-colors hover:bg-teal-400/10"
          >
            <MessageSquare className="h-6 w-6" />
          </button>

          {/* All Users Button - Right */}
          <button
            onClick={() => setIsUsersSliderOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1f2e] text-teal-400 transition-colors hover:bg-teal-400/10"
          >
            <Users className="h-6 w-6" />
          </button>
        </div>

        {/* DMs Slider */}
        <div
          className={`lg:hidden fixed inset-0 z-[100] transition-transform duration-300 ${
            isDmsSliderOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDmsSliderOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-[#1a1f2e] shadow-xl">
            {/* DMs Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-teal-400" />
                <h3 className="text-lg font-semibold text-white">
                  Direct Messages
                </h3>
              </div>
              <button
                onClick={() => setIsDmsSliderOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* DMs Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-center text-white/60 text-sm">
                No direct messages yet
              </p>
              {/* DM list will go here */}
            </div>
          </div>
        </div>

        {/* All Users Slider */}
        <div
          className={`lg:hidden fixed inset-0 z-[100] transition-transform duration-300 ${
            isUsersSliderOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsUsersSliderOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#1a1f2e] shadow-xl">
            {/* Users Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-400" />
                <h3 className="text-lg font-semibold text-white">
                  All Users ({allUsers?.length || 0})
                </h3>
              </div>
              <button
                onClick={() => setIsUsersSliderOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Users Content */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <Loader LoadingText="getting users..." />
              ) : (
                allUsers
                  ?.filter((u) => u.authId !== currentActiveUser?.authId)
                  .map((user) => (
                    <UserListCard
                      key={user.authId}
                      setCurrentMessageUser={handleUserSelect}
                      user={user}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
