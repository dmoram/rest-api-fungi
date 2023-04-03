import dotenv from 'dotenv'
import Server from './src/modules/server/domain/models/Server'
dotenv.config()

const server = new Server()

server.listen()