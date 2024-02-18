const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Ingredientes",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_ingredientes",
            },
            id_producto: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: true,
        }
    );
};