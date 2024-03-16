const { Proveedor } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { razon_social, direccion, telefono, cod_dni, cedula_rif } = req.body;

    try {
        // Verificar si el proveedor existe
        const provider = await Proveedor.findByPk(id);
        if (!provider) {
            return response(res, 404, 'Proveedor no encontrado');
        }

        // Actualizar los campos del proveedor con los datos proporcionados
        provider.razon_social = razon_social;
        provider.direccion = direccion;
        provider.telefono = telefono;
        provider.cod_dni = cod_dni;
        provider.cedula_rif = cedula_rif;

        // Guardar los cambios en la base de datos
        await provider.save();

        response(res, 200, 'Proveedor actualizado correctamente', provider);
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, 'Internal Server Error');
    }
};
