import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();

// routing

// register | method:POST
router.post("/register", registerController);

// login| method:POST
router.post("/login", loginController);

// test| method:get
router.get("/test", requireSignIn,isAdmin, testController);

export default router;
