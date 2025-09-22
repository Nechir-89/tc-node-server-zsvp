import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userService from "./userService";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const login = async (
  credentials: Pick<User, "username" | "password">
): Promise<string | null> => {
  const user: User & { error?: string } = await userService.getUserByUsername(
    credentials.username as string
  );
  if (!user) {
    return null;
  }

  if (user && user.error) {
    return null;
  }

  if (user && user.status !== "verified") {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(
    credentials.password as string,
    user.hashed_password as string
  );

  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
