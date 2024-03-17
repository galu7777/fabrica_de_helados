const { InventarioPaleta, Paleta, TipoDePaleta, BatidaDeHelado } = require('../../../db');
const response = require('../../../utils/response');

module.exports = async (req, res) => {
    const { id_batida, id_paleta } = req.body;

    try {
        // Verificar si ya existe una entrada en el inventario para esta batida de helado
        const foundSmoothie = await InventarioPaleta.findOne({
            where: { BatidaDeHeladoId: id_batida }
        });

        if (foundSmoothie) {
            return response(res, 200, "Shake already registered in the database.");
        }

        // Buscar la batida de helado y la paleta por sus IDs
        const foundedSmoothie = await BatidaDeHelado.findByPk(id_batida);
        const foundedPopsicle = await Paleta.findByPk(id_paleta);

        if (foundedSmoothie && foundedPopsicle) {
            const smoothie = foundedSmoothie.dataValues;
            const popsicle = foundedPopsicle.dataValues;

            // Calcular la cantidad de paletas basada en la cantidad de batida de helado y el peso de la paleta
            const cantidad_paleta = Math.floor(smoothie.cantidad * 1000 / popsicle.peso);

            // Obtener el tipo de paleta asociado a la paleta
            const tipoPaleta = await TipoDePaleta.findByPk(popsicle.TipoDePaletaId);

            // Crear una entrada en el inventario de paletas
            const entry_inventory_popsicle = await InventarioPaleta.create({
                nombre_paleta: popsicle.nombre,
                cantidad: cantidad_paleta,
                peso_unitario: popsicle.peso,
                unidad_medida: "GRS",
                tipo: "ENTREGA",
                BatidaDeHeladoId: id_batida,
                TipoDePaletumId: tipoPaleta.id, // Usar el ID del tipo de paleta
            });

            return response(res, 201, { entry_inventory_popsicle });
        } else {
            return response(res, 500, "Couldn't find required information.");
        }
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
