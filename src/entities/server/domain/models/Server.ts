import express, { Application } from "express";
import userRoutes from "../../../user/infrastructure/web/routes/userRoutes";
import seed from "../../../user/infrastructure/web/routes/seed";
import cors from "cors";
import db from "../../../user/infrastructure/db/connection";

class Server {
  private app: Application;
  private port: number;
  private apiPaths = {
    usuarios: "/api/usuarios",
    
    seed: "/seed",
  };

  constructor() {
    this.app = express();
    this.port = 8000;

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.sync();
      console.log("DB Online");
    } catch (error: any) {
      throw new Error(error);
    }
  }
  // Functions  that are executed before the other routes
  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());

    // Carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
    this.app.use(this.apiPaths.seed, seed);
  }

  listen() {
    this.app.listen(this.port, '0.0.0.0',() => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

export default Server;
