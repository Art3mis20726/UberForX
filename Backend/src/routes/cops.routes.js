import Router from "express";
import { copDetails, registerCop } from "../controllers/cops.controller.js";
const router=Router()
router.route("/registerCop").post(registerCop)//register cop
router.get('/cop.html', (req, res) => {
    res.render('cop.html', {
        userId: req.query.userId
    });
});
router.route("/info").get(copDetails)

export default router 