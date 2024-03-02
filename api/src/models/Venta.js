const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Venta",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_venta",
            },
            cantidad: {
                type: DataTypes.INTEGER,
            },
            precio: {
                type: DataTypes.INTEGER,
            },
            monto: {
                type: DataTypes.INTEGER,
            },
            tasa: {
                type: DataTypes.INTEGER,
            },
        },
        {
        timestamps: true,
        }
    );
};