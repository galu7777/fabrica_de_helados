const { StockPaleta, TipoDePaleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    try {        
        const stock = await StockPaleta.findAll({
            include: [TipoDePaleta]
        })
        response(res, 201, stock)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}