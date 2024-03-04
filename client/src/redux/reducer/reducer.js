import { 
    ADD_INGREDIENT,
    GET_INGREDIENTS
} from "../actions/actionsTypes" 

const initialState = {
    ingredients: {},
    newIngredient: {}
}

export const reducer = (state = initialState, {type,payload} ) => {
    switch (type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredients: payload
            }
        }

        case ADD_INGREDIENT: {
            return {
                ...state,
                newIngredient: payload
            }
        }

        default:
            return {
                ...state
            }
    }
}