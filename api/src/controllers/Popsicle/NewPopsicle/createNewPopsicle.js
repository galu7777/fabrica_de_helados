const { Paleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { nombre, peso, precio, descripcion, id_tipo_paleta } = req.body;    
    try {
        if (!req.file) {
            return response(res, 400, "No se proporcionó ningún archivo de imagen");
        }
        const image = req.file.buffer.toString('base64');

        const newPaleta = await Paleta.create({
            nombre,
            image,
            peso,
            precio,
            descripcion,
            TipoDePaletumId: id_tipo_paleta
        });

        response(res, 201, newPaleta);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
}
