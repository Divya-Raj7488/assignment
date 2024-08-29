// they can see all the products and put it up for review
// get request for all the products
import productModel from "../model/products.js";
import reviewModel from "../model/review.js";

const getAllProduct = async (req, res) => {
  const products = await productModel.find({});
  return res
    .status(200)
    .json({ message: "here is all the products", data: products });
};

const addProductForReview = async (req, res) => {
  try {
    const {
      _id,
      productId,
      productName = "",
      productDescription = "",
      price,
    } = req.body;

    // Validate required identifiers
    if (!productId && !_id) {
      return res.status(400).json({
        message: "Cannot process the request without product details.",
      });
    }

    // Prepare input data for update or creation
    const inputs = {};
    if (productName) inputs.productName = productName;
    if (productDescription) inputs.productDescription = productDescription;
    if (price !== undefined) inputs.price = price;

    let itemForReview;

    if (_id) {
      itemForReview = await reviewModel.findByIdAndUpdate(_id, inputs, {
        new: true,
      });
      if (!itemForReview) {
        return res.status(404).json({ message: "Item not found." });
      }
      return res
        .status(200)
        .json({ message: "Item updated for review successfully." });
    } else {
      const productExists = await productModel.exists({ _id: productId });
      if (!productExists) {
        return res
          .status(404)
          .json({ message: "Product not found for the provided productId." });
      }

      inputs.productId = productId;
      itemForReview = await reviewModel.create(inputs);
      return res
        .status(201)
        .json({ message: "New product added for review successfully." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again.",
    });
  }
};

const addedForReview = async (req, res) => {
  const productForReview = await reviewModel.find({});
  return res.status(200).json({
    message: "here are all the products to be reviewed",
    data: productForReview,
  });
};
export { getAllProduct, addProductForReview, addedForReview };
