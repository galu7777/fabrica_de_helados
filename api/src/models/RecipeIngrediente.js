// recetaIngrediente.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RecipeIngrediente = sequelize.define(
        'RecipeIngrediente',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            cantidad: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
            unidad_medida: {
                type: DataTypes.ENUM("KG", "GR", "LIT", "ML", "OZ"),
                defaultValue: 'KG'
            },
        },
        {
            timestamps: false,
        }
    );

    return RecipeIngrediente;
};
