const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Batida_de_helado",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_batida",
            },
            cod_receta: {
                type: DataTypes.INTEGER,
            },
            cod_ingredientes: {
                type: DataTypes.INTEGER,
            },
            cantidad: {
                type: DataTypes.FLOAT,
            },
        },
        {
        timestamps: true,
        }
    );
};