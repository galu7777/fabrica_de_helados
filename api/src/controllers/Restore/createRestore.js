const { Devolucion, Cliente, Venta, InventarioPaleta } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { id_cliente, id_venta, id_inventario_paleta, concepto, cantidad  } = req.body;
    try {
        const foundClient = await Cliente.findOne({
            where: { id_cliente }
        })

        const foundSale = await Venta.findOne({
            where: { id_venta }
        })

        if(foundClient && foundSale){
            const foundPopsicle = await InventarioPaleta.findOne({
                where: { id_inventario_paleta }
            })

            await InventarioPaleta.create({
                nombre_paleta: foundPopsicle.nombre_paleta,
                tipo_paleta: foundPopsicle.paleta,
                cantidad: cantidad,
                peso_unitario: foundPopsicle.peso_unitario,
                unidad_medida: "GR",
                tipo: "ENTREGA",
                BatidaDeHeladoId: foundPopsicle.BatidaDeHeladoId,
                TipoDePaletumId: foundPopsicle.TipoDePaletumId
            })

            const devolucion = await Devolucion.create({
                concepto,
                cantidad,
                InventarioPaletumId: id_inventario_paleta,
                ClienteId: id_cliente,
                VentumId: id_venta
            })
            return response(res, 201, devolucion)
        }
        return response(res, 200, "The client is not registered in the database.")
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, `Internal Server Error: ${error.message}`)
    }

}
