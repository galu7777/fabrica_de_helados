const { Venta, Cliente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: [Cliente]
        })
        return response(res, 201, ventas)
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, 'Internal Server Error')
    }

}