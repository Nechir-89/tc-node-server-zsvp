import { Router } from "express";
import * as newsController from "../controllers/newsController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken, newsController.getAllNews);
router.get("/:id", authenticateToken, newsController.getNewsById);
router.post("/", authenticateToken, newsController.createNews);
router.put("/", authenticateToken, newsController.updateNews);
router.delete("/", authenticateToken, newsController.deleteNews);

export default router;
