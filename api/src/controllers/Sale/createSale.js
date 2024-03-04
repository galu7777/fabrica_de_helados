const { where } = require('sequelize');
const { Venta, Cliente, InventarioPaleta } = require('../../db')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const { id_cliente, id_inventario_paleta, cantidad, precio, monto, tasa  } = req.body;
    try {
        const foundSmoothie = await Cliente.findOne({
            where: { id_cliente }
        })

        if(foundSmoothie){
            const foundPopsicle = await InventarioPaleta.findOne({
                where: { id_inventario_paleta }
             })
             
            const out_inventory_popsicle = await InventarioPaleta.create({
                paleta: foundPopsicle.paleta,
                cantidad: -cantidad,
                unidad_medida: "GRS",
                tipo: "SALIDA POR VENTA",
                BatidaDeHeladoId: foundPopsicle.BatidaDeHeladoId,
                TipoDePaletumId: foundPopsicle.TipoDePaletumId
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
