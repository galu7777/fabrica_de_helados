const { InventarioMateriaPrima } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de inventario');
        }

        const item = await InventarioMateriaPrima.findByPk(id);
        if (!item) {
            return response(res, 404, 'Elemento de inventario no encontrado');
        }

        const rowsAffected = await item.destroy();
        if (rowsAffected === 0) {
            return response(res, 500, 'Error al eliminar el elemento de inventario');
        }

        return response(res, 200, 'Elemento de inventario eliminado correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
