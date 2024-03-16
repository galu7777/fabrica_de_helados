const { Ingrediente } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        if (!id) {
            return response(res, 400, 'Se requiere un ID de ingrediente');
        }

        const ingrediente = await Ingrediente.findByPk(id);
        if (!ingrediente) {
            return response(res, 404, 'Ingrediente no encontrado');
        }

        // Actualizar solo los campos que se proporcionan en el cuerpo de la solicitud
        if (nombre) {
            ingrediente.nombre = nombre;
        }
      

        await ingrediente.save();

        return response(res, 200, 'Ingrediente actualizado correctamente', ingrediente);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Error interno del servidor: ${error.message}`);
    }
};
