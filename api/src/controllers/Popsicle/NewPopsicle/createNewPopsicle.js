const { Paleta, TipoDePaleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { nombre, peso, descripcion, id_tipo_de_paleta, precio } = req.body;
    try {
        const foundedPopsicleType = await TipoDePaleta.findByPk(id_tipo_de_paleta);
        if (foundedPopsicleType !== null) {
            const typePopsicle = foundedPopsicleType.dataValues;
            console.log(typePopsicle.id)
            const newPaleta = await Paleta.create({
                nombre,
                peso,
                descripcion,
                tipo_paleta: typePopsicle.id,
                precio
            });
            return response(res, 201, newPaleta);
        } else {
            return response(res, 200, "The Popsicles' Type is not registered in the database.");
        }
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
