const { TipoDePaleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => { 
    try {        
        const tipoPaleta = await TipoDePaleta.findAll()
        response(res, 201, tipoPaleta)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}