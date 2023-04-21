import { Request, Response } from "express";
import Post from "../../domain/models/Post";
import User from "../../../user/domain/models/User";

export const createPost = async (req: Request, res: Response) => {
  const { content, image, author_id, likes } = req.body;

  if (!content || !author_id) {
    return res
      .status(400)
      .json({ msg: "El contenido y el autor son requeridos" });
  }

  try {
    const post = await Post.create({ content, image, author_id, likes });

    res.json({
      post,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["username", "userType"],
      },
    });

    res.json({
      posts,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export const putLikes = async (req: Request, res: Response) => {
  const { id, likes } = req.body;
  if (!id || !likes) {
    return res
      .status(400)
      .json({ msg: "El ID del post y los likes son requeridos" });
  }
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ msg: "El post no fue encontrado" });
    }

    post.update({
      likes: likes
    })
    await post.save();

    res.json({
      post,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};
