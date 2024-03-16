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
    ADD_CUSTOMER,
    GET_TYPE_POPSICLE,
    ADD_TYPE_POPSICLE,
    ADD_POPSICLE,
    GET_POPSICLE,
    ADD_INVENTORY_POPSICLE,
    GET_INVENTORY_POPSICLE,
    REGISTER,
    SIGNIN,
    GET_SALES,
    ADD__SALE

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
    newCustomers: {},
    newTypePopsicles: {},
    typePopsicles: {},
    newPopsicles: {},
    popsicles: {},
    inventoryPopsicle: {},
    newinventoryPopsicles: {},
    user: {},
    newUser: {},
    sales: {},
    newsale: {}
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

        case GET_TYPE_POPSICLE: {
            return {
                ...state,
                typePopsicles: payload
            }
        }

        case ADD_TYPE_POPSICLE: {
            return {
                ...state,
                newTypePopsicles: payload
            }
        }

        case GET_POPSICLE: {
            return {
                ...state,
                popsicles: payload
            }
        }

        case ADD_POPSICLE: {
            return {
                ...state,
                newPopsicles: payload
            }
        }

        case ADD_INVENTORY_POPSICLE: {
            return {
                ...state,
                newinventoryPopsicles: payload
            }
        }

        case GET_INVENTORY_POPSICLE: {
            return {
                ...state,
                inventoryPopsicle: payload
            }
        }
        case ADD__SALE: {
            return {
                ...state,
                newsale: payload
            }
        }

        case GET_SALES: {
            return {
                ...state,
                sales: payload
            }
        }


        default:
            return {
                ...state
            }
    }
}
