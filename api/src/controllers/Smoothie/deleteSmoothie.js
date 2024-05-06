const { BatidaDeHelado } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de batida de helado');
        }

        const batidaDeHelado = await BatidaDeHelado.findByPk(id);
        if (!batidaDeHelado) {
            return response(res, 404, 'Batida de helado no encontrada');
        }

        await batidaDeHelado.destroy();

        return response(res, 200, 'Batida de helado eliminada correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
