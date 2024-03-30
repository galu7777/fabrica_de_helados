import {
    ADD_INGREDIENT,
    GET_INGREDIENTS,
    EDIT_INGREDIENTS,
    DELETE_INGREDIENTS,
    DETAIL_INGREDIENTS,
    ADD_RECIPE,
    GET_RECIPES,
    EDIT_RECIPES,
    DELETE_RECIPES,
    DETAIL_RECIPES,
    GET_PROVIDERS,
    ADD_PROVIDER,
    EDIT_PROVIDER,
    DELETE_PROVIDER,
    DETAIL_PROVIDER,
    ADD_INVENTORY,
    GET_INVENTORY,
    ADD_SMOOTHIE,
    GET_SMOOTHIES,
    ADD_CUSTOMER,
    GET_CUSTOMERS,
    EDIT_CUSTOMER,
    DETAIL_CUSTOMER,
    DELETE_CUSTOMER,
    REGISTER,
    SIGNIN,
    ADD_TYPE_POPSICLE,
    GET_TYPE_POPSICLE,
    ADD_POPSICLE,
    GET_POPSICLE,
    ADD_INVENTORY_POPSICLE,
    GET_INVENTORY_POPSICLE,
    GET_SALES,
    ADD__SALE,
    GET_STOCK_MP,
    GET_STOCK_POPSICLES

} from "./actionsTypes"
// import { getIngredientsApi } from "../../api";
import axios from 'axios'

export const registerNewUser = (newUser) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:3001/user/create_user', newUser)
        console.log(data)
        dispatch({
            type: REGISTER,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const signin = (user) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:3001/auth/signin', user)
        console.log(data)
        dispatch({
            type: SIGNIN,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const getIngredients = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/ingredient/get_allingredient')

        dispatch({
            type: GET_INGREDIENTS,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createIngredient = (nombre) => async (dispatch) => {
    try {
        const name = { nombre }
        const { data } = await axios.post('http://localhost:3001/ingredient/create_ingredient', name)
        dispatch({
            type: ADD_INGREDIENT,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const editIngredient = (ingredientId,nombre) => async (dispatch) => {
    console.log(ingredientId)
    try {

        const { data } = await axios.put(`http://localhost:3001/ingredient/update_ingredient/${ingredientId}`, nombre)


        dispatch({
            type: EDIT_INGREDIENTS,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const detailIngredient = (ingredientId, nombre) => async (dispatch) => {
    try {
        const name = { nombre }
        const { data } = await axios.get(`http://localhost:3001/ingredient/detail/${ingredientId}`, name)

        dispatch({
            type: DETAIL_INGREDIENTS,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}


export const deleteIngredient = (id) => async (dispatch) => {
    try {

        const { data } = await axios.delete(`http://localhost:3001/ingredient/delete_ingredient/${id}`)
        console.log(data)
        dispatch({
            type: DELETE_INGREDIENTS,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const getRecipes = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/recipe/get_recipe')
        console.log(data)
        dispatch({
            type: GET_RECIPES,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createRecipe = (nombre) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:3001/recipe/create_recipe', nombre)
        dispatch({
            type: ADD_RECIPE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const editRecipe = (id, nombre) => async (dispatch) => {

    try {

        const { data } = await axios.put(`http://localhost:3001/recipe/update/${id}`, nombre)

        dispatch({
            type: EDIT_RECIPES,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const detailRecipe = (id, nombre) => async (dispatch) => {
    console.log(id)
    try {
        const name = { nombre }
        const { data } = await axios.get(`http://localhost:3001/recipe/detail/${id}`, name)
        console.log(data)
        dispatch({
            type: DETAIL_RECIPES,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}


export const deleteRecipe = (id) => async (dispatch) => {
    try {

        const { data } = await axios.delete(`http://localhost:3001/recipe/delete/${id}`)
        console.log(data)
        dispatch({
            type: DELETE_RECIPES,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const getProviders = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/provider/get_allproviders')

        dispatch({
            type: GET_PROVIDERS,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createProvider = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/provider/create_provider', nombre)
        dispatch({
            type: ADD_PROVIDER,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}



export const editProvider = (id, nombre) => async (dispatch) => {

    try {

        const { data } = await axios.put(`http://localhost:3001/provider/update/${id}`, nombre)


        dispatch({
            type: EDIT_PROVIDER,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const detailProvider = (ingredientId, nombre) => async (dispatch) => {
    try {
        const name = { nombre }
        const { data } = await axios.get(`http://localhost:3001/provider/detail/${ingredientId}`, name)

        dispatch({
            type: DETAIL_PROVIDER,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}


export const deleteProvider = (id) => async (dispatch) => {
    try {

        const { data } = await axios.delete(`http://localhost:3001/provider/delete/${id}`)
        console.log(data)
        dispatch({
            type: DELETE_PROVIDER,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}


export const getInventory = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/inventory/get_inventory')

        dispatch({
            type: GET_INVENTORY,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createInventory = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/inventory/create_entry', nombre)
        dispatch({
            type: ADD_INVENTORY,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const getSmoothies = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/smoothie/get_smoothie')

        dispatch({
            type: GET_SMOOTHIES,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createSmoothie = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/smoothie/create_smoothie', nombre)
        dispatch({
            type: ADD_SMOOTHIE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const getCustomers = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/client/get_allclients')

        dispatch({
            type: GET_CUSTOMERS,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const detailCustomers = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:3001/client/detail/${id}`)

        dispatch({
            type: DETAIL_CUSTOMER,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.data.data)
        throw error
    }
}

export const editCustomers = (id, datos) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/client/update_client/${id}`, datos)

        dispatch({
            type: EDIT_CUSTOMER,    
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.data.data)
        throw error
    }
}

export const deleteCustomers = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:3001/client/delete_client/${id}`)

        dispatch({
            type: DELETE_CUSTOMER,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.data.data)
        throw error
    }
}


export const createCustomer = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/client/create_new_client   ', nombre)
        dispatch({
            type: ADD_CUSTOMER,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const getTypePopsicle = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/popsicle/get_type_popsicle')

        dispatch({
            type: GET_TYPE_POPSICLE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createTypePopsicle = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/popsicle/create_type_popsicle', nombre)
        dispatch({
            type: ADD_TYPE_POPSICLE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}


export const getPopsicle = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/popsicle/get_popsicle')

        dispatch({
            type: GET_POPSICLE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createPopsicle = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/popsicle/create_popsicle', nombre)
        dispatch({
            type: ADD_POPSICLE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const getInventoryPopsicle = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/inventory_popsicle/get_inventory')

        dispatch({
            type: GET_INVENTORY_POPSICLE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createInventoryPopsicle = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/inventory_popsicle/create_entry', nombre)
        dispatch({
            type: ADD_INVENTORY_POPSICLE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const getsales = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/sale/get_allsales')

        dispatch({
            type: GET_SALES,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}

export const createSales = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/sale/create_sale', nombre)
        dispatch({
            type: ADD__SALE,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}


export const getStockMateriaPrima = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.get('http://localhost:3001/stock/get_allstock', nombre)
        dispatch({
            type: GET_STOCK_MP,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}


export const getStockPopsicle = (nombre) => async (dispatch) => {
    try {

        const { data } = await axios.get('http://localhost:3001/stock/get_allstock_popsicle', nombre)
        dispatch({
            type: GET_STOCK_POPSICLES,
            payload: data,
        });
    } catch (error) {
        console.log('Error: ', error.message)
        throw error
    }
}
