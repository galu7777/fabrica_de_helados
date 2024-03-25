const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "StockMateriaPrima",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_stock_materia",
            },
            cantidad: {
                type: DataTypes.FLOAT
            },
            unidad_medida: {
                type: DataTypes.ENUM("KG", "GRS", "L", "ML", "OZ", "UND"),
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