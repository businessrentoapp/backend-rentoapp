import express from "express";
import { getHomePage } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/", getHomePage);

export default router;
