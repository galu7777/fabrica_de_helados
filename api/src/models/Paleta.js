const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Paleta",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_paleta",
            },
            nombre: {
                type: DataTypes.STRING,     
            },
            description: {
                type: DataTypes.STRING,
            }
        },
        {
        timestamps: true,
        }
    );
};