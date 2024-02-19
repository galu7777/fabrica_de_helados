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
            cantidad: {
                type: DataTypes.FLOAT,
            },
        },
        {
        timestamps: true,
        }
    );
};