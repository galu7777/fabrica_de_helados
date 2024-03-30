const { StockPaleta, Paleta, TipoDePaleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    try {
        const stock = await StockPaleta.findAll({
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
        })
        response(res, 201, stock)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}
