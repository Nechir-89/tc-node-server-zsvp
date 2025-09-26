import { Router } from "express";
import * as imagesController from "../controllers/imagesController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// any (public)
router.get("/", imagesController.getAllImages);
router.get("/:id", imagesController.getImageById);
router.post("/content_id", imagesController.getImagesByContentId);

// only authenticated users
router.post("/", authenticateToken, imagesController.addImage);

export default router;
