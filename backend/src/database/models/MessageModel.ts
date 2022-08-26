import { Model, INTEGER, TEXT, DATE, NOW } from "sequelize";
import db from ".";
import UserModel from "./UserModel";

class MessageModel extends Model {
   declare id: number;
   declare message: string;
   declare createdAt: string;
   declare password: string;
}

MessageModel.init(
   {
      id: {
         type: INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      message: {
         type: TEXT,
         allowNull: false,
      },
      createdAt: {
         type: DATE,
         allowNull: false,
         defaultValue: NOW
      },
      userId: {
         type: INTEGER,
         allowNull: false,
      },
   },
   {
      underscored: true,
      sequelize: db,
      modelName: "messages",
      timestamps: false,
   }
);

MessageModel.belongsTo(UserModel, {
   foreignKey: "userId",
   as: "user",
});

UserModel.hasMany(MessageModel, {
   foreignKey: "id",
   as: "messages",
});

export default MessageModel;
