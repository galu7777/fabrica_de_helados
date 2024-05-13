const { Venta, Cliente, InventarioPaleta, StockPaleta, Paleta, ClienteVenta } = require('../../db');
const response = require('../../utils/response');

module.exports = async (req, res) => {
    const { id_cliente, tasa, ventas } = req.body;
    try {
        const foundClient = await Cliente.findOne({
            where: { id_cliente }
        });

        if (!foundClient) {
            return response(res, 400, { message: 'The client is not registered in the database.' });
        }

        let cantidadTotal = 0;
        let montoTotal = 0;

        // Crear la venta una sola vez fuera del bucle for
        const newVenta = await Venta.create({
            id_cliente,
            cantidad_total: cantidadTotal,
            monto_total: montoTotal,
            tasa,
        });

        for (const venta of ventas) {
            const { id_stock_paleta, cantidad } = venta;

            if (cantidad <= 0) {
                return response(res, 400, { message: 'The quantity must be a positive number and greater than zero.' });
            }
            if (tasa <= 0) {
                return response(res, 400, { message: 'The rate must be a positive number and greater than zero.' });
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

            if (!inventoryPopsicle || !stockPopsicle) {
                return response(res, 400, { message: `No stock or inventory was found with this id: ${id_stock_paleta}` });
            }

            if (stockPopsicle.cantidad - cantidad < 0) {
                return response(res, 400, { message: 'Insufficient quantity in inventory.' });
            }

            const { precio } = stockPopsicle.Paletum;
            const monto_usd = precio * cantidad;
            const monto_bs = monto_usd * tasa;

            cantidadTotal += cantidad;
            montoTotal += monto_usd;

            // Asociar paletas compradas a la venta
            await newVenta.addPaletasCompradas(stockPopsicle, { through: { cantidad, monto_usd, monto_bs, precio } });

            // Actualizar la cantidad de paletas en stock
            await stockPopsicle.update({ cantidad: stockPopsicle.cantidad - cantidad });
           
            // Registrar la salida por venta en el inventario
            await InventarioPaleta.create({
                nombre_paleta: stockPopsicle.nombre_paleta,
                tipo_paleta: stockPopsicle.tipo_paleta,
                cantidad: -cantidad,
                peso_unitario: stockPopsicle.peso_unitario,
                unidad_medida: stockPopsicle.unidad_medida,
                tipo: "SALIDA POR VENTA",
                PaletumId: stockPopsicle.PaletumId,
                BatidaDeHeladoId: stockPopsicle.BatidaDeHeladoId,
                TipoDePaletumId: stockPopsicle.TipoDePaletumId
            });
        }
        await newVenta.update({
            cantidad_total: cantidadTotal,
            monto_total: montoTotal
        });

        return response(res, 201, { message: 'Sales successfully recorded.' });
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }


};
