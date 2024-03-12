const { User } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    try {
        const users = await User.findAll()
        return response(res, 201, users)
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, 'Internal Server Error')
    }
}
