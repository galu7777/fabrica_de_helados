const { User } = require('../../db')
const response = require('../../utils/response')
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    const { email, password  } = req.body;
    try {
        const foundUser = await User.findOne({
            where: {email}
        })
        if(!foundUser){
            response(res, 500, 'user not registered in database.')
        } else {
            const equal = await bcrypt.compare(password, foundUser.password);
            !equal 
            ? response(res, 500, 'Invalid password.')
            : response(res, 200, { message: 'successful login', foundUser })
        }        
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, 'Internal Server Error')
    }
}
