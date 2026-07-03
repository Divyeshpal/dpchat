import { useEffect } from "react";
import api from "../services/api";
import { useChat } from "../context/ChatContext";
import { useSocket } from "../context/SocketContext";

function useGetMessages() {
  const {
    selectedUser,
    messages,
    setMessages,
  } = useChat();

  const { socket } = useSocket();

  // Fetch old messages
  useEffect(() => {
    if (!selectedUser) return;

    const getMessages = async () => {
      try {
        const res = await api.get(`/messages/${selectedUser._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();

    return () => setMessages([]);
  }, [selectedUser]);

  // Listen for realtime messages
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  return { messages };
}

export default useGetMessages;