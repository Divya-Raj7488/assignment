import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    default: "",
  },
  productDescription: {
    type: String,
    default: "",
  },
  price: {
    type: String,
    default: "",
  },
  productImgUrl: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["accepted", "pending", "rejected"],
    default: "pending",
  },
});

const reviewModel = model("Review", reviewSchema);
export default reviewModel;
