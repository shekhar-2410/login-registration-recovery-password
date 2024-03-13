import express from "express";
import { otpController } from "../controllers/otpController.js";

const router = express.Router();

router.post("/forgot-password", otpController);

export default router;
