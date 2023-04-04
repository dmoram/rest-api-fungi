import { DataType, DataTypes } from "sequelize";
import db from "../../infrastructure/db/connection";
const Usuario = db.define('Usuario',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{ paranoid: true} )

export default Usuario;
