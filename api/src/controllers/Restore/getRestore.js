const { Devolucion, Cliente, Venta, InventarioPaleta } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    try {
        const detallesDevolucion = await Devolucion.findAll({
            include: [Cliente, Venta, InventarioPaleta]
        })
        return response(res, 200, detallesDevolucion)
    } catch (error) {
        console.log(error.message)
        return response(res, 500, `Internal Server Error: ${error.message}`)
    }
}