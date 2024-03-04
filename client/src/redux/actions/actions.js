import { 
    ADD_INGREDIENT, 
    GET_INGREDIENTS 
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
