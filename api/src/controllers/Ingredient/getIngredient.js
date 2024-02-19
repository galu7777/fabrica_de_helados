const { Ingrediente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    try {        
        const ingredient = await Ingrediente.findAll()
        response(res, 201, ingredient)
    } catch (error) {
        console.error('Error: ', error.message)
    }
}