import {
    ADD_INGREDIENT,
    GET_INGREDIENTS,
    ADD_RECIPE,
    GET_RECIPES,
    REGISTER,
    SIGNIN
} from "../actions/actionsTypes"

const initialState = {
    ingredients: {},
    newIngredient: {},
    recipes: {},
    newRecipe: {},
    user: {},
    newUser: {}
}

export const reducer = (state = initialState, {type,payload} ) => {
    switch (type) {
        case REGISTER: {
            return {
                ...state,
                newUser: payload
            }            
        }

        case SIGNIN: {
            return {
                ...state,
                user: payload
            }            
        }

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
        case GET_RECIPES: {
            return {
                ...state,
                recipes: payload
            }
        }

        case ADD_RECIPE: {
            return {
                ...state,
                newRecipe: payload
            }
        }

        default:
            return {
                ...state
            }
    }
}
