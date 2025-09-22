import { Request, Response } from "express";
import * as authService from "../services/authService";

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);
    if (token) {
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
