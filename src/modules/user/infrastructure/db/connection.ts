import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.NAMEDB || "testing",
  process.env.USERDB || "root",
  process.env.PASSWORD || "",
  {
    host: "localhost",
    dialect: "mysql",
    /*
    // quitar los mensajes de la bd que se muestran en la consola
    logging: false, 
    */
  }
);

export default db;
