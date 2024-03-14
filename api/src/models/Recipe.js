const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Recipe",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                autoIncrementIdentity: 1,
                field: "id_recipe",
            },
            nombre: {
                type: DataTypes.STRING,
                unique: true
            }
        },
        {
            timestamps: true,
        }
    );
};
