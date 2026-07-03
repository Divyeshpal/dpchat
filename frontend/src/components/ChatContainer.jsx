import { useChat } from "../context/ChatContext";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function ChatContainer() {
  const { selectedUser } = useChat();

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <h1 className="text-3xl text-gray-400">
          Select a user to start chatting
        </h1>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <ChatHeader />
      <Messages />
      <MessageInput />
    </div>
  );
}

export default ChatContainer;