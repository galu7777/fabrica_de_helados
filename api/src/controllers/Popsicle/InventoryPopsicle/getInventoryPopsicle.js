const { InventarioPaleta, TipoDePaleta } = require('../../../db')
const response = require('../../../utils/response')

module.exports = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        if (id) {
            const inventoryPopsicle = await InventarioPaleta.findByPk(id);

            if (!inventoryPopsicle) {
                return response(res, 404, 'Inventario no encontrado');
            }
            return response(res, 200, inventoryPopsicle)

        } else {
            const inventory = await InventarioPaleta.findAll({
                include: [TipoDePaleta]
            })
            return response(res, 200, inventory)

        }

    } catch (error) {
        return response(res, 500, 'Internal Server Error')
    }
}
