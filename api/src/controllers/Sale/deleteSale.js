const { Venta } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de venta');
        }

        const venta = await Venta.findByPk(id);
        if (!venta) {
            return response(res, 404, 'Venta no encontrada');
        }

        await venta.destroy();

        return response(res, 200, 'Venta eliminada correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
