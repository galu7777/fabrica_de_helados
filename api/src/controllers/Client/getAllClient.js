const { Cliente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {   
    try {        
        const cliente = await Cliente.findAll()
        response(res, 201, cliente)
    } catch (error) {
        console.error('Error: ', error.message)
        response(res, 500, 'Error Internal Server')
    }
}