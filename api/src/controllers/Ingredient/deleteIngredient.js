const { Ingrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de ingrediente');
        }

        const ingrediente = await Ingrediente.findByPk(id);
        if (!ingrediente) {
            return response(res, 404, 'Ingrediente no encontrado');
        }

        const rowsAffected = await ingrediente.destroy();
        if (rowsAffected === 0) {
            return response(res, 500, 'Error al eliminar el ingrediente');
        }

        return response(res, 200, 'Ingrediente eliminado correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
