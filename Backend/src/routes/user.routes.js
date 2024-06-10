import Router from "express";
import { findNearestCop, loginUser, registerUser } from "../controllers/user.controller.js";
import VerifyJWT from "../middlewares/auth.middlewares.js";
const router=Router();
router.route("/registerUser").post(registerUser)
router.route("/loginUser").post(loginUser)
router.route("/nearest-cop").post(VerifyJWT,findNearestCop)
export default router
