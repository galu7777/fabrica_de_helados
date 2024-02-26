const { Recipe, BatidaDeHelado } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    try {
        const batidos = await BatidaDeHelado.findAll({
            include:[Recipe]
        })
        response(res, 200, batidos)
    } catch (error) {
        console.error('Error: ', error.message);
        response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
