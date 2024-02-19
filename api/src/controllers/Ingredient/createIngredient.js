const { Ingrediente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const body = req.body;
    console.log('body: ',body)
    try {        
        await Ingrediente.create({
            nombre: body.nombre
        })
        response(res, 201, 'success')
    } catch (error) {
        console.error('Error: ', error.message)
    }

}