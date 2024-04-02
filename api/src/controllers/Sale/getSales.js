const { Venta, Cliente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            // Si se proporciona un ID, buscar la venta por su ID
            const venta = await Venta.findByPk(id, { include: [Cliente] });

            if (!venta) {
                return response(res, 404, 'Venta no encontrada');
            }

            // Si se encuentra la venta, responder con la venta encontrada
            return response(res, 200, venta);
        } else {
            // Si no se proporciona un ID, obtener todas las ventas
            const ventas = await Venta.findAll({ include: [{ model: Cliente, as: 'Cliente' }] });

            // Responder con todas las ventas encontradas
            return response(res, 200, ventas);
        }
    } catch (error) {
        console.error('Error: ', error.message);
        // Manejar errores y responder con un mensaje de error
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
