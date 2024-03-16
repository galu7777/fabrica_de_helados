const { BatidaDeHelado } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { id_recipe, cantidad } = req.body;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de batida de helado');
        }

        const batidaDeHelado = await BatidaDeHelado.findByPk(id);
        if (!batidaDeHelado) {
            return response(res, 404, 'Batida de helado no encontrada');
        }

        // Actualizar los campos de la batida de helado
        if (id_recipe !== undefined) {
            batidaDeHelado.id_recipe = id_recipe;
        }
        if (cantidad !== undefined) {
            batidaDeHelado.cantidad = cantidad;
        }

        await batidaDeHelado.save();

        return response(res, 200, 'Batida de helado actualizada correctamente', batidaDeHelado);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
