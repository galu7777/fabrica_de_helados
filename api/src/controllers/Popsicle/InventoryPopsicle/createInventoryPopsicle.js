const { 
    InventarioPaleta, 
    Paleta, 
    TipoDePaleta, 
    BatidaDeHelado, 
    InventarioMateriaPrima, 
    StockMateriaPrima,
    StockPaleta
} = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    const { id_batida, id_paleta, id_empaque} = req.body;
    try {
        const foundSmoothie = await InventarioPaleta.findOne({
            where: { BatidaDeHeladoId: id_batida }
        })

        if(foundSmoothie){
            return response(res, 200, "Shake already registered in the db.")
        }
        const foundedSmoothie = await BatidaDeHelado.findByPk(id_batida)
        const foundedPopsicle = await Paleta.findByPk(id_paleta)
        const idTypyPopsicle = foundedPopsicle.dataValues.TipoDePaletumId
        const foundedPopsicleType = await TipoDePaleta.findByPk(idTypyPopsicle)

        const typePopsicle = foundedPopsicleType.dataValues
        const smoothie = foundedSmoothie.dataValues
        const popsicle = foundedPopsicle.dataValues

        if(typePopsicle && smoothie && popsicle){
            const { id, cantidad } = smoothie
            const foundPalletWood = await StockMateriaPrima.findByPk(1)
            const foundPackaging = await StockMateriaPrima.findByPk(id_empaque)
            let cantidad_paleta = Math.floor(cantidad / popsicle.peso)

            if(foundPalletWood.cantidad - cantidad_paleta <= 0 && foundPackaging.cantidad - cantidad_paleta <= 0){
                return response(res, 400, {message: 'insufficient quantity in inventory.'})
            } else {
                const nombre_paleta = popsicle.nombre
                const foundStock = await StockPaleta.findOne({
                    where: {nombre_paleta}
                })
                if(foundStock){
                    const cntPw = foundPalletWood.cantidad - cantidad_paleta
                    await foundPalletWood.update({
                        cantidad: cntPw
                    })
                    await InventarioMateriaPrima.create({
                        cantidad: -cantidad_paleta, 
                        unidad_medida: foundPalletWood.unidad_medida, 
                        tipo: "SALIDA", 
                        IngredienteId: foundPalletWood.IngredienteId, 
                        ProveedorId: foundPalletWood.ProveedorId
                    })

                    const cntP = foundPackaging.cantidad - cantidad_paleta             
                    await foundPackaging.update({
                        cantidad: cntP
                    })
                    await InventarioMateriaPrima.create({
                        cantidad: -cantidad_paleta, 
                        unidad_medida: foundPackaging.unidad_medida, 
                        tipo: "SALIDA", 
                        IngredienteId: foundPackaging.IngredienteId, 
                        ProveedorId: foundPackaging.ProveedorId
                    })

                    await InventarioPaleta.create({
                        nombre_paleta: popsicle.nombre,
                        tipo_paleta: typePopsicle.nombre,
                        cantidad: cantidad_paleta,
                        peso_unitario: popsicle.peso,
                        unidad_medida: "GRS",
                        tipo: "ENTREGA",
                        PaletumId: popsicle.id,
                        BatidaDeHeladoId: id,
                        TipoDePaletumId: typePopsicle.id
                    })
                    const cnt = foundStock.cantidad
                    const entry_stock_popsicle = await foundStock.update({
                        cantidad: cnt + cantidad_paleta
                    })

                    return response(res, 201, {entry_stock_popsicle})
                } else {
                    const cntPw = foundPalletWood.cantidad - cantidad_paleta             
                    await foundPalletWood.update({
                        cantidad: cntPw
                    })
                    await InventarioMateriaPrima.create({
                        cantidad: -cantidad_paleta, 
                        unidad_medida: foundPalletWood.unidad_medida, 
                        tipo: "SALIDA", 
                        IngredienteId: foundPalletWood.IngredienteId, 
                        ProveedorId: foundPalletWood.ProveedorId
                    })

                    const cntP = foundPackaging.cantidad - cantidad_paleta             
                    await foundPackaging.update({
                        cantidad: cntP
                    })
                    await InventarioMateriaPrima.create({
                        cantidad: -cantidad_paleta, 
                        unidad_medida: foundPackaging.unidad_medida, 
                        tipo: "SALIDA", 
                        IngredienteId: foundPackaging.IngredienteId, 
                        ProveedorId: foundPackaging.ProveedorId
                    })
                    
                    await InventarioPaleta.create({
                        nombre_paleta: popsicle.nombre,
                        tipo_paleta: typePopsicle.nombre,
                        cantidad: cantidad_paleta,
                        peso_unitario: popsicle.peso,
                        unidad_medida: "GRS",
                        tipo: "ENTREGA",
                        PaletumId: popsicle.id,
                        BatidaDeHeladoId: id,
                        TipoDePaletumId: typePopsicle.id
                    })
                    const entry_stock_popsicle = await StockPaleta.create({
                        nombre_paleta: popsicle.nombre,
                        tipo_paleta: typePopsicle.nombre,
                        cantidad: cantidad_paleta,
                        peso_unitario: popsicle.peso,
                        unidad_medida: "GRS",
                        tipo: "ENTREGA",
                        PaletumId: popsicle.id,
                        BatidaDeHeladoId: id,
                        TipoDePaletumId: typePopsicle.id
                    })

                    return response(res, 201, {entry_stock_popsicle})
                }
            }
        } else {
            return response(res, 500, "Don't founded info")
        }
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, `Internal Server Error: ${error.message}`)
    }
}