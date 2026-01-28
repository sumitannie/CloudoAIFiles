//routes/authRoutes.js — maps URLs to controller functions (/register, /login).

import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;
