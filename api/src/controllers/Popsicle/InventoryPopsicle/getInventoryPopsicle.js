const { InventarioPaleta, TipoDePaleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    try {
        const inventory = await InventarioPaleta.findAll({
            include: [TipoDePaleta]
        })
        return response(res, 200, inventory)
    } catch (error) {
        return response(res, 500, 'Internal Server Error')
    }
}