const { StockMateriaPrima, Ingrediente } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    try {        
        const stock = await StockMateriaPrima.findAll({
            include: [Ingrediente]
        })
        response(res, 201, stock)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}