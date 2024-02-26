const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "InventarioMateriaPrima",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_inventario",
            },
            cantidad: {
                type: DataTypes.INTEGER
            },
            unidad_medida: {
                type: DataTypes.STRING,
                defaultValue: 'KG'
            },
            tipo: {
                type: DataTypes.ENUM('ENTREGA','SALIDA'),
            }
        },
        {
            timestamps: true,
        }
    );
};