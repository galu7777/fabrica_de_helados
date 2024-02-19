const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "TipoDePaleta",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_tipo_de_paleta",
            },
            nombre: {
                type: DataTypes.STRING,
            },
        },
        {
        timestamps: true,
        }
    );
};