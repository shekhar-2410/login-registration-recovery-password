import express from "express";
import { resetPasswordController } from "../controllers/resetPasswordController.js";

const router = express.Router();

router.post("/reset-password", resetPasswordController);

export default router;