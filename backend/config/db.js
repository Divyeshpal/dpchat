import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("===== MongoDB Debug =====");
    console.log("MONGO_URI:", process.env.MONGO_URI);
    console.log("=========================");

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("===== MongoDB Connection Error =====");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("===================================");

    // App ko crash mat karo
    return;
  }
};

export default connectDB;