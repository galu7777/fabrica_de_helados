const { Venta, Cliente } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { id_cliente, cantidad, precio, monto, tasa  } = req.body;    
    try {
        const foundSmoothie = await Cliente.findOne({
            where: { id_cliente }
        })

        if(foundSmoothie){
            const out_inventory_popsicle = await InventarioPaleta.create({
                paleta: typePopsicle.nombre,
                cantidad: cantidad_paleta,
                unidad_medida: "GRS",
                tipo: "ENTREGA",
                BatidaDeHeladoId: id,
                TipoDePaletumId: typePopsicle.id
            })

            const venta = await Venta.create({
                cantidad,
                precio,
                monto,
                tasa,
                ClienteId: id_cliente
            })
            return response(res, 201, venta)
        }
        return response(res, 200, "The client is not registered in the database.")
    } catch (error) {
        console.error('Error: ', error.message)
        return response(res, 500, 'Internal Server Error')
    }

}