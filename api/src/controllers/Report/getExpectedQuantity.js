const { BatidaDeHelado, Recipe, InventarioPaleta, Paleta, TipoDePaleta } = require('../../db');
const response = require('../../utils/response');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        // Obtener las recetas de batidos
        const batidos = await BatidaDeHelado.findAll({
            include: [Recipe]
        });

        // Crear un objeto para agrupar las cantidades de recetas y stock por paletaId
        const conciliacionData = {};
        batidos.forEach(batido => {
            const paletaId = batido.Recipe.id_paleta;
            if (!conciliacionData[paletaId]) {
                conciliacionData[paletaId] = {
                    paletaId: paletaId,
                    nombre: batido.Recipe.nombre,
                    cantidadReceta: 0,
                    cantidadStock: 0,
                    diferencia: 0
                };
            }
            conciliacionData[paletaId].cantidadReceta += batido.Recipe.cantidadAprox;
        });

        // Obtener el inventario de paletas con tipo 'ENTREGA' y cantidades mayores a cero
        const inventory = await InventarioPaleta.findAll({
            include: [Paleta],
            where: {
                tipo: 'ENTREGA',
                cantidad: { [Op.gt]: 0 }
            },
            order: [['createdAt', 'DESC']]
        });

        // Actualizar el objeto conciliacionData con las cantidades de stock
        inventory.forEach(invItem => {
            const paletaId = invItem.PaletumId;
            if (conciliacionData[paletaId]) {
                conciliacionData[paletaId].cantidadStock += invItem.cantidad;
            }
        });
        console.log(inventory)

        // Calcular la diferencia para cada paleta
        Object.values(conciliacionData).forEach(item => {
            item.diferencia = item.cantidadStock - item.cantidadReceta;
        });

        // Convertir el objeto en un array de resultados
        const conciliacion = Object.values(conciliacionData);

        return response(res, 200, conciliacion);
    } catch (error) {
        console.error('Error: ', error.message);
        return response(res, 500, `Internal Server Error: ${error.message}`);
    }
};
