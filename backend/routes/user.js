import { Router } from "express";
import { signIn, signUp } from "../controller/userController.js";

const router = Router();

router.route("/").get((req, res) => {
  res.send("<h1>hello world</h1>");
});
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

export default router;
