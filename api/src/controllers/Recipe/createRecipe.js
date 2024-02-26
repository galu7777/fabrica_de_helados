const { Recipe, Ingrediente, InventarioMateriaPrima, RecipeIngrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { nombre, ingredientes } = req.body;

    try {
        // Crear la receta
        const nuevaReceta = await Recipe.create({
            nombre,
        });
        // Iterar sobre cada ingrediente y asociarlo a la receta
        for (const ingredienteData of ingredientes) {
            const { id: ingredienteId, cantidad } = ingredienteData;

            const cnt = cantidad 
            // Validar que la cantidad no sea 0 o negativa
            if (cnt <= 0) {
                response(res, 400, 'La cantidad debe ser mayor que 0');
                return;
            }

            // Obtener el modelo del ingrediente basado en el ID
            const ingrediente = await Ingrediente.findByPk(ingredienteId);

            // Asociar el ingrediente a la receta
            await nuevaReceta.addIngrediente(ingrediente);

            // Validar que la cantidad en el inventario sea suficiente
            const inventarioActual = await InventarioMateriaPrima.findOne({
                where: {
                    IngredienteId: ingredienteId,
                },
            });

            if (!inventarioActual || inventarioActual.cantidad < cnt) {
                response(res, 400, 'Cantidad insuficiente en el inventario');
                return;
            }

            const existingRecipeIngrediente = await RecipeIngrediente.findOne({
                where: {
                    RecipeId: nuevaReceta.id,
                    IngredienteId: ingredienteId,
                },
            });
            
            
            if (existingRecipeIngrediente) {
                console.log('Este registro ya existe en RecipeIngredientes.');
            } else {
                console.log('No existe, creando nuevo registro en RecipeIngredientes.');
                await RecipeIngrediente.create({
                    RecipeId: nuevaReceta.id,
                    IngredienteId: ingredienteId,
                });
            }

            const foundRecipeIngrediente = await RecipeIngrediente.findOne({
                where: {
                    RecipeId: nuevaReceta.id,
                    IngredienteId: ingredienteId,
                },
            });

            foundRecipeIngrediente.update({
                cantidad: cnt
            })
        }

        response(res, 201, {message: 'success', nueva_receta: nuevaReceta});
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Internal Server Error: , ${error.message}`);
    }
};
