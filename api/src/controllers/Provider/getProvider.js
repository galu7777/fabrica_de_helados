const { Proveedor } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const provider = await Proveedor.findByPk(id);
            if (!provider) {
                return response(res, 404, 'Proveedor no encontrado');
            }
            return response(res, 200, provider);
        }else{
            const providers = await Proveedor.findAll();
            return response(res, 200, providers);
        }

    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
}
