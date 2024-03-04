import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "../reducer/reducer";
import thunkMiddleware from "redux-thunk";

// Corrige el nombre de la extensión de Redux DevTools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;
