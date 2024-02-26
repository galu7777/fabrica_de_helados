const { Recipe, Ingrediente, RecipeIngrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    try {
        // Obtener todas las recetas con sus ingredientes relacionados
        const recetasConIngredientes = await Recipe.findAll({
            include: [
                {
                    model: Ingrediente,
                    attributes: ['id', 'nombre'],
                    through: {
                        model: RecipeIngrediente,
                        attributes: ['cantidad', 'unidad_medida'] // Puedes ajustar las columnas que deseas obtener de la tabla intermedia
                    },
                },
            ],
        });

        response(res, 200, recetasConIngredientes);
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, 'Internal Server Error');
    }
};
