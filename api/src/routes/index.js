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
const createTypePopsicle = require('../controllers/Popsicle/TypePopsicle/createTypePopsicle');
const getTypePopsicle = require('../controllers/Popsicle/TypePopsicle/getTypePopsicle');
const createInventoryPopsicle = require('../controllers/Popsicle/InventoryPopsicle/createInventoryPopsicle');
const getInventoryPopsicle = require('../controllers/Popsicle/InventoryPopsicle/getInventoryPopsicle');
const createClient = require('../controllers/Client/createClient');
const getAllClient = require('../controllers/Client/getAllClient');
const createSale = require('../controllers/Sale/createSale');
const getSales = require('../controllers/Sale/getSales');
const createNewPopsicle = require('../controllers/Popsicle/NewPopsicle/createNewPopsicle');
const getNewPopsicle = require('../controllers/Popsicle/NewPopsicle/getNewPopsicle');
const createUser = require('../controllers/User/createUser');
const getAllUser = require('../controllers/User/getAllUser');
const auth = require('../controllers/Auth/auth');
const createRestore = require('../controllers/Restore/createRestore');
const getRestore = require('../controllers/Restore/getRestore');
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
router.get('/inventory/get_inventory', getMaterialsInventory)
router.post('/inventory/create_entry', RawMaterialsInventory)

// rutas de receta
router.get('/recipe/get_recipe', getRecipe)
router.post('/recipe/create_recipe', createRecipe)

// rutas de batido
router.get('/smoothie/get_smoothie', getSmoothie)
router.post('/smoothie/create_smoothie', createSmoothie)

// rutas de tipos paletas
router.get('/popsicle/get_type_popsicle', getTypePopsicle)
router.post('/popsicle/create_type_popsicle', createTypePopsicle)

// rutas nuevas paletas
router.get('/popsicle/get_popsicle', getNewPopsicle)
router.post('/popsicle/create_popsicle', createNewPopsicle)

// rutas inventario de paletas
router.get('/inventory_popsicle/get_inventory', getInventoryPopsicle)
router.post('/inventory_popsicle/create_entry', createInventoryPopsicle)

// rutas cliente
router.get('/client/get_allclients', getAllClient)
router.post('/client/create_new_client', createClient)

// rutas de ventas
router.get('/sale/get_allsales', getSales)
router.post('/sale/create_sale', createSale)

// rutas de user
router.get('/user/get_alluser', getAllUser)
router.post('/user/create_user', createUser)

// rutas de auth
router.post('/auth/signin', auth)

// rutas de devolucion
router.get('/restore/get_restore', getRestore)
router.post('/restore/create_restore', createRestore)

module.exports = router;
