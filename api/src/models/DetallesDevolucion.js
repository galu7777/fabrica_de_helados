const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "DetalleDevolucion",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_detalle_devolucion",
            },
            id_devolucion: {
                type: DataTypes.INTEGER,
            },
            id_paleta: {
                type: DataTypes.INTEGER,
            },
            cantidad: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: true,
        }
    );
};