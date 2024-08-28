import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("connected")
  } catch (err) {
    console.log(err);
  }
};

export default DbConnect
