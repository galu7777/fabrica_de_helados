const { Cliente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {

    try {
        const { id } = req.params;

        if (id) {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return response(res, 404, 'cliente no encontrado');
            }
            return response(res, 200, cliente);
        } else {
            const cliente = await Cliente.findAll()
            response(res, 201, cliente)
        }

    } catch (error) {
        console.error('Error: ', error.message)
        response(res, 500, 'Error Internal Server')
    }
}
