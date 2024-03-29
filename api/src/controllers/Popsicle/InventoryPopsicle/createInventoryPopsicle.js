const { InventarioPaleta, Paleta, TipoDePaleta, BatidaDeHelado } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    const { id_batida, id_tipo_de_paleta, id_paleta} = req.body;
    try {
        const foundSmoothie = await InventarioPaleta.findOne({
            where: { BatidaDeHeladoId: id_batida }
        })

        if(foundSmoothie){
            return response(res, 200, "Shake already registered in the db.")
        }
        const foundedSmoothie = await BatidaDeHelado.findByPk(id_batida)
        const foundedPopsicleType = await TipoDePaleta.findByPk(id_tipo_de_paleta)
        const foundedPopsicle = await Paleta.findByPk(id_paleta)

        const typePopsicle = foundedPopsicleType.dataValues
        const smoothie = foundedSmoothie.dataValues
        const popsicle = foundedPopsicle.dataValues
        
        if(typePopsicle && smoothie && popsicle){
            const { id, cantidad } = smoothie
            const cantidad_paleta = Math.floor(cantidad * 1000 / popsicle.peso)

            const entry_inventory_popsicle = await InventarioPaleta.create({
                nombre_paleta: popsicle.nombre,
                tipo_paleta: typePopsicle.nombre,
                cantidad: cantidad_paleta,
                peso_unitario: popsicle.peso,
                unidad_medida: "GRS",
                tipo: "ENTREGA",
                BatidaDeHeladoId: id,
                TipoDePaletumId: typePopsicle.id
            })
            return response(res, 201, {entry_inventory_popsicle})
        } else {
            return response(res, 500, "Don't founded info")
        }
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, `Internal Server Error: ${error.message}`)
    }
}
