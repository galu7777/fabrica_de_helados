const { InventarioPaleta } = require('../../db');
const response = require('../../utils/response');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        // Obtener el primer y último día del mes actual
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        console.log(firstDayOfMonth, lastDayOfMonth);
        console.log(currentDate );
        // Consulta utilizando Sequelize para obtener la paleta con la mayor cantidad de ventas del mes actual
        const mostSold = await InventarioPaleta.findOne({
            attributes: [
                'nombre_paleta',
                [InventarioPaleta.sequelize.fn('SUM', InventarioPaleta.sequelize.literal('cantidad * -1')), 'total_cantidad_salida']
            ],
            where: {
                tipo: 'SALIDA POR VENTA',
                createdAt: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            },
            group: ['nombre_paleta'],
            order: [[InventarioPaleta.sequelize.literal('total_cantidad_salida'), 'DESC']],

        });

        const leastSold = await InventarioPaleta.findOne({
            attributes: [
                'nombre_paleta',
                [InventarioPaleta.sequelize.fn('SUM', InventarioPaleta.sequelize.literal('cantidad * -1')), 'total_cantidad_salida']
            ],
            where: {
                tipo: 'SALIDA POR VENTA',
                createdAt: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            },
            group: ['nombre_paleta'],
            order: [[InventarioPaleta.sequelize.literal('total_cantidad_salida'), 'ASC']],

        });


        return response(res, 200, { mostSold, leastSold });


    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
