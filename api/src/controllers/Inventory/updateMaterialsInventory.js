const { InventarioMateriaPrima } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { cantidad, tipo, IngredienteId, ProveedorId } = req.body;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de inventario');
        }

        const item = await InventarioMateriaPrima.findByPk(id);
        if (!item) {
            return response(res, 404, 'Elemento de inventario no encontrado');
        }

        // Actualizar solo los campos que se proporcionan en el cuerpo de la solicitud
        if (cantidad !== undefined) {
            item.cantidad = cantidad;
        }
        if (tipo !== undefined) {
            item.tipo = tipo;
        }
        if (IngredienteId !== undefined) {
            item.IngredienteId = IngredienteId;
        }
        if (ProveedorId !== undefined) {
            item.ProveedorId = ProveedorId;
        }

        await item.save();

        return response(res, 200, 'Elemento de inventario actualizado correctamente', item);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
