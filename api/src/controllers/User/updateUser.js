const { User } = require('../../db');
const response = require('../../utils/response');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { id } = req.params; // El id del usuario a actualizar
    const { nombre, apellido, email, password, rol } = req.body; // Los nuevos datos del usuario

    try {
        // Verificar si el usuario existe
        let user = await User.findByPk(id);

        if (!user) {
            return response(res, 404, 'User not found');
        }

        // Actualizar los campos proporcionados en la solicitud
        if (nombre !== undefined) {
            user.nombre = nombre;
        }
        if (apellido !== undefined) {
            user.apellido = apellido;
        }
        if (email !== undefined) {
            user.email = email;
        }
        if (password !== undefined) {
            const hash = await bcrypt.hash(password, 10);
            user.password = hash;
        }
        if (rol !== undefined) {
            user.rol = rol;
        }

        // Guardar los cambios
        await user.save();

        // Obtener el usuario actualizado
        user = await User.findByPk(id);

        return response(res, 200, { message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error:', error.message);
        return response(res, 500, 'Internal Server Error');
    }
};
