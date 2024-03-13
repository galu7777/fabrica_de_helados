const { Cliente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { razon_social, direccion, telefono, cod_dni, cedula_rif } = req.body;   
    try {        
        const cliente = await Cliente.create({
            razon_social,
            direccion,
            telefono,
            cod_dni,
            cedula_rif
        })
        response(res, 201, cliente)
    } catch (error) {
        console.error('Error: ', error.message)
        response(res, 500, 'Error Internal Server')
    }
}