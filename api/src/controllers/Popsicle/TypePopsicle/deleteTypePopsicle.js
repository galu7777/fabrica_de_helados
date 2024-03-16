const { TipoDePaleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de tipo de paleta');
        }

        const tipoPaleta = await TipoDePaleta.findByPk(id);
        if (!tipoPaleta) {
            return response(res, 404, 'Tipo de paleta no encontrado');
        }

        await tipoPaleta.destroy();

        return response(res, 200, 'Tipo de paleta eliminado correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
