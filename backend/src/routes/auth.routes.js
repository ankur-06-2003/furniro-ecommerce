import express from "express";
import { checkUser } from "../middlewares/checkUser.js";
import {
  register,
  login,
  logout,
  loggedInUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", checkUser, loggedInUser);
router.post("/logout", checkUser, logout);

export default router;
