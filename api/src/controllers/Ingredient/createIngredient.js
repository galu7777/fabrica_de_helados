const { Ingrediente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { nombre, unidad_medida } = req.body;    
    try {        
        const ingredient = await Ingrediente.create({
            nombre,
            unidad_medida
        })
        response(res, 201, ingredient)
    } catch (error) {
        console.error('Error: ', error.message)
        response(res, 500, `Internal Server Error: ${error.message}`)
    }

}