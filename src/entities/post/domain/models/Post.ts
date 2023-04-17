import { DataType, DataTypes } from "sequelize";
import db from "../../../../db/connection";
const Post = db.define('Post',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    author_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{ paranoid: true} )

export default Post;
