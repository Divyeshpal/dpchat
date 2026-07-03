import { Server } from "socket.io";

let io;

// userId -> socketId
const userSocketMap = {};

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    // Online Users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // ==========================
    // Typing Indicator
    // ==========================

    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId = userSocketMap[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", {
          senderId,
        });
      }
    });

    socket.on("stopTyping", ({ senderId, receiverId }) => {
      const receiverSocketId = userSocketMap[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", {
          senderId,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);

      delete userSocketMap[userId];

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export const getIO = () => io;

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};