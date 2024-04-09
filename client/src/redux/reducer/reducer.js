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
    ADD_PROVIDER,
    GET_PROVIDERS,
    EDIT_PROVIDER,
    DELETE_PROVIDER,
    DETAIL_PROVIDER,
    GET_INVENTORY,
    ADD_INVENTORY,
    GET_SMOOTHIES,
    ADD_SMOOTHIE,
    GET_CUSTOMERS,
    ADD_CUSTOMER,
    EDIT_CUSTOMER,
    DETAIL_CUSTOMER,
    DELETE_CUSTOMER,
    GET_TYPE_POPSICLE,
    ADD_TYPE_POPSICLE,
    ADD_POPSICLE,
    GET_POPSICLE,
    ADD_INVENTORY_POPSICLE,
    GET_INVENTORY_POPSICLE,
    REGISTER,
    SIGNIN,
    DETAIL_USER,
    EDIT_USER,
    GET_USER,
    GET_SALES,
    ADD__SALE,
    DETAIL_SALE,
    GET_STOCK_MP,
    GET_STOCK_POPSICLES

} from "../actions/actionsTypes"

const initialState = {
    ingredients: {},
    newIngredient: {},
    ingredientDetail: {},
    recipes: {},
    newRecipe: {},
    recipeDetail: {},
    providers: {},
    newProvider:{},
    providerDetail: {},
    inventory:{},
    newInventory:{},
    smoothies: {},
    newSmoothie: {},
    customers: {},
    newCustomers: {},
    customerDetail: {},
    newTypePopsicles: {},
    typePopsicles: {},
    newPopsicles: {},
    popsicles: {},
    inventoryPopsicle: {},
    newinventoryPopsicles: {},
    user: {},
    userList: {},
    newUser: {},
    userDetail: {},
    sales: {},
    newsale: {},
    detailsale: {},
    stockMP: {},
    stockPop: {},
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

        case GET_USER: {
            return {
                ...state,
                userList: payload
            }
        }

        case EDIT_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    [payload.id]: payload,
                },
            };
        }

        case DETAIL_USER:
            return {
                ...state,
                userDetail: payload,

            };

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

        case EDIT_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [payload.id]: payload,
                },
            };
        }
        case DETAIL_INGREDIENTS:
            return {
                ...state,
                ingredientDetail: payload,

            };

        case DELETE_INGREDIENTS: {
            const { [payload.id]: _, ...remainingIngredients } = state.ingredients;
            return {
                ...state,
                ingredients: remainingIngredients,
                error: null,
            };
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

        case EDIT_RECIPES: {
            return {
                ...state,
                recipes: {
                    ...state.ingredients,
                    [payload.id]: payload,
                },
            };
        }
        case DETAIL_RECIPES:
            return {
                ...state,
                recipeDetail: payload,

            };
        case DELETE_RECIPES: {
            const { [payload.id]: _, ...remainingRecipes } = state.ingredients;
            return {
                ...state,
                recipes: remainingRecipes,
                error: null,
            };
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


        case EDIT_PROVIDER: {
            return {
                ...state,
                providers: {
                    ...state.ingredients,
                    [payload.id]: payload,
                },
            };
        }
        case DETAIL_PROVIDER:
            return {
                ...state,
                providerDetail: payload,

            };
        case DELETE_PROVIDER: {
            const { [payload.id]: _, ...remainProvider } = state.providers;
            return {
                ...state,
                providers: remainProvider,
                error: null,
            };
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


        case EDIT_CUSTOMER: {
            return {
                ...state,
                customers: {
                    ...state.customers,
                    [payload.id]: payload,
                },
            };
        }
        case DETAIL_CUSTOMER:
            return {
                ...state,
                customerDetail: payload,

            };
        case DELETE_CUSTOMER: {
            const { [payload.id]: _, ...remainingcustomers } = state.customers;
            return {
                ...state,
                customers: remainingcustomers,
                error: null,
            };
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

        case DETAIL_SALE:
            return {
                ...state,
                detailsale: payload,

            };
        case GET_STOCK_MP: {
            return {
                ...state,
                stockMP: payload
            }
        }
        case GET_STOCK_POPSICLES: {
            return {
                ...state,
                stockPop: payload
            }
        }

        default:
            return {
                ...state
            }
    }
}
