const { Ingrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    try {
        const { id } = req.params; 

        if (id) {
            // Si se proporciona un ID, buscar el ingrediente por su ID
            const ingredient = await Ingrediente.findByPk(id);

            if (!ingredient) {
                return response(res, 404, 'Ingrediente no encontrado');
            }

            // Si se encuentra el ingrediente, responder con el ingrediente encontrado
            return response(res, 200, ingredient);
        } else {
            // Si no se proporciona un ID, obtener todos los ingredientes
            const ingredients = await Ingrediente.findAll();

            // Responder con todos los ingredientes encontrados
            return response(res, 200, ingredients);
        }
    } catch (error) {
        console.error('Error: ', error.message);
        // Manejar errores y responder con un mensaje de error
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
