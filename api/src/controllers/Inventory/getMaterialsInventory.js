const { InventarioMateriaPrima, Ingrediente, Proveedor } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    try {
        const inventory = await InventarioMateriaPrima.findAll({
            include: [Ingrediente, Proveedor],
              order: [['createdAt', 'DESC']]
        })
        response(res, 201, inventory)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}
