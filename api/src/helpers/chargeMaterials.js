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
                nombre: "paletas"
            })
            await Ingrediente.create({
                nombre: "empaques"
            })
            await Ingrediente.create({
                nombre: "empaques especiales"
            })
            console.log("🔨 Helper Charge Materials Successful ! 🔨")
        }        
    } catch (error) {
        console.error('Error: ', error.message)
    }

}