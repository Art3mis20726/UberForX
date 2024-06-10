import Router from "express";
import { registerCop } from "../controllers/cops.controller.js";
const router=Router()
router.route("/registerCop").post(registerCop)//register cop
export default router