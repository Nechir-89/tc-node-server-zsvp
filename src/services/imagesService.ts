import db from "../config/database";
import { ImageModel } from "../models/image";

export const getAllImages = async () => {
  console.log("⏳ getting all images");
  try {
    const req = await db.any("SELECT * FROM images ORDER BY id DESC");
    console.log("✅ all images fetched");
    return req;
  } catch (err: any) {
    console.log("❌ error getting all images ", err);
    return { error: `there is an error in the request` };
  }
};

export const getImagesByContentId = async ({
  content_id,
}: {
  content_id: number;
}) => {
  console.log("⏳ getting images by content id ", content_id);
  try {
    const req: ImageModel[] = await db.any(`SELECT * FROM images 
      WHERE content_id=$<content_id> 
      ORDER BY id DESC`, {content_id});
    console.log("✅ images fetched with content id");
    return req;
  } catch (err: any) {
    console.log("❌ error getting images with content id ", err);
    return { error: `there is an error in the request` };
  }
};

export const getImageById = async (id: number) => {
  console.log("⏳ getting image with id ", id);
  try {
    const req = await db.one("SELECT * FROM images WHERE id=$<id>", {
      id,
    });
    console.log("✅ image fetched");
    return req;
  } catch (err: any) {
    console.log("❌ error getting image ", err);
    return { error: `there is an error in the request` };
  }
};

export const addImage = async (image: ImageModel) => {
  console.log("⏳ adding new image ");
  try {
    const newImage = await db.one(
      `INSERT INTO images(image, content_type, content_id) 
        VALUES($<image>, $<content_type>, $<content_id>) 
        RETURNING *`,
      image
    );
    console.log("✅ image added");
    return newImage;
  } catch (err: any) {
    console.log("❌ error adding new image ", err);
    return { error: `there is an error in the request` };
  }
};
