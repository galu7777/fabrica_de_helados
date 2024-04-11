const { Paleta, TipoDePaleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la solicitud

    try {
        let paletas;

        if (id) {
            // Si se proporciona un ID, busca la paleta correspondiente
            paletas = await Paleta.findByPk(id, {
                include: [
                    {
                        model: TipoDePaleta,
                        attributes: ['id', 'nombre'],
                    }
                ]
            });

            if (!paletas) {
                // Si no se encuentra la paleta con el ID proporcionado, devuelve un mensaje de error
                return response(res, 404, 'No se encontró ninguna paleta con el ID proporcionado.');
            }
        } else {
            // Si no se proporciona ningún ID, busca todas las paletas
            paletas = await Paleta.findAll({
                include: [
                    {
                        model: TipoDePaleta,
                        attributes: ['id', 'nombre'],
                    }
                ]
            });
        }

        response(res, 200, paletas);
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, 'Error del servidor interno.');
    }
};
