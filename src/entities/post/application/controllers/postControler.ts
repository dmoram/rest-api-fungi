import { Request, Response } from "express";
import Post from "../../domain/models/Post";

export const createPost = async (req: Request, res: Response) => {
  const { content, image, author_id } = req.body;

  if (!content || !author_id) {
    return res
      .status(400)
      .json({ msg: "El contenido y el autor son requeridos" });
  }

  try {
    const post = await Post.create({ content, image, author_id });

    res.json({
      post,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};
