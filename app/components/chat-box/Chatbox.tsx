"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Send, ImageIcon, Video, X, UserIcon } from "lucide-react";
import { ChatBoxProps } from "@/types/types";

export function ChatBox({
  selectedUser,
  messages,
  currentUser,
  onSendMessage,
}: ChatBoxProps) {
  const [inputValue, setInputValue] = useState("");
  const [mediaPreview, setMediaPreview] = useState<{
    url: string;
    type: "image" | "video";
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mediaPreview) {
      onSendMessage(inputValue, mediaPreview.type, mediaPreview.url);
      setMediaPreview(null);
    } else if (inputValue.trim()) {
      onSendMessage(inputValue, "text");
    }
    setInputValue("");
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaPreview({ url, type: "image" });
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaPreview({ url, type: "video" });
    }
  };

  const clearMediaPreview = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview.url);
      setMediaPreview(null);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#1a1f2e]">
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#242938]">
            <UserIcon className="h-10 w-10" />
          </div>
          <p className="text-lg">Select a user to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#1a1f2e]">
      {/* Chat Header */}
      <div className="flex flex-shrink-0 items-center gap-3 bg-[#242938] px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3dd8ad] text-white">
          <span className="text-sm font-semibold">{selectedUser.initials}</span>
        </div>
        <div>
          <h2 className="font-semibold text-white">{selectedUser.name}</h2>
          <p className="text-xs text-gray-400">{selectedUser.location}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              selectedUser.isOnline ? "bg-[#3dd8ad]" : "bg-gray-500"
            }`}
          />
          <span className="text-xs text-gray-400">
            {selectedUser.isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
          {messages?.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    isCurrentUser
                      ? "bg-[#3dd8ad] text-white"
                      : "bg-[#242938] text-white"
                  }`}
                >
                  {/* Media content */}
                  {message.type === "image" && message.mediaUrl && (
                    <img
                      src={message.mediaUrl || "/placeholder.svg"}
                      alt="Shared image"
                      className="mb-2 max-h-60 rounded-lg object-cover"
                    />
                  )}
                  {message.type === "video" && message.mediaUrl && (
                    <video
                      src={message.mediaUrl}
                      controls
                      className="mb-2 max-h-60 rounded-lg"
                    />
                  )}
                  {message.text && <p className="text-sm">{message.text}</p>}
                  <span
                    className={`mt-1 block text-xs ${
                      isCurrentUser ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Media Preview  would on model not in the message*/}
      {/* {mediaPreview && (
        <div className="flex-shrink-0 bg-[#242938] px-4 py-3">
          <div className="relative inline-block">
            {mediaPreview.type === "image" ? (
              <img
                src={mediaPreview.url || "/placeholder.svg"}
                alt="Preview"
                className="h-20 rounded-lg object-cover"
              />
            ) : (
              <video
                src={mediaPreview.url}
                className="h-20 rounded-lg object-cover"
              />
            )} */}
      {/* <button
              onClick={clearMediaPreview}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )} */}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex-shrink-0 bg-[#242938] p-4">
        <div className="flex items-center gap-2">
          {/* Hidden file inputs */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoSelect}
            className="hidden"
          />

          {/* Photo button */}
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1f2e] text-gray-400 transition-colors hover:bg-[#3dd8ad] hover:text-white"
            title="Send photo"
          >
            <ImageIcon className="h-5 w-5" />
          </button>

          {/* Video button */}
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1f2e] text-gray-400 transition-colors hover:bg-[#3dd8ad] hover:text-white"
            title="Send video"
          >
            <Video className="h-5 w-5" />
          </button>

          {/* Text input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-[#1a1f2e] px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd8ad]"
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={!inputValue.trim() && !mediaPreview}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3dd8ad] text-white transition-colors hover:bg-[#35c499] disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
