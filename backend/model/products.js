import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImgUrl: {
    type: String,
    required: true,
  },
});

const productModel = model("Product", productSchema);
export default productModel;
