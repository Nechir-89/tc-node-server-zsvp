import { Request, RequestHandler, Response } from "express";
import * as imageService from "../services/imagesService";
import { ImageModel } from "../models/image";

export const getAllImages = async (req: Request, res: Response) => {
  try {
    const images: ImageModel[] | { error: string } =
      await imageService.getAllImages();
    if (images && !Array.isArray(images) && images.error) {
      res.status(500).json({ message: images.error });
    } else res.json(images);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Error fetching all images: " });
  }
};

export const getImageById: RequestHandler<
  { id: number },
  Response,
  Request,
  never
> = async (req, res: Response) => {
  try {
    const image: ImageModel & { error?: string } =
      await imageService.getImageById(Number(req.params.id));
    if (image && image.error) {
      res.status(500).json({ message: image.error });
    } else res.status(200).json(image);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Error fetching image" });
  }
};

export const getImagesByContentId: RequestHandler<
  never,
  Response,
  { content_id: number },
  never
> = async (req, res: Response) => {
  try {
    const images: ImageModel[] | { error?: string } =
      await imageService.getImagesByContentId({
        content_id: Number(req.body.content_id),
      });
    if (images && !Array.isArray(images) && images.error) {
      res.status(500).json({ message: images.error });
    } else res.json(images);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Error fetching images" });
  }
};

export const addImage: RequestHandler<
  never,
  Response,
  ImageModel,
  never
> = async (req, res: Response) => {
  try {
    const image: ImageModel & { error?: string } = await imageService.addImage(
      req.body as ImageModel
    );

    if (image && image.error) {
      res.status(404).json({ message: image.error });
    } else res.status(201).json(image);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Server adding image" });
  }
};
