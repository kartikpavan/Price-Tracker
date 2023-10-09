import mongoose from "mongoose";

let isConnected = false; // variable to track connection status
const MONGO_URI = process.env.MONGO_URI;

export async function connectToDb() {
  mongoose.set("strictQuery", true);
  if (!MONGO_URI) return console.log("Mongo URI not found");
  if (isConnected) return console.log("-> Using Existing DB connection");
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("MongoDB COnnection Successful");
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
