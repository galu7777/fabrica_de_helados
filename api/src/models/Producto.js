const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Producto",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_producto",
            },
            nombre: {
                type: DataTypes.STRING,
            },
            cantidad: {
                type: DataTypes.STRING,
            }
        },
        {
            timestamps: true,
        }
    );
};