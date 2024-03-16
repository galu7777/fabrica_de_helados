const { Recipe, Ingrediente, RecipeIngrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { nombre, ingredientes } = req.body;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de receta');
        }

        const receta = await Recipe.findByPk(id);
        if (!receta) {
            return response(res, 404, 'Receta no encontrada');
        }

        // Actualizar el nombre de la receta si se proporciona en el cuerpo de la solicitud
        if (nombre !== undefined) {
            receta.nombre = nombre;
        }

        await receta.save();

        // Actualizar la lista de ingredientes asociados a la receta
        if (ingredientes && ingredientes.length > 0) {
            for (const ingredienteData of ingredientes) {
                const { id: ingredienteId, cantidad } = ingredienteData;

                const foundRecipeIngrediente = await RecipeIngrediente.findOne({
                    where: {
                        RecipeId: receta.id,
                        IngredienteId: ingredienteId,
                    },
                });

                if (foundRecipeIngrediente) {
                    foundRecipeIngrediente.update({
                        cantidad: cantidad
                    });
                } else {
                    await RecipeIngrediente.create({
                        RecipeId: receta.id,
                        IngredienteId: ingredienteId,
                        cantidad: cantidad
                    });
                }
            }
        }

        return response(res, 200, 'Receta actualizada correctamente', receta);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
