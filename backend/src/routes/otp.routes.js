import express from "express";

import { checkUser } from "../middlewares/checkUser.js";
import { reqOTP, verifyOTP } from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/request-otp", checkUser, reqOTP);
router.post("/verify-otp", checkUser, verifyOTP);

export default router;
