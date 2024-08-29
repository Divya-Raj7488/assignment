import { Router } from "express";

const adminRouter = Router()

adminRouter.route("/admin").get()
export default adminRouter