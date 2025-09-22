import db from "../config/database";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const getAllUsers = async () => {
  console.log("⏳ getting all users");
  try {
    const req = await db.any("SELECT * FROM users");
    console.log("✅ all users fetched");
    return req;
  } catch (err: any) {
    console.log("❌ error getting all users ", err);
    return { error: `there is an error in the request` };
  }
};

export const getUserById = async (id: number) => {
  console.log("⏳ getting user with id ", id);
  try {
    const req = await db.one("SELECT * FROM users WHERE id=$<id>", {
      id,
    });
    console.log("✅ user fetched");
    return req;
  } catch (err: any) {
    console.log("❌ error getting user ", err);
    return { error: `there is an error in the request` };
  }
};

export const createUser = async (user: User) => {
  console.log("⏳ Creating new user ", user.username);
  try {
    const hashedPassword = await bcrypt.hash(
      user.password as string,
      saltRounds
    );
    const newUser = await db.one(
      `INSERT INTO users(username, hashed_password, role_name, status) 
        VALUES($<username>, $<hashed_password>, 'user', 'pending') 
        RETURNING *`,
      { username: user.username, hashed_password: hashedPassword }
    );
    console.log("✅ user created");
    return newUser;
  } catch (err: any) {
    console.log("❌ error creating new user ", err);
    return { error: `there is an error in the request` };
  }
};

// updating user name and password
export const updateUser = async ({
  id,
  user,
}: {
  id: number;
  user: Partial<User>;
}) => {
  console.log("⏳ Updating user with id: ", id);
  try {
    const existingUser: User = await getUserById(id);
    if (!existingUser) {
      console.log("❌ failed getting user ");
      return { error: `failed getting user` };
    } else {
      const updatedUsername = user.username || existingUser.username;
      let updatedPassword = existingUser.hashed_password;

      if (user.password) {
        updatedPassword = await bcrypt.hash(user.password, saltRounds);
      }

      const updatedUser = await db.one(
        `UPDATE users 
          SET username = $<updatedUsername>, hashed_password = $<updatedPassword> 
          WHERE id = $<id> 
          RETURNING *`,
        { updatedUsername, updatedPassword, id }
      );

      console.log("✅ user updated");
      return updatedUser;
    }
  } catch (err: any) {
    console.log("❌ error getting and updating user ", err);
    return { error: `there is an error in the request` };
  }
};

export const deleteUser = async ({ id }: { id: number }) => {
  console.log("⏳ Deleting user: ", id);
  try {
    const req = await db.one("DELETE FROM users WHERE id=$<id> RETURNING *", {
      id,
    });
    console.log("✅ user deleted");
    return req;
  } catch (err: any) {
    console.log("❌ error deleting user ", err);
    return { error: `there is an error in the request` };
  }
};

export const getUserByUsername = async (username: string) => {
  console.log("⏳ getting user by username: ", username);
  try {
    const req = await db.one(
      "SELECT * FROM users WHERE username = $<username>",
      {
        username: username,
      }
    );
    console.log("✅ user fetched");
    return req;
  } catch (err: any) {
    console.log("❌ error getting user ", err);
    return { error: `there is an error in the request` };
  }
};
