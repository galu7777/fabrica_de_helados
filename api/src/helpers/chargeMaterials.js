const { Ingrediente } = require('../../src/db')

module.exports = async (req, res) => {  
    try {
        const foundMaterial = await Ingrediente.findOne({
            where: {
                nombre: "paletas"
            }
        })
        if(foundMaterial){
            console.log("Loading of Materials ready.")
        } else {
            await Ingrediente.create({
                nombre: "paletas",
                unidad_medida: "UND"
            })
            await Ingrediente.create({
                nombre: "empaques especiales",
                unidad_medida: "UND"
            })
            console.log("🔨 Helper Charge Materials Successful ! 🔨")
        }        
    } catch (error) {
        console.error('Error: ', error.message)
    }

}