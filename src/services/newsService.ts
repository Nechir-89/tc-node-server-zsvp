import db from "../config/database";
import { News } from "../models/News";
import { User } from "../models/User";

export const getAllNews = async () => {
  console.log("⏳ getting all news");
  try {
    const req = await db.any("SELECT * FROM news");
    console.log("✅ all news fetched");
    return req;
  } catch (err: any) {
    console.log("❌ error getting all news ", err);
    return { error: `there is an error in the request` };
  }
};

export const getNewsById = async (id: number) => {
  console.log("⏳ getting news with id ", id);
  try {
    const req = await db.one("SELECT * FROM news WHERE id=$<id>", {
      id,
    });
    console.log("✅ news fetched");
    return req;
  } catch (err: any) {
    console.log("❌ error getting news ", err);
    return { error: `there is an error in the request` };
  }
};

export const createNews = async (news: News) => {
  console.log("⏳ Creating new news ", news.title);
  try {
    const newNews = await db.one(
      `INSERT INTO news(title, details, details_kur, details_ar, text_direction, excerpt, published_date, featured_image) 
        VALUES($<title>, $<details>, $<details_kur>, $<details_ar>, $<text_direction>, $<excerpt>, $<published_date>, $<featured_image>)  
        RETURNING *`,
      news
    );
    console.log("✅ news created");
    return newNews;
  } catch (err: any) {
    console.log("❌ error creating new news ", err);
    return { error: `there is an error in the request` };
  }
};

export const updateNews = async ({ id, news }: { id: number; news: News }) => {
  console.log("⏳ Updating news with id: ", id);
  try {
    // const existingUser: User = await getNewsById(id);
    // if (!existingUser) {
    //   console.log("❌ failed getting user ");
    //   return { error: `failed getting user` };
    // } else {
    //   const updatedUsername = user.username || existingUser.username;
    //   let updatedPassword = existingUser.hashed_password;

    //   if (user.password) {
    //     updatedPassword = await bcrypt.hash(user.password, saltRounds);
    //   }

    //   const updatedUser = await db.one(
    //     `UPDATE users
    //       SET username = $<updatedUsername>, hashed_password = $<updatedPassword>
    //       WHERE id = $<id>
    //       RETURNING *`,
    //     { updatedUsername, updatedPassword, id }
    //   );

    //   console.log("✅ user updated");
    //   return updatedUser;
    // }
    console.log("➡️ Updating news is not available");
  } catch (err: any) {
    console.log("❌ error getting and updating news ", err);
    return { error: `there is an error in the request` };
  }
};

export const deleteNews = async ({ id }: { id: number }) => {
  console.log("⏳ Deleting news: ", id);
  try {
    const req = await db.one("DELETE FROM news WHERE id=$<id> RETURNING *", {
      id,
    });
    console.log("✅ news deleted");
    return req;
  } catch (err: any) {
    console.log("❌ error deleting news ", err);
    return { error: `there is an error in the request` };
  }
};
