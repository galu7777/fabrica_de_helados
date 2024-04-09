require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  BatidaDeHelado,
  Cliente,
  CuentasPorCobrar,
  DetallesDeVenta,
  DetallesDevolucion,
  Devolucion,
  Ingrediente,
  InventarioMateriaPrima,
  InventarioPaleta,
  Paleta,
  Producto,
  ProductoFinal,
  Proveedor,
  RecipeIngrediente,
  Recipe,
  TipoDePaleta,
  Venta,
  User,
  StockMateriaPrima,
  StockPaleta,
} = sequelize.models;

// Aca vendrian las relaciones
// Relacion entre Paleta y tipo de Paletas.
Paleta.belongsTo(TipoDePaleta);
// Relacion entre ingredientes, proveedores e inventario.
Ingrediente.belongsTo(Proveedor);
InventarioMateriaPrima.belongsTo(Ingrediente);
InventarioMateriaPrima.belongsTo(Proveedor);
// Relacion entre receta e ingrediente
Recipe.belongsToMany(Ingrediente, {through: RecipeIngrediente, constraints: false});
//Relacion entre receta y batido
Recipe.hasMany(BatidaDeHelado, { foreignKey: 'id_recipe' })
BatidaDeHelado.belongsTo(Recipe, { foreignKey: 'id_recipe' })
//Relacion entre receta y paleta
Paleta.hasOne(Recipe, { foreignKey: 'id_paleta' });
Recipe.belongsTo(Paleta, { foreignKey: 'id_paleta' });
// Relacion entre inventario paleta, batido y paleta
InventarioPaleta.belongsTo(Paleta)
InventarioPaleta.belongsTo(BatidaDeHelado)
InventarioPaleta.belongsTo(TipoDePaleta)
//Relacion entre devolucion inventario paleta
Devolucion.belongsTo(InventarioPaleta)
// Relacion entre cliente y venta
Cliente.hasMany(Venta)
Venta.belongsTo(Cliente)
// Relacion entre devolucion y cliente
Cliente.hasMany(Devolucion)
Devolucion.belongsTo(Cliente)
// Relacion entre devolucion y venta
Devolucion.belongsTo(Venta)
// Relacion entre stock, proveedores e ingredientes
StockMateriaPrima.belongsTo(Ingrediente);
StockMateriaPrima.belongsTo(Proveedor);
// Relacion entre stock paleta, batido y paleta
StockPaleta.belongsTo(Paleta)
StockPaleta.belongsTo(BatidaDeHelado)
StockPaleta.belongsTo(TipoDePaleta)

// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
