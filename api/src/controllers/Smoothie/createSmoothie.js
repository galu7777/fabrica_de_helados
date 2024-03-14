const { Recipe, Ingrediente, RecipeIngrediente, BatidaDeHelado, InventarioMateriaPrima } = require('../../db');
const response = require('../../utils/response');

// Función para convertir unidades a kilogramos
function convertirAKilogramos(cantidad, unidad_medida) {
    switch (unidad_medida) {
        case 'KG':
            return cantidad;
        case 'GR':
            return cantidad / 1000; // Convertir gramos a kilogramos
        case 'L':
            return cantidad; // Litros ya están en kilogramos (asumiendo que son líquidos)
        case 'ML':
            return cantidad / 1000; // Convertir mililitros a kilogramos
        case 'OZ':
            return cantidad * 0.0283495; // Convertir onzas a kilogramos
        default:
            return cantidad; // Si la unidad de medida no es reconocida, se asume que ya está en kilogramos
    }
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
        
        let cantidadTotalEnKG = foundRecipe.Ingredientes.reduce((acc, item) => {
            const cantidadEnKG = convertirAKilogramos(item.RecipeIngrediente.cantidad, item.RecipeIngrediente.unidad_medida);
            return acc + cantidadEnKG;
        }, 0);

        // Crear la BatidaDeHelado después de registrar las salidas de inventario
        const newBatidaDeHelado = await BatidaDeHelado.create({
            id_recipe: id_receta,
            cantidad: cantidadTotalEnKG,
        });

        response(res, 201, { message: `Batida de helado creada con éxito. Salidas registradas.`, newBatidaDeHelado });
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
