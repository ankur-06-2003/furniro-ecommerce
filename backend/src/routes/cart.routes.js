import express from "express";
import { checkUser } from "../middlewares/checkUser.js";
import {
  addCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", checkUser, addCart);
router.post("/my-cart", checkUser, getCart);
router.put("/my-cart", checkUser, updateCart);
router.delete("/my-cart/item", checkUser, removeCartItem);
router.delete("/my-cart", checkUser, clearCart);

export default router;
