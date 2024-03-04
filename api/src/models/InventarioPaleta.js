const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "InventarioPaleta",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_inventario_paleta",
            },
            paleta: {
                type: DataTypes.STRING,
            },
            cantidad: {
                type: DataTypes.INTEGER,
            },
            unidad_medida: {
                type: DataTypes.STRING,
                defaultValue: 'GRS'
            },
            tipo: {
                type: DataTypes.ENUM('ENTREGA','ENTREGA POR BATIDO','SALIDA', 'SALIDA POR VENTA'),
            }
        },
        {
            timestamps: true,
        }
    );
};