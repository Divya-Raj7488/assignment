// features - can see and update the review status

import productModel from "../model/products.js";
import reviewModel from "../model/review.js";

const getReview = async (req, res) => {
  try {
    const products = await reviewModel.find({});
    return res.status(200).json({
      message: "here are all the products to be reviewed",
      data: products,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "cannot get reviews. please try again" });
  }
};

const updateReviews = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (!_id || !status) {
      return res.status(401).json({ message: "invalid id or status" });
    }
    const prodToUpdate = await reviewModel.findById(_id);
    if (!prodToUpdate) {
      return res
        .status(409)
        .json({ message: "No product found. please check your productId" });
    }
    if (prodToUpdate.status === "accepted") {
      return res.status(200).json({ message: "already accepted" });
    }
    if (status === "accepted") {
      const prodId = prodToUpdate.productId;
      const newProd = delete prodToUpdate.productId;
      await productModel.findByIdAndUpdate(prodId, newProd);
    }
    prodToUpdate.status = status;
    return res.status(200).json({ message: "review successful" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: `${err.message}.Cannot update review. please try again`,
    });
  }
};
export { getReview, updateReviews };
