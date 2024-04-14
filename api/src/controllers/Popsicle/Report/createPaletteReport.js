const {
    InventarioPaleta,
    Paleta,
    TipoDePaleta,
    StockPaleta
} = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id_paleta, cantidad } = req.body;

    try {
        const foundedPopsicle = await Paleta.findByPk(id_paleta);
        const idTypePopsicle = foundedPopsicle.TipoDePaletumId;

        const typePopsicle = await TipoDePaleta.findByPk(idTypePopsicle);
        const popsicle = foundedPopsicle.dataValues;

        let cantidad_paleta = cantidad;

        // Busca un registro existente con el ID proporcionado
        const existingInventory = await InventarioPaleta.findOne({ where: { PaletumId: id_paleta } });

        if (existingInventory) {
            await InventarioPaleta.create({
                nombre_paleta: popsicle.nombre,
                tipo_paleta: typePopsicle.nombre,
                cantidad: cantidad_paleta,
                peso_unitario: popsicle.peso,
                precio: popsicle.precio,
                unidad_medida: "GRS",
                tipo: "ENTREGA",
                PaletumId: popsicle.id,
                TipoDePaletumId: typePopsicle.id
            });
        } else {
            // Si no existe un registro, crea uno nuevo
            await InventarioPaleta.create({
                nombre_paleta: popsicle.nombre,
                tipo_paleta: typePopsicle.nombre,
                cantidad: cantidad_paleta,
                peso_unitario: popsicle.peso,
                precio: popsicle.precio,
                unidad_medida: "GRS",
                tipo: "ENTREGA",
                PaletumId: popsicle.id,
                TipoDePaletumId: typePopsicle.id
            });
        }

        // Actualiza el stock de paletas
        const [stockPaleta, createdStock] = await StockPaleta.findOrCreate({
            where: { PaletumId: id_paleta },
            defaults: {
                nombre_paleta: popsicle.nombre,
                tipo_paleta: typePopsicle.nombre,
                cantidad: cantidad_paleta,
                peso_unitario: popsicle.peso,
                precio: popsicle.precio,
                unidad_medida: "GRS",
                tipo: "ENTREGA",
                PaletumId: popsicle.id,
                TipoDePaletumId: typePopsicle.id
            }
        });

        if (!createdStock) {
            // Si no se creó un nuevo registro, actualiza la cantidad en lugar de crear uno nuevo
            await stockPaleta.update({ cantidad: stockPaleta.cantidad + cantidad_paleta });
        }

        return response(res, 201, { stockPaleta });
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
