"use client";

import { useEffect, useState } from "react";
import UserListCard from "../user-list-card/UserListCard";
import Header from "../header/Header";
import { Message, User } from "@/types/types";
import { ChatBox } from "../chat-box/Chatbox";
// import { ChatBox, Message, User } from "../chat-box/Chatbox";
// import ChatHeader from "../chat-header/ChatHeader";

const tabs = ["Group Chat", "Nearby Chat", "DMs"];

export function ChatPanel() {
  const [activeTab, setActiveTab] = useState("Nearby Chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageUser, setCurrentMessageUser] = useState<User>();

  const loggedInUser = {
    name: "Raj Kishor",
    avatar: "RK",
  };

  const users = [
    {
      id: "1",
      name: "Raj Kishor",
      initials: "RK",
      location: "Bihar, India",
      age: 25,
      gender: "male",
      isOnline: false,
    },
    {
      id: "2",
      name: "Aarav Mehta",
      initials: "AM",
      location: "Delhi, India",
      age: 28,
      gender: "male",
      isOnline: false,
    },
    {
      id: "3",
      name: "Sofia Martinez",
      initials: "SM",
      location: "Madrid, Spain",
      age: 32,
      gender: "female",
      isOnline: true,
    },
    {
      id: "4",
      name: "Liam Anderson",
      initials: "LA",
      location: "Sydney, Australia",
      age: 27,
      gender: "male",
      isOnline: false,
    },
    {
      id: "5",
      name: "Noah Johnson",
      initials: "NJ",
      location: "New York, USA",
      age: 30,
      gender: "male",
      isOnline: false,
    },
    {
      id: "6",
      name: "Emma Williams",
      initials: "EW",
      location: "Toronto, Canada",
      age: 26,
      gender: "female",
      isOnline: false,
    },
    {
      id: "7",
      name: "Olivia Brown",
      initials: "OB",
      location: "London, UK",
      age: 29,
      gender: "female",
      isOnline: false,
    },
    {
      id: "8",
      name: "Ethan Miller",
      initials: "EM",
      location: "Chicago, USA",
      age: 33,
      gender: "male",
      isOnline: false,
    },
    {
      id: "9",
      name: "Mia Singh",
      initials: "MS",
      location: "Punjab, India",
      age: 24,
      gender: "female",
      isOnline: false,
    },
    {
      id: "10",
      name: "Lucas Garcia",
      initials: "LG",
      location: "Barcelona, Spain",
      age: 31,
      gender: "male",
      isOnline: false,
    },
    {
      id: "11",
      name: "Isabella Wilson",
      initials: "IW",
      location: "Auckland, New Zealand",
      age: 28,
      gender: "female",
      isOnline: false,
    },
    {
      id: "12",
      name: "Benjamin Davis",
      initials: "BD",
      location: "Texas, USA",
      age: 34,
      gender: "male",
      isOnline: false,
    },
    {
      id: "13",
      name: "Aanya Verma",
      initials: "AV",
      location: "Mumbai, India",
      age: 22,
      gender: "female",
      isOnline: false,
    },
    {
      id: "14",
      name: "Hiro Tanaka",
      initials: "HT",
      location: "Tokyo, Japan",
      age: 29,
      gender: "male",
      isOnline: false,
    },
    {
      id: "15",
      name: "Chloe Martin",
      initials: "CM",
      location: "Paris, France",
      age: 27,
      gender: "female",
      isOnline: false,
    },
    {
      id: "16",
      name: "Daniel Kim",
      initials: "DK",
      location: "Seoul, South Korea",
      age: 30,
      gender: "male",
      isOnline: false,
    },
    {
      id: "17",
      name: "Natalie Schmidt",
      initials: "NS",
      location: "Berlin, Germany",
      age: 33,
      gender: "female",
      isOnline: false,
    },
    {
      id: "18",
      name: "Adam Jensen",
      initials: "AJ",
      location: "Copenhagen, Denmark",
      age: 31,
      gender: "male",
      isOnline: false,
    },
    {
      id: "19",
      name: "Ella Thompson",
      initials: "ET",
      location: "Melbourne, Australia",
      age: 25,
      gender: "female",
      isOnline: false,
    },
    {
      id: "20",
      name: "Arjun Reddy",
      initials: "AR",
      location: "Hyderabad, India",
      age: 26,
      gender: "male",
      isOnline: false,
    },
    {
      id: "21",
      name: "Victor Rossi",
      initials: "VR",
      location: "Rome, Italy",
      age: 34,
      gender: "male",
      isOnline: false,
    },
    {
      id: "22",
      name: "Sara Ahmed",
      initials: "SA",
      location: "Dubai, UAE",
      age: 29,
      gender: "female",
      isOnline: false,
    },
    {
      id: "23",
      name: "Markus Svensson",
      initials: "MS",
      location: "Stockholm, Sweden",
      age: 32,
      gender: "male",
      isOnline: false,
    },
    {
      id: "24",
      name: "Nina Petrova",
      initials: "NP",
      location: "Moscow, Russia",
      age: 30,
      gender: "female",
      isOnline: false,
    },
    {
      id: "25",
      name: "Carlos Lima",
      initials: "CL",
      location: "São Paulo, Brazil",
      age: 27,
      gender: "male",
      isOnline: false,
    },
    {
      id: "26",
      name: "Alicia Torres",
      initials: "AT",
      location: "Lima, Peru",
      age: 28,
      gender: "female",
      isOnline: false,
    },
    {
      id: "27",
      name: "David Lee",
      initials: "DL",
      location: "Singapore",
      age: 26,
      gender: "male",
      isOnline: false,
    },
    {
      id: "28",
      name: "Emma Johansson",
      initials: "EJ",
      location: "Oslo, Norway",
      age: 31,
      gender: "female",
      isOnline: false,
    },
    {
      id: "29",
      name: "Yara Hassan",
      initials: "YH",
      location: "Cairo, Egypt",
      age: 23,
      gender: "female",
      isOnline: false,
    },
    {
      id: "30",
      name: "Leo Müller",
      initials: "LM",
      location: "Vienna, Austria",
      age: 35,
      gender: "male",
      isOnline: false,
    },
  ];

  console.log(users);

  // Demo data
  const currentUser: User = {
    id: "1",
    name: "Raj Kishor",
    initials: "RK",
    location: "Bihar, India",
    isOnline: true,
  };

  const demoUser: User = {
    id: "2",
    name: "Sofia Martinez",
    initials: "SM",
    location: "Madrid, Spain",
    isOnline: true,
  };
  // eslint-disable-next-line
  const NOW = Date.now();

  const initialMessages: Message[] = [
    {
      id: "1",
      senderId: "2",
      text: "Hey! How are you doing?",
      timestamp: new Date(NOW - 1000 * 60 * 5),
      type: "text",
    },
    {
      id: "2",
      senderId: "1",
      text: "I'm good, thanks! Just working on some new features.",
      timestamp: new Date(NOW - 1000 * 60 * 3),
      type: "text",
    },
    {
      id: "3",
      senderId: "2",
      text: "That sounds exciting! What kind of features?",
      timestamp: new Date(NOW - 1000 * 60 * 1),
      type: "text",
    },
  ];

  useEffect(() => {
    setMessages(initialMessages);
    setCurrentMessageUser(demoUser);
  }, []);

  const handleSendMessage = (
    text: string,
    type: "text" | "image" | "video",
    mediaUrl?: string
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text,
      timestamp: new Date(),
      type,
      mediaUrl,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex h-[90vh] w-[80%] flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        {/* Single unified header */}
        <Header
          loggedInUser={loggedInUser}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userCount={users.length}
        />

        {/* Main content area - takes remaining height */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left section - Main content */}
          <div className="flex flex-1 flex-col border-r border-white/10 overflow-y-auto">
            <div className="flex-1">
              {" "}
              {/* {users?.map((user) => (
                <UserListCard
                  key={user.name}
                  name={user.name}
                  country={user.location}
                  age={user.age}
                />
              ))} */}
              <ChatBox
                selectedUser={currentMessageUser}
                messages={messages}
                currentUser={currentUser}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>

          {/* Right sidebar - All Users */}
          <div className="flex w-80 flex-col">
            <div className="custom-scrollbar flex-1 overflow-y-auto">
              {users?.map((user) => (
                <UserListCard
                  key={user.name}
                  name={user.name}
                  country={user.location}
                  age={user.age}
                  gender={user.gender}
                  setCurrentMessageUser={setCurrentMessageUser}
                  user={user}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
