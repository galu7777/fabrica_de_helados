const { InventarioPaleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { nombre_paleta, tipo_paleta, cantidad, peso_unitario, unidad_medida, tipo, BatidaDeHeladoId, TipoDePaletumId } = req.body;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de inventario de paleta');
        }

        const inventarioPaleta = await InventarioPaleta.findByPk(id);
        if (!inventarioPaleta) {
            return response(res, 404, 'Inventario de paleta no encontrado');
        }

        // Actualizar los campos del inventario de paleta
        if (nombre_paleta !== undefined) {
            inventarioPaleta.nombre_paleta = nombre_paleta;
        }
        if (tipo_paleta !== undefined) {
            inventarioPaleta.tipo_paleta = tipo_paleta;
        }
        if (cantidad !== undefined) {
            inventarioPaleta.cantidad = cantidad;
        }
        if (peso_unitario !== undefined) {
            inventarioPaleta.peso_unitario = peso_unitario;
        }
        if (unidad_medida !== undefined) {
            inventarioPaleta.unidad_medida = unidad_medida;
        }
        if (tipo !== undefined) {
            inventarioPaleta.tipo = tipo;
        }
        if (BatidaDeHeladoId !== undefined) {
            inventarioPaleta.BatidaDeHeladoId = BatidaDeHeladoId;
        }
        if (TipoDePaletumId !== undefined) {
            inventarioPaleta.TipoDePaletumId = TipoDePaletumId;
        }

        await inventarioPaleta.save();

        return response(res, 200, 'Inventario de paleta actualizado correctamente', inventarioPaleta);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
