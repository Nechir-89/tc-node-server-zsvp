import { Router } from "express";
import * as newsController from "../controllers/newsController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// any (public)
router.get("/", newsController.getAllNews); 
router.get("/:id", newsController.getNewsById);

// only authenticated users
router.post("/", authenticateToken, newsController.createNews);
router.put("/", authenticateToken, newsController.updateNews);
router.delete("/", authenticateToken, newsController.deleteNews);

export default router;
