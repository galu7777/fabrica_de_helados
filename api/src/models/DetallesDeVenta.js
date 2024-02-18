const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Detalles_de_Ventas",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_detalles_de_ventas",
            },
            id_venta: {
                type: DataTypes.INTEGER,
            },
            id_paleta: {
                type: DataTypes.INTEGER,
            },
            cantidad: {
                type: DataTypes.STRING,
            },
            precio: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: true,
        }
    );
};