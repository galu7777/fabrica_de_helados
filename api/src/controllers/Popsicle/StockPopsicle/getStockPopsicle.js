const { StockPaleta, Paleta, TipoDePaleta } = require('../../../db')
const response = require('../../../utils/response')
const { Op } = require('sequelize');
module.exports = async (req, res) => {
    try {
        const stock = await StockPaleta.findAll({
            where: {
                cantidad: { [Op.gt]: 0 } // Filtrar donde la cantidad sea mayor a 0
            },
            include: [
                {
                    model: Paleta,
                    attributes: ["id", "nombre", "image", "descripcion"]
                },
                {
                    model: TipoDePaleta,
                    attributes: ["id", "nombre"]
                }
            ]
        });
        response(res, 201, stock);
    } catch (error) {
        console.error('Error: ', error.message);
    }
};
