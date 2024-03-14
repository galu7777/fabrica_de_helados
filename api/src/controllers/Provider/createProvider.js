const { Proveedor } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { razon_social, direccion, telefono, cod_dni, cedula_rif } = req.body;
    try {
        // Verificar si ya existen proveedores en la base de datos
        const existenProveedores = await Proveedor.count();
        if (existenProveedores === 0) {
            // Si no hay proveedores, crear uno por defecto
            await Proveedor.create({
                razon_social: 'creacion de batido',
                direccion: 'db',
                telefono: '000000',
                cod_dni: 'V',
                cedula_rif: '0000000'
            });
        }

        // Después de verificar/crear el proveedor por defecto, proceder a crear el nuevo proveedor con los datos de la petición
        const provider = await Proveedor.create({
            razon_social,
            direccion,
            telefono,
            cod_dni,
            cedula_rif
        });

        response(res, 201, {
            message: 'Proveedor creado con éxito',
            provider
        });
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, 'Internal Server Error');
    }
};
