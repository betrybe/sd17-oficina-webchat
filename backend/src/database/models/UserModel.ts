import { Model, INTEGER, STRING } from "sequelize";
import db from ".";

class UserModel extends Model {
   declare id: number;
   declare name: string;
   declare email: string;
   declare password: string;
}

UserModel.init(
   {
      id: {
         type: INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: STRING,
         allowNull: false,
      },
      email: {
         type: STRING,
         allowNull: false,
      },
      password: {
         type: STRING,
         allowNull: false,
         validate: {
            isLongEnough(val: string) {
               if (val.length < 7) {
                  throw new Error("Please choose a longer password");
               }
            },
         },
      },
   },
   {
      sequelize: db,
      modelName: "users",
      timestamps: false,
   }
);

export default UserModel;
