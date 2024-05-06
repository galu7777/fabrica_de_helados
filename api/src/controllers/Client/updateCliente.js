const { Cliente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { razon_social, direccion, telefono, cod_dni, cedula_rif } = req.body;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de cliente');
        }

        const clienteEncontrado = await Cliente.findByPk(id);
        if (!clienteEncontrado) {
            return response(res, 404, 'Cliente no encontrado');
        }

        // Actualizar solo los campos que se proporcionan en el cuerpo de la solicitud
        if (razon_social) {
            clienteEncontrado.razon_social = razon_social;
        }
        if (direccion) {
            clienteEncontrado.direccion = direccion;
        }
        if (telefono) {
            clienteEncontrado.telefono = telefono;
        }
        if (cod_dni) {
            clienteEncontrado.cod_dni = cod_dni;
        }
        if (cedula_rif) {
            clienteEncontrado.cedula_rif = cedula_rif;
        }

        await clienteEncontrado.save();

        return response(res, 200, 'Cliente actualizado correctamente', clienteEncontrado);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
