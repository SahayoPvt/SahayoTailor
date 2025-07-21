import mongoose from "mongoose";
import 'dotenv/config';
export const connectMongoDatabase = () => {
  mongoose.connect(process.env.MONGODB_URI).then((data) => {
    console.log(`MongoDB connected with server ${data.connection.host}`);
  });
};
