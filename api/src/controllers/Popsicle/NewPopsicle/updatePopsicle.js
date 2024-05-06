const { Paleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params; // Se asume que el ID del elemento a actualizar está en los parámetros de la solicitud
    const { nombre, peso, precio, descripcion, id_tipo_paleta } = req.body;

    try {
        const paletaToUpdate = await Paleta.findByPk(id); // Buscar la paleta a actualizar por su ID

        if (!paletaToUpdate) {
            return response(res, 404, "Paleta no encontrada");
        }

        if (req.file) {
            const image = req.file.buffer.toString('base64');
            paletaToUpdate.image = image; // Actualizar la imagen si se proporciona un nuevo archivo
        }

        paletaToUpdate.nombre = nombre;
        paletaToUpdate.peso = peso;
        paletaToUpdate.precio = precio;
        paletaToUpdate.descripcion = descripcion;
        paletaToUpdate.TipoDePaletumId = id_tipo_paleta;

        await paletaToUpdate.save(); // Guardar los cambios en la base de datos

        response(res, 200, paletaToUpdate);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
}
