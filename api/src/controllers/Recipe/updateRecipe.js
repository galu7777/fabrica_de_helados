const { Recipe, Ingrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params; // Asumiendo que el ID de la receta está en los parámetros de la solicitud
    const { nombre, ingredientes } = req.body;
    try {
        // Buscar la receta por ID para actualizarla
        const recetaExistente = await Recipe.findByPk(id);

        if (!recetaExistente) {
            return response(res, 404, 'Receta no encontrada');
        }

        // Actualizar el nombre de la receta si se proporciona
        if (nombre) {
            recetaExistente.nombre = nombre;
            await recetaExistente.save();
        }

        // Actualizar los ingredientes asociados a la receta
        for (const ingredienteData of ingredientes) {
            const { id: ingredienteId, cantidad } = ingredienteData;


            if (nombre && nombre !== recetaExistente.nombre) {
                // Verificar si ya existe otra receta con el mismo nombre
                const recetaExistenteNombre = await Recipe.findOne({ where: { nombre } });

                if (recetaExistenteNombre) {
                    return response(res, 400, 'Ya existe una receta con el mismo nombre');
                }
            }

            if (cantidad <= 0) {
                return response(res, 400, 'Las cantidades no pueden ser iguales o menores que 0');
            }

            // Obtener el modelo del ingrediente basado en el ID
            const ingrediente = await Ingrediente.findByPk(ingredienteId);

            if (!ingrediente) {
                return response(res, 404, `Ingrediente con ID ${ingredienteId} no encontrado`);
            }

            // Verificar si el ingrediente ya está asociado a la receta
            const asociacionExistente = await recetaExistente.hasIngrediente(ingrediente);

            // Si ya está asociado, actualizar la cantidad y unidad de medida
            if (asociacionExistente) {
                await recetaExistente.setIngrediente(ingrediente, { through: { cantidad, unidad_medida: ingrediente.unidad_medida } });
            } else {
                // Si no está asociado, agregar el ingrediente a la receta con la cantidad y unidad de medida
                await recetaExistente.addIngrediente(ingrediente, { through: { cantidad, unidad_medida: ingrediente.unidad_medida } });
            }
        }

        response(res, 200, { message: 'Receta actualizada con éxito', receta_actualizada: recetaExistente });
    } catch (error) {
        console.error('Error: ', error.message);
        // Validar el mensaje de error
        if (error.message.includes('llave duplicada viola restricción de unicidad «Recipes_nombre_key»')) {
            return response(res, 400, 'Ya existe una receta con el mismo nombre');
        }
        response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
