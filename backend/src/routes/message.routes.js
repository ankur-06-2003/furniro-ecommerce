import express from "express";
import { createMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", createMessage);
// router.get("/", getProducts);
// router.get("/:id", getSingleProduct);
// router.delete("/:id", verifyAdmin, deleteProduct);

export default router;
