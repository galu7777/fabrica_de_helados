const { Router } = require('express');
const getIngredient = require('../controllers/Ingredient/getIngredient');
const createIngredient = require('../controllers/Ingredient/createIngredient')
const getProvider = require('../controllers/Provider/getProvider');
const createProvider = require('../controllers/Provider/createProvider');
const getMaterialsInventory = require('../controllers/Inventory/getMaterialsInventory');
const RawMaterialsInventory = require('../controllers/Inventory/rawMaterialsInventory');
const createRecipe = require('../controllers/Recipe/createRecipe');
const getRecipe = require('../controllers/Recipe/getRecipe');
const createSmoothie = require('../controllers/smoothie/createSmoothie');
const getSmoothie = require('../controllers/Smoothie/getSmoothie');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// rutas de ingredientes
router.get('/ingredient/get_allingredient', getIngredient)
router.post('/ingredient/create_ingredient', createIngredient)

// rutas de proveedor
router.get('/provider/get_allproviders', getProvider)
router.post('/provider/create_provider', createProvider)

// rutas de inventario
router.get('/inventory/get_ingredient', getMaterialsInventory)
router.post('/inventory/create_ingredient', RawMaterialsInventory)

// rutas de receta
router.get('/recipe/get_recipe', getRecipe)
router.post('/recipe/create_recipe', createRecipe)

// rutas de batido
router.get('/smoothie/get_smoothie', getSmoothie)
router.post('/smoothie/create_smoothie', createSmoothie)



module.exports = router;
