import {
    ADD_INGREDIENT,
    GET_INGREDIENTS,
    ADD_RECIPE,
    GET_RECIPES,
    GET_PROVIDERS,
    ADD_PROVIDER,
    ADD_INVENTORY,
    GET_INVENTORY,
    ADD_SMOOTHIE,
    GET_SMOOTHIES,
    ADD_CUSTOMER,
    GET_CUSTOMERS,
} from "./actionsTypes"
// import { getIngredientsApi } from "../../api";
import axios from 'axios'

export const getIngredients = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:3001/ingredient/get_allingredient')
        console.log(data)
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
        console.log(data)
        dispatch({
            type: ADD_INGREDIENT,
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

export const createRecipe = (nombre, ingredientes) => async (dispatch) => {
    try {

        const { data } = await axios.post('http://localhost:3001/recipe/create_recipe', nombre, ingredientes)
        dispatch({
            type: ADD_RECIPE,
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
