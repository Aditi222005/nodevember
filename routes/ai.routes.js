import express from "express";
import { getBookInsights } from "../controller/ai.controller.js";
import { protectRoute, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:bookId", getBookInsights)


export default router;