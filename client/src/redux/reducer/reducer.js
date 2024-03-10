import {
    ADD_INGREDIENT,
    GET_INGREDIENTS,
    ADD_RECIPE,
    GET_RECIPES
} from "../actions/actionsTypes"

const initialState = {
    ingredients: {},
    newIngredient: {},
    recipes: {},
    newRecipe: {}
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
