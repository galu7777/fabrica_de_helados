import {
    ADD_INGREDIENT,
    GET_INGREDIENTS,
    ADD_RECIPE,
    GET_RECIPES,
    ADD_PROVIDER,
    GET_PROVIDERS,
    GET_INVENTORY,
    ADD_INVENTORY,
    GET_SMOOTHIES,
    ADD_SMOOTHIE,
    GET_CUSTOMERS,
    ADD_CUSTOMER
} from "../actions/actionsTypes"

const initialState = {
    ingredients: {},
    newIngredient: {},
    recipes: {},
    newRecipe: {},
    providers: {},
    newProvider:{},
    inventory:{},
    newInventory:{},
    smoothies: {},
    newSmoothie: {},
    customers: {},
    newCustomers: {}
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

        case GET_PROVIDERS: {
            return {
                ...state,
                providers: payload
            }
        }

        case ADD_PROVIDER: {
            return {
                ...state,
                newProvider: payload
            }
        }
        case GET_INVENTORY: {
            return {
                ...state,
                inventory: payload
            }
        }

        case ADD_INVENTORY: {
            return {
                ...state,
                newInventory: payload
            }
        }

        case GET_SMOOTHIES: {
            return {
                ...state,
                smoothies: payload
            }
        }

        case ADD_SMOOTHIE: {
            return {
                ...state,
                newSmoothie: payload
            }
        }
        case GET_CUSTOMERS: {
            return {
                ...state,
                customers: payload
            }
        }

        case ADD_CUSTOMER: {
            return {
                ...state,
                newCustomers: payload
            }
        }

        default:
            return {
                ...state
            }
    }
}
