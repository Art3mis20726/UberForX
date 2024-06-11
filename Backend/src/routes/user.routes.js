import Router from "express";
import { findNearestCop, loginUser, registerUser } from "../controllers/user.controller.js";
import VerifyJWT from "../middlewares/auth.middlewares.js";
const router=Router();
router.route("/registerUser").post(registerUser)
router.route("/loginUser").post(loginUser)
router.route("/nearest-cop").post(VerifyJWT,findNearestCop)
router.route("/civilian.html").get(VerifyJWT,(req,res)=>{
    res.render("civilian.html",{userId:req.user.userName});
})

export default router 
