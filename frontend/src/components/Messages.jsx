import { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import { useAuth } from "../context/AuthContext";

function Messages() {
  const { messages } = useGetMessages();
  const { authUser } = useAuth();

  const lastMessageRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Format Time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="flex-1 overflow-y-auto p-5 space-y-3"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/cubes.png')",
      }}
    >
      {messages.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">
          No messages yet 👋
        </p>
      ) : (
        messages.map((message, index) => {
          const isMe =
            message.senderId === authUser.id ||
            message.senderId?._id === authUser.id;

          return (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`flex ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md ${
                  isMe
                    ? "bg-green-500 text-white rounded-br-sm"
                    : "bg-gray-700 text-white rounded-bl-sm"
                }`}
              >
                <p className="break-words">{message.message}</p>

                <p
                  className={`text-[10px] mt-1 text-right ${
                    isMe ? "text-green-100" : "text-gray-300"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Messages;