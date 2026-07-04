import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { authUser } = useAuth();

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // 👇 New State
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    console.log("Auth User:", authUser);

    if (authUser) {
      console.log("Creating Socket...");

      const socketInstance = io("https://dpchat-backend-usid.onrender.com", {
        query: {
          userId: authUser.id,
        },
      });

      socketInstance.on("connect", () => {
        console.log("✅ Socket Connected:", socketInstance.id);
      });

      socketInstance.on("connect_error", (err) => {
        console.log("❌ Socket Error:", err.message);
      });

      socketInstance.on("getOnlineUsers", (users) => {
        console.log("🟢 Online Users:", users);
        setOnlineUsers(users);
      });

      // ==========================
      // Typing Events
      // ==========================

      socketInstance.on("typing", ({ senderId }) => {
        setTypingUser(senderId);
      });

      socketInstance.on("stopTyping", () => {
        setTypingUser(null);
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
      }

      setSocket(null);
      setTypingUser(null);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        typingUser, // 👈 New
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
