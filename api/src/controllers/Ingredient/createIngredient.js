const { Ingrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { nombre, unidad_medida } = req.body;
    try {
        // Verifica si ya existe un ingrediente con el mismo nombre
        const existingIngredient = await Ingrediente.findOne({
            where: {
                nombre: nombre
            }
        });

        // Si ya existe un ingrediente con el mismo nombre, arroja un mensaje de error
        if (existingIngredient) {
            return response(res, 400, 'El ingrediente ya existe');
        }

        // Si no existe, crea el nuevo ingrediente
        const ingredient = await Ingrediente.create({
            nombre,
            unidad_medida
        });


        response(res, 201, ingredient);
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
