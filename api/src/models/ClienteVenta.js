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
            cantidad: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            monto_usd: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
            precio: {
                type: DataTypes.FLOAT
            },
            monto_bs: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
        },
        {
            timestamps: true,
        }
    );

    return ClienteVenta;
};
