const { Paleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { nombre, peso, descripcion } = req.body;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de paleta');
        }

        const paleta = await Paleta.findByPk(id);
        if (!paleta) {
            return response(res, 404, 'Paleta no encontrada');
        }

        // Actualizar los campos de la paleta
        if (nombre !== undefined) {
            paleta.nombre = nombre;
        }
        if (peso !== undefined) {
            paleta.peso = peso;
        }
        if (descripcion !== undefined) {
            paleta.descripcion = descripcion;
        }

        await paleta.save();

        return response(res, 200, 'Paleta actualizada correctamente', paleta);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
