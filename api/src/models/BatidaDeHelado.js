const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "BatidaDeHelado",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_batida",
            },
            id_receta: {
                type: DataTypes.INTEGER,
            },
            cantidad: {
                type: DataTypes.FLOAT,
                defaultValue: 0
            }
        },
        {
        timestamps: true,
        }
    );
};