const { Proveedor } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { razon_social, direccion, telefono, cod_dni, cedula_rif } = req.body;
    try {        
        const provider = await Proveedor.create({
            razon_social,
            direccion,
            telefono,
            cod_dni,
            cedula_rif
        })
        response(res, 201, {
            message: 'success',
            provider
        })
    } catch (error) {
        console.error('Error: ', error.message)
    }

}