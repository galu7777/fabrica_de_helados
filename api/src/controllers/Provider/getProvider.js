const { Proveedor } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    try {        
        const provider = await Proveedor.findAll()
        response(res, 200, provider)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}