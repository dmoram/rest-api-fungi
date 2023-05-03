import { Request, Response } from "express";
import Comment from "../../../comment/domain/models/Comment";
import User from "../../../user/domain/models/User";
import multer from "multer";
import path from "path";
import FungiRecord from "../../domain/models/FungiRecord";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/records/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = file.originalname.split(".").pop(); // obtener la extensión del archivo
    cb(null, uniqueSuffix + "-" + file.originalname + "." + fileExt); // agregar la extensión al nombre de archivo
  },
});

const upload = multer({ storage: storage });

export const createRecord = async (req: Request, res: Response) => {
    const { author_id, description, location, latitude, longitude, altitude } = req.body;
    let image: string | undefined;
  
    // Si se envió una imagen, guárdala en la ruta especificada en la configuración del almacenamiento de multer
    if (req.file) {
      image = req.file.path;
    }
  
    if (!description || !author_id || !location) {
      return res
        .status(400)
        .json({ msg: "La descripción, el autor y la ubicación son requeridos" });
    }
  
    try {
      const record = await FungiRecord.create({
        description,
        author_id,
        location,
        image,
        latitude,
        longitude,
        altitude,
        likes: 0,
        comments: 0
      });
  
      res.json({
        record,
        ok: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error });
    }
  };