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
}
