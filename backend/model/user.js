import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  status:{
    type: String,
    enum: ["admin", "team member"],
    required: true
  }
});

const userModel = model("User", userSchema);
export default userModel
