import { Router } from "express";
import { getReview, updateReviews } from "../controller/adminController.js";

const adminRouter = Router();

adminRouter.route("/admin").get(getReview);
adminRouter.route("/update-prod").put(updateReviews);

export default adminRouter;
