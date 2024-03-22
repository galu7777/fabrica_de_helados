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
const deleteIngredient = require('../controllers/Ingredient/deleteIngredient');
const updateIngredient = require('../controllers/Ingredient/updateIngredient');
const deleteCliente = require('../controllers/Client/deleteCliente');
const updateCliente = require('../controllers/Client/updateCliente');
const deleteMaterialsInventory = require('../controllers/Inventory/deleteMaterialsInventory');
const updateMaterialsInventory = require('../controllers/Inventory/updateMaterialsInventory');
const deleteRecipe = require('../controllers/Recipe/deleteRecipe');
const updateRecipe = require('../controllers/Recipe/updateRecipe');
const deleteProvider = require('../controllers/Provider/deleteProvider');
const updateProvider = require('../controllers/Provider/updateProvider');
const deleteSmoothie = require('../controllers/Smoothie/deleteSmoothie');
const updateSmoothie = require('../controllers/Smoothie/updateSmoothie');
const updateSale = require('../controllers/Sale/updateSale');
const deleteSale = require('../controllers/Sale/deleteSale');
const deleteInventoryPopsicle = require('../controllers/Popsicle/InventoryPopsicle/deleteInventoryPopsicle');
const updateInventoryPopsicle = require('../controllers/Popsicle/InventoryPopsicle/updateInventoryPopsicle');
const deletePopsicle = require('../controllers/Popsicle/NewPopsicle/deletePopsicle');
const updatePopsicle = require('../controllers/Popsicle/NewPopsicle/updatePopsicle');
const updateTypePopsicle = require('../controllers/Popsicle/TypePopsicle/updateTypePopsicle');
const deleteTypePopsicle = require('../controllers/Popsicle/TypePopsicle/deleteTypePopsicle');
const getStockMaterialsInventory = require('../controllers/Inventory/StockMateriaPrima/getStockMaterialsInventory');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// rutas de ingredientes
router.get('/ingredient/get_allingredient', getIngredient)
router.get('/ingredient/detail/:id', getIngredient)
router.delete('/ingredient/delete_ingredient/:id', deleteIngredient)
router.put('/ingredient/update_ingredient/:id', updateIngredient)
router.post('/ingredient/create_ingredient', createIngredient)

// rutas de proveedor
router.get('/provider/get_allproviders', getProvider)
router.delete('/provider/delete/:id', deleteProvider)
router.put('/provider/update/:id', updateProvider)
router.post('/provider/create_provider', createProvider)

// rutas de inventario
router.get('/inventory/get_inventory', getMaterialsInventory)
router.delete('/inventory/delete/:id', deleteMaterialsInventory)
router.put('/inventory/update/:id', updateMaterialsInventory)
router.post('/inventory/create_entry', RawMaterialsInventory)

// rutas de receta
router.get('/recipe/get_recipe', getRecipe)
router.get('/recipe/detail/:id', getRecipe)
router.delete('/recipe/delete/:id', deleteRecipe)
router.put('/recipe/update/:id', updateRecipe)
router.post('/recipe/create_recipe', createRecipe)

// rutas de batido
router.get('/smoothie/get_smoothie', getSmoothie)
router.delete('/smoothie/delete/:id', deleteSmoothie)
router.put('/smoothie/update/:id', updateSmoothie)
router.post('/smoothie/create_smoothie', createSmoothie)

// rutas de tipos paletas
router.get('/popsicle/get_type_popsicle', getTypePopsicle)
router.put('/popsicletype/update/:id', updateTypePopsicle)
router.delete('/popsicletype/delete/:id', deleteTypePopsicle)
router.post('/popsicle/create_type_popsicle', createTypePopsicle)

// rutas nuevas paletas
router.get('/popsicle/get_popsicle', getNewPopsicle)
router.post('/popsicle/create_popsicle', createNewPopsicle)
router.delete('/popsicle/delete/:id', deletePopsicle)
router.put('/popsicle/update/:id', updatePopsicle)

// rutas inventario de paletas
router.get('/inventory_popsicle/get_inventory', getInventoryPopsicle)
router.delete('/inventory_popsicle/delete/:id', deleteInventoryPopsicle)
router.put('/inventory_popsicle/update/:id', updateInventoryPopsicle)
router.post('/inventory_popsicle/create_entry', createInventoryPopsicle)

// rutas cliente
router.get('/client/get_allclients', getAllClient)
router.post('/client/create_new_client', createClient)
router.delete('/client/delete_client/:id', deleteCliente)
router.put('/client/update_client/:id', updateCliente)

// rutas de ventas
router.get('/sale/get_allsales', getSales)
router.put('/sale/update/:id', updateSale)
router.delete('/sale/delete/:id', deleteSale)
router.post('/sale/create_sale', createSale)

// rutas de user
router.get('/user/get_alluser', getAllUser)
router.post('/user/create_user', createUser)

// rutas de auth
router.post('/auth/signin', auth)

// rutas del stock
router.get('/stock/get_allstock', getStockMaterialsInventory)

// rutas de devolucion
router.get('/restore/get_restore', getRestore)
router.post('/restore/create_restore', createRestore)

module.exports = router;
