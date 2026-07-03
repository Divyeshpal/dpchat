import { useChat } from "../context/ChatContext";
import { useSocket } from "../context/SocketContext";

function ChatHeader() {
  const { selectedUser } = useChat();

  const { onlineUsers, typingUser } = useSocket();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  const isTyping = typingUser === selectedUser._id;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
            {selectedUser.fullName.charAt(0).toUpperCase()}
          </div>

          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-gray-800"></span>
          )}
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg">
            {selectedUser.fullName}
          </h2>

          <p
            className={`text-sm ${
              isTyping
                ? "text-green-400"
                : isOnline
                ? "text-green-400"
                : "text-gray-400"
            }`}
          >
            {isTyping
              ? "Typing..."
              : isOnline
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5 text-2xl text-gray-300">
        <button className="hover:text-green-400 transition">
          📞
        </button>

        <button className="hover:text-green-400 transition">
          🎥
        </button>

        <button className="hover:text-green-400 transition">
          ⋮
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;