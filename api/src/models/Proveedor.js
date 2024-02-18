const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Proveedor",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_proveedor",
            },
            razon_social: {
                type: DataTypes.STRING,
            },
            direccion: {
                type: DataTypes.STRING,
            },
            telefono: {
                type: DataTypes.STRING,
            },
            RIF: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: true,
        }
    );
};