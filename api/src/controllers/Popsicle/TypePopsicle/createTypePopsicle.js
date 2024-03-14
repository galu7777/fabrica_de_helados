const { TipoDePaleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    const { nombre } = req.body;    
    try {        
        const tipoPaleta = await TipoDePaleta.create({
            nombre
        })
        response(res, 201, tipoPaleta)
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, `Internal Server Error: ${error.message}`)
    }
}