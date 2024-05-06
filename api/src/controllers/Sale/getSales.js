const { Venta, Cliente, ClienteVenta, StockPaleta } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const venta = await Venta.findByPk(id, {
                include: [
                    {
                        model: StockPaleta,
                        as: 'paletasCompradas',
                        attributes: ['id', 'nombre_paleta'],
                        through: {
                            model: ClienteVenta,
                            attributes: ['cantidad', 'monto_usd', 'monto_bs', 'precio']
                        }
                    },
                    {
                        model: Cliente,
                        attributes: ['id', 'razon_social', 'direccion', 'telefono', 'cod_dni', 'cedula_rif']
                    }
                ]
            });

            if (!venta) {
                return response(res, 404, 'Venta no encontrada');
            }

            // If the sale is found, respond with the found sale
            return response(res, 200, venta);
        } else {
            const allSales = await Venta.findAll({
                include: [
                    {
                        model: StockPaleta,
                        as: 'paletasCompradas',
                        attributes: ['id', 'nombre_paleta'],
                        through: {
                            model: ClienteVenta,
                            attributes: ['cantidad', 'monto_usd', 'monto_bs', 'precio']
                        }
                    },
                    {
                        model: Cliente,
                        attributes: ['id', 'razon_social', 'direccion', 'telefono', 'cod_dni', 'cedula_rif']
                    }
                ],
                order: [['createdAt', 'DESC']] // Order by createdAt in descending order
            });

            return response(res, 200, allSales);
        }
    } catch (error) {
        console.error('Error: ', error.message);
        // Handle errors and respond with an error message
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
