module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable(
         "messages",
         {
            id: {
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               type: Sequelize.INTEGER,
            },
            message: {
               allowNull: false,
               type: Sequelize.TEXT,
            },
            createdAt: {
               field: "created_at",
               allowNull: false,
               type: Sequelize.DATE,
               defaultValue: Sequelize.NOW
            },
            userId: {
               field: "user_id",
               allowNull: false,
               type: Sequelize.INTEGER,
               onUpdate: "CASCADE",
               onDelete: "CASCADE",
               references: {
                  model: "users",
                  key: "id",
               },
            },
         },
         {
            underscored: true,
         }
      );
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("messages");
   },
};
