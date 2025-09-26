import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";
import upload from "../middleware/upload";

const router = Router();

// only authenticated users can access users
router.get("/", authenticateToken, userController.getAllUsers);
router.get("/:id", authenticateToken, userController.getUserById);
router.post("/", authenticateToken, userController.createUser);
router.put("/", authenticateToken, userController.updateUser);
router.delete("/", authenticateToken, userController.deleteUser);
router.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  userController.uploadFile
);

export default router;
