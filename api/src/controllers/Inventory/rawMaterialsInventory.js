const { InventarioMateriaPrima } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { cantidad, unidad_medida, tipo, IngredienteId, ProveedorId } = req.body;
    try {        
        const entry = await InventarioMateriaPrima.create({
            cantidad, unidad_medida, tipo, IngredienteId, ProveedorId
        })
        return response(res, 201, {message: 'success', entry})
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, `Internal Server Error: ${error.message}`)
    }
}
