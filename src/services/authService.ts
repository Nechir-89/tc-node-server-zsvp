import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userService from "./userService";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function login(
  // credentials: Pick<User, "username" | "password">
  { username, password }: { username: string; password: string }
): Promise<{
  token: string;
  user: User;
} | null> {
  const user: User & { error?: string } = await userService.getUserByUsername(
    username
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
    password as string,
    user.hashed_password as string
  );

  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
}
