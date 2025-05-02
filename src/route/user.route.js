import { signup, login } from "../controller";
import express from "express";

const router = express.Router();

router.route("/").post("/signup", signup).post("/login", login);

export default router;
