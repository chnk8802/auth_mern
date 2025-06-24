import mongoose from "mongoose";
import removeVersionKeyPlugin from "../plugins/removeVersionKeyPlugin.js";

mongoose.plugin(removeVersionKeyPlugin);
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
export default connectDB;
