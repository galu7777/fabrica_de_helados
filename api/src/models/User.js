const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_user",
            },
            nombre: {
                type: DataTypes.STRING
            },
            apellido: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
            },
            rol: {
                type: DataTypes.ENUM("empleado", "administrador,", "superAdmi", "clientes"),
                defaultValue: "clientes"
            }
        },
        {
            timestamps: true,
        }
    );
};
