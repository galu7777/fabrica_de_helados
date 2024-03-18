const { Recipe, Ingrediente, RecipeIngrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            // Si se proporciona un ID, buscar la receta por su ID
            const recipe = await Recipe.findByPk(id, {
                include: [
                    {
                        model: Ingrediente,
                        attributes: ['id', 'nombre'],
                        through: {
                            model: RecipeIngrediente,
                            attributes: ['cantidad', 'unidad_medida']
                        },
                    },
                ],
            });

            if (!recipe) {
                return response(res, 404, 'Receta no encontrada');
            }

            // Si se encuentra la receta, responder con la receta encontrada
            return response(res, 200, recipe);
        } else {
            // Si no se proporciona un ID, obtener todas las recetas
            const recipes = await Recipe.findAll({
                include: [
                    {
                        model: Ingrediente,
                        attributes: ['id', 'nombre'],
                        through: {
                            model: RecipeIngrediente,
                            attributes: ['cantidad', 'unidad_medida']
                        },
                    },
                ],
            });

            // Responder con todas las recetas encontradas
            return response(res, 200, recipes);
        }
    } catch (error) {
        console.error('Error: ', error.message);
        // Manejar errores y responder con un mensaje de error
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
