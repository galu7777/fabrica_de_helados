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
                unique: true
            },
            peso: {
                type: DataTypes.FLOAT
            },
            precio: {
                type: DataTypes.FLOAT
            },
            unidad_medida: {
                type: DataTypes.STRING,
                defaultValue: 'GRS'
            },
            descripcion: {
                type: DataTypes.STRING,
            }

        },
        {
        timestamps: true,
        }
    );
};
