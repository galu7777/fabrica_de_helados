const { Recipe, Ingrediente, RecipeIngrediente, BatidaDeHelado, InventarioMateriaPrima, StockMateriaPrima } = require('../../db');
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

        // Verificar si hay suficiente stock para todos los ingredientes
        for (const ingrediente of foundRecipe.Ingredientes) {
            const stock = await StockMateriaPrima.findOne({
                where: { IngredienteId: ingrediente.id }
            });

            if (!stock || stock.cantidad < ingrediente.RecipeIngrediente.cantidad) {
                return response(res, 400, `No hay suficiente stock para el ingrediente ${ingrediente.nombre}`);
            }
        }

        // Si hay suficiente stock para todos los ingredientes, proceder con las actualizaciones
        for (const ingrediente of foundRecipe.Ingredientes) {
            const stock = await StockMateriaPrima.findOne({
                where: { IngredienteId: ingrediente.id }
            });

            const cnt = stock.cantidad - ingrediente.RecipeIngrediente.cantidad;
            await stock.update({
                cantidad: cnt
            });
            await InventarioMateriaPrima.create({
                IngredienteId: ingrediente.id,
                cantidad: -ingrediente.RecipeIngrediente.cantidad,
                tipo: 'SALIDA',
                ProveedorId: 1,
            });
        }

        // Crear la BatidaDeHelado después de registrar las salidas de inventario
        const newBatidaDeHelado = await BatidaDeHelado.create({
            id_recipe: id_receta,
            cantidad: foundRecipe.Ingredientes.reduce((acc, item) => acc + item.RecipeIngrediente.cantidad, 0),
        });

        response(res, 201, { message: `Batida de helado creada con éxito. Salidas registradas.`, newBatidaDeHelado });
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
