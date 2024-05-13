const { StockPaleta, Paleta, TipoDePaleta } = require('../../../db');
const response = require('../../../utils/response');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            // Obtener el stock de paleta por ID
            const stockPopsicle = await StockPaleta.findByPk(id, {
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

            if (!stockPopsicle) {
                return response(res, 404, 'Stock de paleta no encontrado');
            }

            return response(res, 200, stockPopsicle);
        } else {
            // Obtener todos los elementos de stock de paleta
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

            return response(res, 200, stock);
        }
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, 'Internal Server Error');
    }
};
