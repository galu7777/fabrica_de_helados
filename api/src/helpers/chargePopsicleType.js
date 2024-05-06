const { TipoDePaleta } = require('../../src/db')

module.exports = async (req, res) => {
    try {
        const foundMaterial = await TipoDePaleta.findOne({
            where: {
                nombre: "citricas"
            }
        })
        if(foundMaterial){
            console.log("Loading of Popsicle Type ready.")
        } else {
            // Aquí verificamos si foundMaterial es null o undefined
            await TipoDePaleta.create({
                nombre: "citricas"
            })
            await TipoDePaleta.create({
                nombre: "cremosas"
            })
            await TipoDePaleta.create({
                nombre: "rellenas"
            })
            await TipoDePaleta.create({
                nombre: "premium"
            })
            console.log("🔨 Helper Charge Popsicle Type Successful ! 🔨")
        }
    } catch (error) {
        console.error('Error: ', error.message)
    }
}
