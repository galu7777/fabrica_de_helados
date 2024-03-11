import {
    ADD_INGREDIENT,
    GET_INGREDIENTS,
    ADD_RECIPE,
    GET_RECIPES,
    REGISTER,
    SIGNIN,
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
