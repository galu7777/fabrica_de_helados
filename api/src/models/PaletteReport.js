const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "PaletteReport",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_cliente",
            },
            cantidad: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            timestamps: true,
        }
    );
};
