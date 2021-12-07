const { DataTypes, Model } = require("sequelize");
const connection = require("../config/database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    password: { //!
      type: DataTypes.UUID,
      allowNull: false,
    },
    username: { //!
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: { //!
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

(async () => {
  await connection.sync();
})();

module.exports = User;
