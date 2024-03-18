const { Paleta, TipoDePaleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id, nombre, peso, descripcion, id_tipo_de_paleta, precio } = req.body;

    try {
        // Buscar la paleta por su ID
        const paletaExistente = await Paleta.findByPk(id);

        // Verificar si la paleta existe
        if (!paletaExistente) {
            return response(res, 404, "Popsicle not found.");
        }

        // Verificar si el tipo de paleta existe
        const tipoDePaleta = await TipoDePaleta.findByPk(id_tipo_de_paleta);
        if (!tipoDePaleta) {
            return response(res, 404, "Popsicle type not found.");
        }

        // Actualizar la paleta con los nuevos datos
        const updatedPaleta = await paletaExistente.update({
            nombre,
            peso,
            descripcion,
            tipo_paleta: id_tipo_de_paleta,
            precio
        });

        return response(res, 200, updatedPaleta);
    } catch (error) {
        console.error('Error:', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
