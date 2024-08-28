import userModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  const { email, password, status } = req.body;
  // verify email using rejex
  if (!email || !password || password.length <= 6 || !status) {
    return res.status(400).json({ message: " All fields are required" });
  }
  // check for duplicate
  const duplicateUser = await userModel.findOne({ email: email });
  console.log(duplicateUser);
  if (duplicateUser) {
    return res.status(409).json({ message: "This email already exist" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    email: email,
    password: hashedPwd,
    status: status,
  });
  if (!newUser) {
    return res
      .status(400)
      .json({ message: "user cannot be created. please try again" });
  }
  const token = jwt.sign(
    {
      email: email,
      status: status,
    },
    process.env.LOGIN_TOKEN,
    {
      expiresIn: "7d",
    }
  );
  return res
    .cookie(token)
    .status(200)
    .json({ message: "user created successfully" });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: " all inputs are necessary" });
  }
  const existingUser = await userModel.findOne({ email: email });
  if (!existingUser) {
    return res.status(404).json({ message: "User does't exist." });
  }
  let isCorrectPwd = await bcrypt.compare(password, existingUser.password);
  if (!isCorrectPwd) {
    return res.status(401).json({ message: " unauthorized" });
  }
  const token = jwt.sign(
    {
      email: existingUser.email,
      status: existingUser.status,
    },
    process.env.LOGIN_TOKEN,
    {
      expiresIn: "7d",
    }
  );
  return res
    .status(200)
    .cookie("Authorization ", token)
    .json({ message: "sign in successful" });
};
export { signIn, signUp };
