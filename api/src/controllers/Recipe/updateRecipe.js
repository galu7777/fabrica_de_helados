const { Recipe, Ingrediente, RecipeIngrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { nombre, ingredientes } = req.body;

    try {
        // Crear o actualizar la receta
        const [nuevaReceta] = await Recipe.findOrCreate({
            where: { nombre },
            defaults: { nombre }
        });

        // Iterar sobre cada ingrediente y asociarlo a la receta
        for (const ingredienteData of ingredientes) {
            const { id: ingredienteId, cantidad, unidad_medida } = ingredienteData;

            // Obtener el modelo del ingrediente basado en el ID
            const ingrediente = await Ingrediente.findByPk(ingredienteId);

            // Asociar el ingrediente a la receta
            await nuevaReceta.addIngrediente(ingrediente, {
                through: {
                    cantidad,
                    unidad_medida
                }
            });
        }

        response(res, 201, { message: 'success', nueva_receta: nuevaReceta });
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Internal Server Error: , ${error.message}`);
    }
};
