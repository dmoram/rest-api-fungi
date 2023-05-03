import { DataType, DataTypes } from "sequelize";
import db from "../../../../db/connection";
import User from "../../../user/domain/models/User";
import PostLikes from "../../../post/domain/models/PostLikes";

const FungiRecord = db.define(
  "FungiRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: true,
    },
    altitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comments: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { paranoid: true }
);

// Se agrega la relación de pertenencia a User
FungiRecord.belongsTo(User, { foreignKey: "author_id" });

export default FungiRecord;
