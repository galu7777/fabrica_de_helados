function createUrl({ base = "api", endpoint, path = "", backSlash = false }) {
    const str = `${base}/${endpoint}/${path}`;

    if (str.endsWith("/") & backSlash) {
        return str.replace(/\/$/, "");
    }

    return str;
}

export const Endpoints = {
    Ingredient: {
        GetIngredients: createUrl({ base: "ingredient", endpoint: "get_allingredients" }),
    },
    Recipe: {
        GetRecipes: createUrl({ base: "recipe", endpoint: "get_recipe" }),
    },
    Provider: {
        GetProviders: createUrl({ base: "provider", endpoint: "get_allproviders" }),
    },
    Inventory: {
        GetInventory: createUrl({ base: "inventory", endpoint: "get_inventory" }),
    },
    Smoothie: {
        GetSmoothies: createUrl({ base: "smoothie", endpoint: "get_smoothie" }),
    },
    Client: {
        GetClients: createUrl({ base: "client", endpoint: "get_allclients" }),
    },
    TypePopsicle: {
        GetTypePopsicle: createUrl({ base: "typePopsicle", endpoint: "get_type_popsicle" }),
    },
    Popsicle: {
        GetPopsicle: createUrl({ base: "popsicle", endpoint: "get_popsicle" }),
    },
    InventoryPopsicle: {
        GetInventoryPopsicle: createUrl({ base: "inventory_popsicle", endpoint: "get_inventoryPopsicle" }),
    },
    Sale: {
        GetSales: createUrl({ base: "sale", endpoint: "get_allsales" }),
    },
    StockMateriaPrima: {
        GetStockMateriaPrima: createUrl({ base: "stock", endpoint: "get_allstock" }),
    },
    StockPopsicle: {
        GetStockPopsicle: createUrl({ base: "stock", endpoint: "get_allstock_popsicle" }),
    },
}
