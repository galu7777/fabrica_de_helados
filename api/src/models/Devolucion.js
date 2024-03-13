const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Devolucion",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_devolucion",
            },
            concepto: {
                type: DataTypes.STRING,     
            },
            cantidad: {
                type: DataTypes.FLOAT
            }
        },
        {
        timestamps: true,
        }
    );
};