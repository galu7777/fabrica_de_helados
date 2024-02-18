const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Cliente",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_cliente",
            },
            nombre: {
                type: DataTypes.STRING,     
            },
            apellido: {
                type: DataTypes.INTEGER,
            },
            direccion: {
                type: DataTypes.STRING,
            },
            telefono: {
                type: DataTypes.STRING
            }
        },
        {
        timestamps: true,
        }
    );
};