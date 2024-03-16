const { Recipe } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de receta');
        }

        const receta = await Recipe.findByPk(id);
        if (!receta) {
            return response(res, 404, 'Receta no encontrada');
        }

        await receta.destroy();

        return response(res, 200, 'Receta eliminada correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
