const { Recipe, Ingrediente, RecipeIngrediente, BatidaDeHelado, InventarioMateriaPrima, StockMateriaPrima } = require('../../db');
const response = require('../../utils/response');

// Función para convertir unidades a gramos (para peso) o mililitros (para volumen)
function convertirUnidades(cantidad, unidad_medida) {
    // Definir factores de conversión
    const conversion = {
        'KG': 1000,
        'GRS': 1,
        'L': 1000,
        'ML': 1,
        'OZ': 28.35 // Onza a gramos
    };

    // Convertir la cantidad a gramos o mililitros
    return cantidad * conversion[unidad_medida];
}

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
            const cantidadEnGramos = convertirUnidades(ingrediente.RecipeIngrediente.cantidad, ingrediente.RecipeIngrediente.unidad_medida);
            const stock = await StockMateriaPrima.findOne({
                where: { IngredienteId: ingrediente.id }
            });

            if (!stock) {
                return response(res, 400, `No tienes cantidad de la materia prima ${ingrediente.nombre}`);
            }

            const converCantidad = convertirUnidades(stock.cantidad, stock.unidad_medida);

            if (converCantidad < cantidadEnGramos) {
                return response(res, 400, `No hay suficiente stock para el ingrediente ${ingrediente.nombre}`);
            }
        }

        // Si hay suficiente stock para todos los ingredientes, proceder con las actualizaciones
        for (const ingrediente of foundRecipe.Ingredientes) {
            const cantidadEnGramos = convertirUnidades(ingrediente.RecipeIngrediente.cantidad, ingrediente.RecipeIngrediente.unidad_medida);
            const stock = await StockMateriaPrima.findOne({
                where: { IngredienteId: ingrediente.id }
            });

            const stockConvertTotal = convertirUnidades(stock.cantidad, stock.unidad_medida)
            const cnt = stockConvertTotal - cantidadEnGramos;
            const amountToRecord = cnt / 1000

            await stock.update({
                cantidad: amountToRecord
            });
            await InventarioMateriaPrima.create({
                IngredienteId: ingrediente.id,
                cantidad: -ingrediente.RecipeIngrediente.cantidad,
                unidad_medida: ingrediente.RecipeIngrediente.unidad_medida,
                tipo: 'SALIDA',
                ProveedorId: 1,
            });
        }

        // Crear la BatidaDeHelado después de registrar las salidas de inventario
        const newBatidaDeHelado = await BatidaDeHelado.create({
            id_recipe: id_receta,
            cantidad: foundRecipe.Ingredientes.reduce((acc, item) => acc + convertirUnidades(item.RecipeIngrediente.cantidad, item.RecipeIngrediente.unidad_medida), 0),
        });

        return response(res, 201, { message: `Batida de helado creada con éxito. Salidas registradas.`, newBatidaDeHelado });
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
