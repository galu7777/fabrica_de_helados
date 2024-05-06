const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Ingrediente",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_ingrediente",
            },
            nombre: {
                type: DataTypes.STRING,
                unique: true
            },
            unidad_medida: {
                type: DataTypes.ENUM("KG", "GR", "LIT", "ML", "OZ", "UND"),
                defaultValue: 'KG'
            },

        },
        {
            timestamps: true,
        }
    );
};
