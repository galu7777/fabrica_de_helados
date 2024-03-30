const { StockPaleta,Paleta, TipoDePaleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    try {
        const stock = await StockPaleta.findAll({
            include: [
                {
                    model: TipoDePaleta,
                    attributes: ['id', 'nombre'],
                },
                 {
                    model: Paleta,
                     attributes: ['id', 'nombre', 'descripcion'],
                 }
            ]
        })
        response(res, 201, stock)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}
