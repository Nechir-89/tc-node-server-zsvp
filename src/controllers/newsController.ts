import { Request, RequestHandler, Response } from "express";
import * as newsService from "../services/newsService";
import { User } from "../models/User";
import { News } from "../models/News";

export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news: News[] | { error: string } = await newsService.getAllNews();
    if (news && !Array.isArray(news) && news.error) {
      res.status(500).json({ message: news.error });
    } else res.json(news);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Error fetching users: " });
  }
};

export const getNewsById: RequestHandler<
  {id: number},
  Response,
  Request,
  never
> = async (req, res: Response) => {
  try {
    const news: News & { error?: string } = await newsService.getNewsById(
      Number(req.params.id)
    );
    if (news && news.error) {
      res.status(500).json({ message: news.error });
    } else res.status(200).json(news);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Error fetching user: " });
  }
};

export const createNews: RequestHandler<never, Response, News, never> = async (
  req,
  res: Response
) => {
  try {
    const newNews: News & { error?: string } = await newsService.createNews(
      req.body as News
    );

    if (newNews && newNews.error) {
      res.status(404).json({ message: newNews.error });
    } else res.status(201).json(newNews);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Server runing into an error" });
  }
};

export const updateNews: RequestHandler<
  never,
  Response,
  { id: number; news: News },
  never
> = async (req, res: Response) => {
  try {
    const updatedNews: (News & { error?: string }) | undefined =
      await newsService.updateNews({
        id: req.body.id,
        news: req.body.news,
      });

    if (!updateNews)
      return res
        .status(400)
        .json({ message: "updating news is not availabel yet!" });
    if (updatedNews && updatedNews.error) {
      res.status(404).json({ message: updatedNews.error });
    } else res.status(204).json(updatedNews);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Server runing into an error" });
  }
};

export const deleteNews: RequestHandler<
  never,
  Response,
  { id: number },
  never
> = async (req, res: Response) => {
  try {
    const q: User & { error?: string } = await newsService.deleteNews({
      id: Number(req.body.id),
    });
    if (q && q.error) {
      res.status(404).json({ message: q.error });
    } else res.status(200).json(q);
  } catch (error) {
    console.log(`❌: Server is running into an error: `, error);
    res.status(500).json({ message: "Server runing into an error" });
  }
};
