const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Receta",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "Receta",
            },
            nombre: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: true,
        }
    );
};