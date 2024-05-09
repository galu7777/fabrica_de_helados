const { InventarioMateriaPrima, StockMateriaPrima, Ingrediente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { cantidad, tipo, IngredienteId, ProveedorId, invoice_amount } = req.body;
    try {
        if(cantidad == 0 || cantidad <= 0){
            return response(res, 500, {message: 'The quantity must be a positive number and greater than zero.'})
        }
        const foundIngredient = await StockMateriaPrima.findOne({
            where: {IngredienteId}
        })
        const ingredientUM = await Ingrediente.findOne({
            where: {id_ingrediente: IngredienteId}
        })

        if(foundIngredient && tipo === "SALIDA") {
            if(foundIngredient.cantidad - cantidad <= 0 ){
                return response(res, 400, {message: 'insufficient quantity in inventory.'})
            } else {
                const cnt = foundIngredient.cantidad - cantidad
                const entry = await foundIngredient.update({
                    cantidad: cnt
                })
                await InventarioMateriaPrima.create({
                    cantidad: -cantidad, unidad_medida: ingredientUM.unidad_medida, tipo, IngredienteId, ProveedorId, invoice_amount: -invoice_amount
                })
                return response(res, 201, {message: 'success', entry})
            }
        }
        else if(foundIngredient && tipo === "ENTREGA"){
            const cnt = foundIngredient.cantidad + cantidad
            const entry = await foundIngredient.update({
                cantidad: cnt
            })
            await InventarioMateriaPrima.create({
                cantidad, unidad_medida: ingredientUM.unidad_medida, tipo, IngredienteId, ProveedorId, invoice_amount
            })
            return response(res, 201, {message: 'success', entry})
        }
        else {
            const entry = await StockMateriaPrima.create({
                cantidad, unidad_medida: ingredientUM.unidad_medida, tipo, IngredienteId, ProveedorId
            })
            await InventarioMateriaPrima.create({
                cantidad, unidad_medida: ingredientUM.unidad_medida, tipo, IngredienteId, ProveedorId
            })
            return response(res, 201, {message: 'success', entry})
        }
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, `Internal Server Error: ${error.message}`)
    }
}
