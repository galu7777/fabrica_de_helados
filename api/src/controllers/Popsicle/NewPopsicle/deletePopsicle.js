const { Paleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de paleta');
        }

        const paleta = await Paleta.findByPk(id);
        if (!paleta) {
            return response(res, 404, 'Paleta no encontrada');
        }

        await paleta.destroy();

        return response(res, 200, 'Paleta eliminada correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
