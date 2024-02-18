const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Cuentas_por_Cobrar",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_cuentas_por_cobrar",
            },
            id_cliente: {
                type: DataTypes.INTEGER,
            },
            cod_ingredientes: {
                type: DataTypes.INTEGER,
            },
            cantidad: {
                type: DataTypes.FLOAT,
            },
        },
        {
        timestamps: true,
        }
    );
};