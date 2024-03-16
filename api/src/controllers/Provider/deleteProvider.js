const { Proveedor } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el proveedor existe
        const provider = await Proveedor.findByPk(id);
        if (!provider) {
            return response(res, 404, 'Proveedor no encontrado');
        }

        // Eliminar el proveedor de la base de datos
        await provider.destroy();

        response(res, 200, 'Proveedor eliminado correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, 'Internal Server Error');
    }
};
