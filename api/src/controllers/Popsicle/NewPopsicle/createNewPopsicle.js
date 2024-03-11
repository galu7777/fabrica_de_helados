const { Paleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    const { nombre, peso, descripcion } = req.body;    
    try {        
        const newPaleta = await Paleta.create({
            nombre,
            peso,
            descripcion
        })
        response(res, 201, newPaleta)
    } catch (error) {
        console.error('Error: ', error.message)
        response(res, 500, 'Error Internal Server')
    }
}