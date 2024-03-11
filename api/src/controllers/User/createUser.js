const { User } = require('../../db')
const response = require('../../utils/response')
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    const { nombre, apellido, email, password, rol  } = req.body;
    try {
        const infoRepeat = await User.findOne({
            where: {nombre, apellido, email}
        })

        if(infoRepeat){
            return response(res, 500, 'Registered user')
        }
        const hash = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            nombre,
            apellido,
            email,
            password: hash,
            rol
        })
        return response(res, 201, {message: "success", newUser})
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, 'Internal Server Error')
    }
}
