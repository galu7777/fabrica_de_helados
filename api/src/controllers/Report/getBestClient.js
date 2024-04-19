const { Venta, Cliente } = require('../../db');
const response = require('../../utils/response');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        // Obtener el primer y último día del mes actual
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Consulta utilizando Sequelize para obtener las ventas por cliente
        const ventasPorCliente = await Venta.findAll({
            attributes: ['id_cliente', 'monto_total'],
            where: {
                createdAt: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            }
        });

        // Calcular el total comprado por cada cliente
        const totalCompradoPorCliente = {};
        ventasPorCliente.forEach(venta => {
            if (!totalCompradoPorCliente[venta.id_cliente]) {
                totalCompradoPorCliente[venta.id_cliente] = 0;
            }
            totalCompradoPorCliente[venta.id_cliente] += venta.monto_total;
        });

        // Obtener el cliente que más compra
        const idClienteMasCompra = Object.entries(totalCompradoPorCliente)
            .sort((a, b) => b[1] - a[1])
            .shift()[0];

        // Obtener detalles del cliente que más compra
        const detalleClienteMasCompra = await Cliente.findOne({
            where: { id_cliente: idClienteMasCompra }
        });

        // Construir el objeto de respuesta
        const clienteMasCompra = {
            id_cliente: detalleClienteMasCompra.id,
            razon_social: detalleClienteMasCompra.razon_social,
            cod_dni: detalleClienteMasCompra.cod_dni,
            cedula_rif: detalleClienteMasCompra.cedula_rif,
            total_comprado: totalCompradoPorCliente[idClienteMasCompra]
        };

        return response(res, 200,  clienteMasCompra);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
