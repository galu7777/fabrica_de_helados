const { Cliente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { nombre, apellido, direccion, telefono } = req.body;    
    try {        
        const cliente = await Cliente.create({
            nombre,
            apellido,
            direccion,
            telefono
        })
        response(res, 201, cliente)
    } catch (error) {
        console.error('Error: ', error.message)
        response(res, 500, 'Error Internal Server')
    }
}