const { Recipe, Ingrediente, RecipeIngrediente, BatidaDeHelado, InventarioMateriaPrima } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id_receta } = req.body;
    try {
        const foundRecipe = await Recipe.findByPk(id_receta, {
            include: [
                {
                    model: Ingrediente,
                    attributes: ['id', 'nombre'],
                    through: {
                        model: RecipeIngrediente,
                        attributes: ['cantidad', 'unidad_medida'],
                    },
                },
            ],
        });

        if (!foundRecipe) {
            return response(res, 404, 'Receta no encontrada');
        }
        // Preparar para crear un registro de 'SALIDA' para cada ingrediente utilizado
        for (const ingrediente of foundRecipe.Ingredientes) {
            await InventarioMateriaPrima.create({
                IngredienteId: ingrediente.id,
                cantidad: -ingrediente.RecipeIngrediente.cantidad, // Negativo para indicar salida
                tipo: 'SALIDA',
                ProveedorId: 1, // Asumiendo que ProveedorId es necesario; ajusta según tu esquema
                // Aquí puedes agregar otros campos necesarios según tu modelo de InventarioMateriaPrima
            });
        }

        // Crear la BatidaDeHelado después de registrar las salidas de inventario
        const newBatidaDeHelado = await BatidaDeHelado.create({
            id_receta,
            cantidad: foundRecipe.Ingredientes.reduce((acc, item) => acc + item.RecipeIngrediente.cantidad, 0),
        });

        response(res, 201,{message:  `Batida de helado creada con éxito. Salidas registradas.`, newBatidaDeHelado});
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
