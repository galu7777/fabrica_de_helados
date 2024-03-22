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
                type: DataTypes.FLOAT
            },
            unidad_medida: {
                type: DataTypes.ENUM("KG", "GR", "L", "ML", "OZ", "UND"),
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