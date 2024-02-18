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
            cliente: {
                type: DataTypes.STRING,     
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