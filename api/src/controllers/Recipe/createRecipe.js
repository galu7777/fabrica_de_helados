const { Recipe, Ingrediente,  RecipeIngrediente } = require('../../db');
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
            const { id: ingredienteId, cantidad, unidad_medida  } = ingredienteData;

            const cnt = cantidad
            if(cnt <= 0){
                response(res, 400, 'quantities cannot be equal to or less than 0')
            }
            const unit = unidad_medida
            // Obtener el modelo del ingrediente basado en el ID
            const ingrediente = await Ingrediente.findByPk(ingredienteId);

            // Asociar el ingrediente a la receta
            await nuevaReceta.addIngrediente(ingrediente);


            const existingRecipeIngrediente = await RecipeIngrediente.findOne({
                where: {
                    RecipeId: nuevaReceta.id,
                    IngredienteId: ingredienteId,
                },
            });


            if (existingRecipeIngrediente) {
                console.log('This record already exists in the database.');
            } else {
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
                cantidad: cnt,
                unidad_medida: unit

            })
        }

        response(res, 201, {message: 'success', nueva_receta: nuevaReceta});
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Internal Server Error: , ${error.message}`);
    }
};
