const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Inventario_Materia_Prima",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_inventario_materia_prima",
            },
            id_producto: {
                type: DataTypes.INTEGER,
            },
            tipo: {
                type: DataTypes.ENUM('ENTREGA','SALIDA'),
            },
        },
        {
            timestamps: true,
        }
    );
};