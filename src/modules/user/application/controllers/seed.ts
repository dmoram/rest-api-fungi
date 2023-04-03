import { Request, Response } from "express";
import { data } from "../../../user/infrastructure/db/data";
import Usuario from "../../domain/models/User";
import bcrypt from "bcryptjs";

export const loadData = async (req: Request, res: Response) => {
  try {
    // limpiar bd
    await Usuario.destroy({ where: {}, force: true });

    // cargar datos
    const users = data.map((user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
      return user;
    });

    // Encriptar

    await Usuario.bulkCreate(users);

    res.json({
      msg: "cargado correctamente",
      ok: true,
    });
  } catch (error: any) {
    console.log(error);
  }
};
