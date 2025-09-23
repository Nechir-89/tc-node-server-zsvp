import { Request, RequestHandler, Response } from "express";
import * as authService from "../services/authService";

export const login: RequestHandler<
  never,
  Response,
  { username: string; password: string },
  never
> = async (req, res: Response) => {
  try {
    const r = await authService.login({
      username: req.body.username,
      password: req.body.password,
    });
    if (r) {
      res.json(r);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
