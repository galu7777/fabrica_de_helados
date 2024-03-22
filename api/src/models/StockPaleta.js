const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "StockPaleta",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_stock_paleta",
            },
            nombre_paleta: {
                type: DataTypes.STRING,
            },
            cantidad: {
                type: DataTypes.INTEGER,
            },
            peso_unitario: {
                type: DataTypes.INTEGER
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