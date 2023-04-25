import { Request, Response } from "express";
import Post from "../../../post/domain/models/Post";
import User from "../../../user/domain/models/User";
import Comment from "../../domain/models/Comment";
import CommentLikes from "../../domain/models/CommentLikes";

export const getComments = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        attributes: ["username", "userType"],
      },
      where: { post_id: post_id },
    });
    res.json({
      comments,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { content, post_id, author_id } = req.body;
  if (!content || !post_id || !author_id) {
    return res
      .status(400)
      .json({ msg: "El contenido y el autor son requeridos" });
  }

  try {
    const comment = await Comment.create({
      content,
      post_id,
      author_id,
      likes: 0,
    });

    res.json({
      comment,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    const errorMessage = "Hubo un error al crear el comentario.";
    return res.status(500).json({ msg: errorMessage, error: error });
  }
};
