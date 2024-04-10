const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ClienteVenta = sequelize.define(
        'ClienteVenta',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            razon_social: {
                type: DataTypes.STRING,
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
            timestamps: false,
        }
    );

    return ClienteVenta;
};
