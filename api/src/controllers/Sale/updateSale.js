const { Venta } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { cantidad, precio, monto, tasa } = req.body;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de venta');
        }

        const venta = await Venta.findByPk(id);
        if (!venta) {
            return response(res, 404, 'Venta no encontrada');
        }

        // Actualizar los campos de la venta
        if (cantidad !== undefined) {
            venta.cantidad = cantidad;
        }
        if (precio !== undefined) {
            venta.precio = precio;
        }
        if (monto !== undefined) {
            venta.monto = monto;
        }
        if (tasa !== undefined) {
            venta.tasa = tasa;
        }

        await venta.save();

        return response(res, 200, 'Venta actualizada correctamente', venta);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
