import mongoose from "mongoose";
// import { dotenv } from "dotenv";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connection Successfully");
  } catch (error) {
    console.log("Error while connecting to mongoDB", error.message);
  }
};
export default connectToMongoDB;
