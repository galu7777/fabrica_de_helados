const { Recipe, Ingrediente, Paleta } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { nombre, ingredientes, id_paleta } = req.body;
    try {
        // Verificar si ya existe una receta con el mismo nombre
        const recetaExistente = await Recipe.findOne({ where: { nombre } });
        if (recetaExistente) {
            return response(res, 400, 'Ya existe una receta con este nombre');
        }
        // Buscar la paleta por su ID
        const paleta = await Paleta.findByPk(id_paleta);

        // Verificar si la paleta existe
        if (paleta) {
            // Verificar si la paleta ya ha sido usada en una receta
            const recetaExistente = await Recipe.findOne({ where: { id_paleta } });
            if (recetaExistente) {
                return response(res, 400, 'Ya existe una receta para esta paleta');
            }

            // Crear la receta
            const nuevaReceta = await Recipe.create({
                nombre,
                id_paleta
            });

            // Iterar sobre cada ingrediente y asociarlo a la receta
            for (const ingredienteData of ingredientes) {
                const { id: ingredienteId, cantidad } = ingredienteData;

                if (cantidad <= 0) {
                    return response(res, 400, 'Las cantidades no pueden ser iguales o menores que 0');
                }

                // Obtener el modelo del ingrediente basado en el ID
                const ingrediente = await Ingrediente.findByPk(ingredienteId);

                if (!ingrediente) {
                    return response(res, 404, 'Ingrediente no encontrado');
                }

                // Asociar el ingrediente a la receta
                await nuevaReceta.addIngrediente(ingrediente, { through: { cantidad, unidad_medida: ingrediente.unidad_medida } });
            }

            // Actualizar el estado de la paleta a "USADO"
            await paleta.update({ status: "USADO" });

            response(res, 201, { message: 'Receta creada con éxito', nueva_receta: nuevaReceta });
        } else {
            response(res, 400, { message: "No se encontró esa paleta" });
        }
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
