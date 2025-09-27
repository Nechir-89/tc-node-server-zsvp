import { Request, RequestHandler, Response } from "express";
import * as userService from "../services/userService";
import { User } from "../models/User";
import { addMultipleImages } from "../services/imagesService";
import { CustomeFile } from "../models/file";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] | { error: string } = await userService.getAllUsers();
    if (users && !Array.isArray(users) && users.error) {
      res.status(500).json({ message: users.error });
    } else res.json(users);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Error fetching users: " });
  }
};

export const getUserById: RequestHandler<
  never,
  Response,
  { id: number },
  never
> = async (req, res: Response) => {
  try {
    const user: User & { error?: string } = await userService.getUserById(
      Number(req.body.id)
    );
    if (user && user.error) {
      res.status(500).json({ message: user.error });
    } else res.status(200).json(user);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Error fetching user: " });
  }
};

export const createUser: RequestHandler<
  never,
  Response,
  { username: string; password: string },
  never
> = async (req, res: Response) => {
  try {
    const newUser: User & { error?: string } = await userService.createUser(
      req.body
    );

    if (newUser && newUser.error) {
      res.status(404).json({ message: newUser.error });
    } else res.status(201).json(newUser);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Server runing into an error" });
  }
};

export const updateUser: RequestHandler<
  never,
  Response,
  { id: number; username: string; password: string },
  never
> = async (req, res: Response) => {
  try {
    const updatedUser: User & { error?: string } = await userService.updateUser(
      {
        id: req.body.id,
        user: { username: req.body.username, password: req.body.password },
      }
    );

    if (updatedUser && updatedUser.error) {
      res.status(404).json({ message: updatedUser.error });
    } else res.status(204).json(updateUser);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Server runing into an error" });
  }
};

export const deleteUser: RequestHandler<
  never,
  Response,
  { id: number },
  never
> = async (req, res: Response) => {
  try {
    const q: User & { error?: string } = await userService.deleteUser({
      id: Number(req.body.id),
    });
    if (q && q.error) {
      res.status(404).json({ message: q.error });
    } else res.status(200).json(q);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const r = await addMultipleImages({
      files: req.files as CustomeFile[],
      content_type: req.body.content_type,
      content_id: Number(req.body.content_id),
    });
    
    if (r) {
      res.status(200).json({
        message: "File uploaded successfully",
      });
    } else
      res.status(400).json({
        message: "File uploaded failed",
      });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file" });
  }
};
