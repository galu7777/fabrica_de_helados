const { InventarioPaleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de inventario de paleta');
        }

        const inventarioPaleta = await InventarioPaleta.findByPk(id);
        if (!inventarioPaleta) {
            return response(res, 404, 'Inventario de paleta no encontrado');
        }

        await inventarioPaleta.destroy();

        return response(res, 200, 'Inventario de paleta eliminado correctamente');
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
