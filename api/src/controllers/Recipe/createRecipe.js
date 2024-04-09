const { Recipe, Ingrediente, Paleta } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { nombre, ingredientes, id_paleta } = req.body;
    try {
        const paleta = await Paleta.findByPk(id_paleta)
        if(paleta){
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
            response(res, 201, { message: 'Receta creada con éxito', nueva_receta: nuevaReceta });
        } else {
            response(res, 400, {message: "No se encontro esa paleta"});
        }

    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
