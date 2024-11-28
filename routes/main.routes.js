import { Router } from "express";
import mainController from "../controllers/main.controller.js";

const router = Router();

router.use("/", mainController);

export default router;