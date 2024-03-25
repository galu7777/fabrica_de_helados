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
            nombre_paleta: {
                type: DataTypes.STRING
            },
            cantidad: {
                type: DataTypes.FLOAT,
            },
            precio: {
                type: DataTypes.FLOAT
            },
            monto_usd: {
                type: DataTypes.FLOAT,
            },
            monto_bs: {
                type: DataTypes.FLOAT,
            },
            tasa: {
                type: DataTypes.FLOAT,
            },
        },
        {
        timestamps: true,
        }
    );
};
