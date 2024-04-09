const { Venta, Cliente, InventarioPaleta, StockPaleta, Paleta, ClienteVenta } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id_cliente, tasa, ventas } = req.body;
    try {
        const foundClient = await Cliente.findOne({
            where: { id_cliente }
        });

        if (foundClient) {
            for (const venta of ventas) {
                const { id_stock_paleta, cantidad } = venta;

                if (cantidad <= 0) {
                    return response(res, 500, { message: 'The quantity must be a positive number and greater than zero.' });
                }
                if (tasa <= 0) {
                    return response(res, 500, { message: 'The rate must be a positive number and greater than zero.' });
                }

                const inventoryPopsicle = await InventarioPaleta.findOne({
                    where: { id_inventario_paleta: id_stock_paleta }
                });

                const stockPopsicle = await StockPaleta.findOne({
                    where: { id_stock_paleta },
                    include: [
                        {
                            model: Paleta,
                            attributes: ['id', 'descripcion', 'precio']
                        }
                    ]
                });

                if (!inventoryPopsicle && !stockPopsicle) {
                    return response(res, 400, { message: `No stock or inventory was found with this id: ${id_stock_paleta}` });
                } else {
                    if (stockPopsicle.cantidad - cantidad <= 0) {
                        return response(res, 400, { message: 'insufficient quantity in inventory.' });
                    } else {
                        const { precio } = stockPopsicle.Paletum;
                        const monto_usd = precio * cantidad;
                        const monto_bs = monto_usd * tasa;

                        const newVenta = await Venta.create({
                            nombre_paleta: inventoryPopsicle.nombre_paleta,
                            cantidad,
                            precio,
                            monto_usd,
                            monto_bs,
                            tasa,
                        });
                        // Establece la relación entre la venta y el cliente utilizando setCliente
                        await ClienteVenta.create({
                            razon_social: foundClient.razon_social,
                            nombre_paleta: inventoryPopsicle.nombre_paleta,
                            cantidad,
                            precio,
                            monto_usd,
                            monto_bs,
                            tasa,
                            ClienteId: id_cliente,
                            VentumId: newVenta.id
                        })

                        const cnt = stockPopsicle.cantidad;
                        await stockPopsicle.update({
                            cantidad: cnt - cantidad
                        });

                        await InventarioPaleta.create({
                            nombre_paleta: inventoryPopsicle.nombre_paleta,
                            tipo_paleta: inventoryPopsicle.tipo_paleta,
                            cantidad: -cantidad,
                            peso_unitario: inventoryPopsicle.peso_unitario,
                            unidad_medida: inventoryPopsicle.unidad_medida,
                            tipo: "SALIDA POR VENTA",
                            PaletumId: inventoryPopsicle.PaletumId,
                            BatidaDeHeladoId: inventoryPopsicle.BatidaDeHeladoId,
                            TipoDePaletumId: inventoryPopsicle.TipoDePaletumId
                        });
                    }
                }
            }
            return response(res, 201, { message: 'Sales successfully recorded.' });
        }
        return response(res, 200, "The client is not registered in the database.");
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
