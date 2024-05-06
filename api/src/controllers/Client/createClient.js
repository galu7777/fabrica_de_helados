const { Cliente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { razon_social, direccion, telefono, cod_dni, cedula_rif } = req.body;

    try {
        // Verificar si ya existe un cliente con el mismo RIF
        const existingCliente = await Cliente.findOne({ where: { cedula_rif } });

        if (existingCliente) {
            // Si el RIF ya está registrado, enviar un mensaje de error
            return response(res, 400, 'El RIF ya está registrado');
        }

        // Si el RIF es único, crear el nuevo cliente
        const cliente = await Cliente.create({
            razon_social,
            direccion,
            telefono,
            cod_dni,
            cedula_rif
        });

        // Enviar respuesta con el cliente creado
        response(res, 201, cliente);
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, 'Error Internal Server');
    }
}
