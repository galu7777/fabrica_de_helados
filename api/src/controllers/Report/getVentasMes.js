const { Venta } = require('../../db');
const response = require('../../utils/response');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        // Obtener el primer y último día del mes actual
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Consulta utilizando Sequelize para obtener el monto total de ventas del mes actual
        const totalAmount = await Venta.sum('monto_total', {
            where: {
                createdAt: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            }
        });

        return response(res, 200, { totalAmount });

    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
