// otpValidationRoute.js
import express from "express";
import { otpValidationController } from "../controllers/otpValidationController.js";

const router = express.Router();

router.post("/validate", otpValidationController);

export default router;
