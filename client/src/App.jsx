import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/Navbar/NavBar";
import Home from "./views/Home/Home";
import Ingredient from "./views/Ingredient/Ingredient";
import Recipe from "./views/Recipe/Recipe";
import CreateRecipe from "./views/Recipe/CreateRecipe";
import Provider from "./views/Provider/Provider";
import CreateProvider from "./views/Provider/CreateProvider";
import Inventory from "./views/Inventory/Inventory";
import CreateInventory from "./views/Inventory/CreateInventory";
import Smoothie from "./views/Smoothie/Smoothie";
import CreateSmoothie from "./views/Smoothie/CreateSmoothie";
import Customers from "./views/Customer/Customers";
import CreateCustomers from "./views/Customer/CreateCustomers";
import TypePopsicle from "./views/Popsicle/TypePopsicle/TypePopsicle";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <NavBar />
      )}
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ingredientes" element={<Ingredient />} />
        <Route path="/recetas" element={<Recipe />} />
        <Route path="/crear_receta" element={<CreateRecipe />} />
        <Route path="/proveedores" element={<Provider />} />
        <Route path="/crear_proveedore" element={<CreateProvider />} />
        <Route path="/Inventario" element={<Inventory />} />
        <Route path="/crear_inventario" element={<CreateInventory />} />
        <Route path="/batidos" element={<Smoothie />} />
        <Route path="/crear_smoothie" element={<CreateSmoothie />} />
        <Route path="/Clientes" element={<Customers />} />
        <Route path="/crear_clientes" element={<CreateCustomers />} />
        <Route path="/TipoPaletas" element={<TypePopsicle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
