import { Router } from "express";
import {
  getAllProduct,
  addProductForReview,
  addedForReview,
} from "../controller/teamController.js";

const teamRouter = Router();

teamRouter.route("/products").get(getAllProduct);
teamRouter.route("/added-for-review").get(addedForReview);
teamRouter.route("/review").post(addProductForReview);

export default teamRouter;
