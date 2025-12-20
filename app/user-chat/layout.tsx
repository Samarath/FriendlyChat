"use client";

import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import UserListCard from "../components/user-list-card/UserListCard";
import { MessageSquare, Users, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { startUserListener } from "@/lib/listeners/userListeners";
import { socket } from "@/lib/socket/socket";
import Loader from "@/utility/loader/Loader";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import { initSocketInboxListener } from "@/lib/listeners/dmListerns";
import { fetchInbox } from "@/lib/api/chatApi";

const tabs = ["Group Chat", "Nearby Chat", "DMs"];

export default function UserChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("Nearby Chat");
  const [isDmsSliderOpen, setIsDmsSliderOpen] = useState(false);
  const [isUsersSliderOpen, setIsUsersSliderOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const { user: currentActiveUser } = useAppSelector((state) => state.auth);
  const { allUsers, error, loading, inbox } = useAppSelector(
    (state) => state.chat
  );

  console.log(inbox, "chekcing dms");

  useEffect(() => {
    let unsubscribeUsers: (() => void) | undefined;

    if (currentActiveUser?.authId) {
      //Fetch the initial Inbox (DMs) from the API
      fetchInbox(currentActiveUser.authId, dispatch);
      // Initialize Real-time Socket Listeners for INBOX_UPDATE
      initSocketInboxListener(dispatch);
      // Start all Users Listener (Firestore)
      unsubscribeUsers = startUserListener(dispatch, currentActiveUser.authId);

      if (!socket.connected) socket.connect();
      socket.emit("USER_IDENTIFY", currentActiveUser.authId);
    }

    return () => {
      if (unsubscribeUsers) unsubscribeUsers();
      socket.off("INBOX_UPDATE");
      socket.off("COUNT_RESET");
    };
  }, [dispatch, currentActiveUser?.authId]);

  const handleUserSelect = async (user: User) => {
    // Close mobile sliders
    setIsUsersSliderOpen(false);
    setIsDmsSliderOpen(false);

    console.log("User selected:", user);
    navigate.push(`/user-chat/${user.authId}`);
  };

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
          {/* Left section - Main content (children render here) */}
          <div className="flex flex-1 flex-col lg:border-r border-white/10">
            {children}
          </div>

          {/* Right sidebar - All Users (Desktop only) */}
          <div className="hidden lg:flex w-80 flex-col">
            <div className="custom-scrollbar flex-1 overflow-y-auto">
              {loading ? (
                <div>
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
