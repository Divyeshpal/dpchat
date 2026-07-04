import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/message.route.js";

import { initializeSocket } from "./socket/socket.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Create HTTP Server
const server = http.createServer(app);

// ======================
// Middleware
// ======================
app.use(
  cors({
    origin: "https://dpchat-frontend.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

// ======================
// Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("DP Chat API Running...");
});

// ======================
// Socket.IO
// ======================
initializeSocket(server);

const PORT = process.env.PORT || 5000;

// ======================
// Start Server
// ======================
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
