import mongoose from "mongoose";

let isConnected = false;
const connectToDB = async () => {
  if (isConnected) {
    console.log("Using existing connection");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI_UPDATE, {
      dbName: "4cinephile",
    });

    isConnected = true;
  } catch (err) {
    console.log("Error connecting to DB", err);
  }
};

export default connectToDB;
