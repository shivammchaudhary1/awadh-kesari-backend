import express from "express";
const userRoutes = express.Router();
import { signup } from "../controllers/user.controller.js";

userRoutes.post("/signup", signup);

export default userRoutes;
