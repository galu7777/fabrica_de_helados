const { User } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            // Si se proporciona un ID, obtener el usuario por su ID
            const user = await User.findByPk(id);
            if (!user) {
                return response(res, 404, 'Usuario no encontrado');
            }
            return response(res, 200, user);
        } else {
            // Si no se proporciona un ID, obtener todos los usuarios
            const users = await User.findAll();
            return response(res, 200, users);
        }
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
