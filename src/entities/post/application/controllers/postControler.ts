import { Request, Response } from "express";
import Post from "../../domain/models/Post";
import User from "../../../user/domain/models/User";
import PostLikes from "../../domain/models/PostLikes";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = file.originalname.split(".").pop(); // obtener la extensión del archivo
    cb(null, uniqueSuffix + "-" + file.originalname + "." + fileExt); // agregar la extensión al nombre de archivo
  },
});

const upload = multer({ storage: storage });

export const createPost = async (req: Request, res: Response) => {
  const { content, author_id, likes } = req.body;
  let image: string | undefined;

  // Si se envió una imagen, guárdala en la ruta especificada en la configuración del almacenamiento de multer
  if (req.file) {
    image = req.file.path;
  }

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

export const updateLikes = async (req: Request, res: Response) => {
  const { post_id, user_id} = req.body;
  if (!post_id || !user_id) {
    return res
      .status(400)
      .json({ msg: "El ID del post, usuario y los likes son requeridos" });
  }
  try {
    const post = await Post.findByPk(post_id);

    if (!post) {
      return res.status(404).json({ msg: "El post no fue encontrado" });
    }

    // Verificar si el usuario ya ha dado like al post
    const postLike = await PostLikes.findOne({
      where: {
        user_id: user_id,
        post_id: post_id,
      },
    });

    if (postLike) {
      return res
        .status(400)
        .json({ msg: "El usuario ya ha dado like a este post" });
    }

    post.update({
      likes: post.getDataValue("likes") + 1,
    });
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

export const getPostImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Busca el post que contenga la imagen solicitada
    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({ msg: "La imagen no fue encontrada" });
    }

    // Devuelve la imagen en formato de archivo
    const imagePath = path.join(
      "../../../../../..",
      post.getDataValue("image")
    );
    console.log(imagePath);
    res.sendFile(post.getDataValue("image"), { root: "." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
};
