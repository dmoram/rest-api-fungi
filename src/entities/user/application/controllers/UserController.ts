import { Request, Response } from "express";
import Usuario from "../../domain/models/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';



export const getUsuarios = async (req: Request, res: Response) => {
  const usuario = await Usuario.findAll();

  res.json({
    usuario,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({
      msg: `no existe un usuario con el id ${id}`,
    });
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const emailExist = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExist) {
      return res.status(400).json({
        msg: `The email ${body.email} exists in bd`,
        ok: false,
      });
    }

    const usuario = Usuario.build(body);

    const salt = bcrypt.genSaltSync();
    usuario.set({ password: bcrypt.hashSync(body.password, salt) });
    await usuario.save();

    res.json({
      usuario,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        msg: `The user with email: ${email} not exists`,
      });
    }else if(usuario.getDataValue('deletedAt') != null){
      return res.status(404).json({
        msg: `The user with email: ${email} not exists`,
      });
    }
    const isMatch = await bcrypt.compare(password, usuario.getDataValue('password'));

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const payload = {
      usuario: {
        id: usuario.getDataValue('id'),
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "",
      { expiresIn: "7d" },
      (error, token) => {
        if (error) throw error;

        res.status(200).json({id: usuario.getDataValue('id'), token});
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: `The user with id: ${id} not exists`,
      });
    }

    if (body.password) {
      const salt = bcrypt.genSaltSync();
      body.password = bcrypt.hashSync(body.password, salt);
    }

    if (body.email) {
      const emailExist = await Usuario.findOne({
        where: {
          email: body.email,
        },
      });

      if (emailExist) {
        return res.status(400).json({
          msg: `The email ${body.email} exists in bd`,
          ok: false,
        });
      }
    }

    await usuario.update(body);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  console.log('ga')

  if (!usuario) {
    return res.status(404).json({
      msg: `The user with id: ${id} not exists`,
    });
  }

  try {
    await usuario.destroy();

    res.json({
      msg: "usuario eliminado",
      id,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};