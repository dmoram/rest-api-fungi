import { Router } from "express";
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
  loginUsuario
} from "../../../application/controllers/UserController";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.get("/", getUsuarios);

router.get("/:id", getUsuario);

router.post(
  "/",
  [
    check(
      "username",
      "It has to be string and also be greater than 2 characters"
    )
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    check(
      "fullName",
      "It has to be string and also be greater than 2 characters"
    )
      .not()
      .isEmpty()
      .isLength({ min: 2 }),
    check("email", "invalid email").isEmail(),
    check("password", "It has to be greater than 6 characters ")
      .notEmpty()
      .isLength({ min: 6 }),
    validarCampos,
  ],
  postUsuario
);

router.post("/login",
  loginUsuario
);

router.put("/:id", putUsuario);
router.delete("/:id", deleteUsuario);

export default router;
