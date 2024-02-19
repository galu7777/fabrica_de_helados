const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ProductoFinal",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_producto",
            },
            id_batido: {
                type: DataTypes.INTEGER,
            },
            cantidad: {
                type: DataTypes.STRING,
            },
            paleta: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: true,
        }
    );
};