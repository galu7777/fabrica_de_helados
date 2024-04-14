const { InventarioPaleta, Paleta, TipoDePaleta, StockPaleta } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id_paleta, cantidad, tipo, descripcion } = req.body;

    try {
        const foundedPopsicle = await Paleta.findByPk(id_paleta);
        const idTypePopsicle = foundedPopsicle.TipoDePaletumId;
        const typePopsicle = await TipoDePaleta.findByPk(idTypePopsicle);
        const popsicle = foundedPopsicle.dataValues;
        let cantidad_paleta = cantidad;

        let existingInventory = await InventarioPaleta.findOne({ where: { PaletumId: id_paleta } });

        if (tipo === 'ENTREGA') {
            // Lógica para ENTRADA

                existingInventory = await InventarioPaleta.create({
                    nombre_paleta: popsicle.nombre,
                    tipo_paleta: typePopsicle.nombre,
                    cantidad: cantidad_paleta,
                    peso_unitario: popsicle.peso,
                    precio: popsicle.precio,
                    unidad_medida: "GRS",
                    tipo: tipo,
                    PaletumId: popsicle.id,
                    TipoDePaletumId: typePopsicle.id
                });

        } else {
            // Lógica para SALIDA
            if (!existingInventory) {
                return response(res, 404, 'No hay stock disponible para la paleta');
            }

            cantidad_paleta = -cantidad_paleta;

            if (existingInventory) {

                existingInventory = await InventarioPaleta.create({
                    nombre_paleta: popsicle.nombre,
                    tipo_paleta: typePopsicle.nombre,
                    cantidad: cantidad_paleta,
                    peso_unitario: popsicle.peso,
                    precio: popsicle.precio,
                    unidad_medida: "GRS",
                    tipo: tipo,
                    PaletumId: popsicle.id,
                    TipoDePaletumId: typePopsicle.id,
                    descripcion
                });



            } else {
                return response(res, 500, `No hay Stock disponible`);
            }
        }

        let stockPaleta = await StockPaleta.findOne({ where: { PaletumId: id_paleta } });

        // Verificar si el stock de paletas es negativo
        if (stockPaleta && stockPaleta.cantidad + cantidad_paleta < 0) {
            return response(res, 400, 'El stock de paletas no puede ser negativo');
        }

        if (stockPaleta) {
            await stockPaleta.update({ cantidad: stockPaleta.cantidad + cantidad_paleta });
        } else {
            stockPaleta = await StockPaleta.create({
                nombre_paleta: popsicle.nombre,
                tipo_paleta: typePopsicle.nombre,
                cantidad: cantidad_paleta,
                peso_unitario: popsicle.peso,
                precio: popsicle.precio,
                unidad_medida: "GRS",
                tipo: tipo,
                PaletumId: popsicle.id,
                TipoDePaletumId: typePopsicle.id
            });
        }

        return response(res, 201, { stockPaleta });
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
