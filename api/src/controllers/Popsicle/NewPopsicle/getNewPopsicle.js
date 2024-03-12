const { Paleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => { 
    try {        
        const paleta = await Paleta.findAll()
        response(res, 201, paleta)
    } catch (error) {
        console.error('Error: ', error.message)
        response(res, 500, 'Error Internal Server')
    }
}