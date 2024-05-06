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

            cantidad_total: {
                type: DataTypes.FLOAT,
            },
            monto_total: {
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
