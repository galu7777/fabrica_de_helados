const { InventarioMateriaPrima } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { cantidad, tipo, IngredienteId, ProveedorId } = req.body;
    try {        
        await InventarioMateriaPrima.create({
            cantidad, tipo, IngredienteId, ProveedorId
        })
        response(res, 201, 'success')
    } catch (error) {
        console.error('Error: ', error.message)
    }
}
