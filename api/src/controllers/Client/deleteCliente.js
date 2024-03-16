const { Cliente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de Cliente');
        }

        const clienteEncontrado = await Cliente.findByPk(id);
        if (!clienteEncontrado) {
            return response(res, 404, 'Cliente no encontrado');
        }

        const rowsAffected = await clienteEncontrado.destroy();
        if (rowsAffected === 0) {
            return response(res, 500, 'Error al eliminar el Cliente');
        }

        return response(res, 200, 'Cliente eliminado correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
