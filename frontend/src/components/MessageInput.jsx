import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../hooks/useSendMessage";
import { useSocket } from "../context/SocketContext";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

function MessageInput() {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const pickerRef = useRef(null);
  const typingTimeout = useRef(null);

  const { sendMessage, loading } = useSendMessage();
  const { socket } = useSocket();
  const { selectedUser } = useChat();
  const { authUser } = useAuth();

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    await sendMessage(message);

    setMessage("");
    setShowPicker(false);

    socket?.emit("stopTyping", {
      senderId: authUser.id,
      receiverId: selectedUser._id,
    });
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!socket || !selectedUser) return;

    socket.emit("typing", {
      senderId: authUser.id,
      receiverId: selectedUser._id,
    });

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: authUser.id,
        receiverId: selectedUser._id,
      });
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute bottom-24 left-2 z-50"
        >
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            theme="dark"
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="h-20 bg-gray-800 border-t border-gray-700 px-4 flex items-center gap-3"
      >
        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowPicker((prev) => !prev)}
          className="text-2xl hover:scale-110 transition"
        >
          😊
        </button>

        {/* Attachment Button */}
        <button
          type="button"
          className="text-2xl text-gray-300 hover:text-white hover:scale-110 transition"
        >
          📎
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleTyping}
          className="flex-1 bg-gray-700 text-white px-5 py-3 rounded-full outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white text-xl transition disabled:opacity-50"
        >
          {loading ? "..." : "➤"}
        </button>
      </form>
    </div>
  );
}

export default MessageInput;