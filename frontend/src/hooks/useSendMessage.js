import { useState } from "react";
import api from "../services/api";
import { useChat } from "../context/ChatContext";

function useSendMessage() {
  const {
    selectedUser,
    setMessages,
  } = useChat();

  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    try {
      setLoading(true);

      const res = await api.post(
        `/messages/send/${selectedUser._id}`,
        {
          message,
        }
      );

      setMessages((prev) => [...prev, res.data]);

      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading,
  };
}

export default useSendMessage;