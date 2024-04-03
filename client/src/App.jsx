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
import Customers from "./views/Customer/Customers";
import CreateCustomers from "./views/Customer/CreateCustomers";
import TypePopsicle from "./views/Popsicle/TypePopsicle/TypePopsicle";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Popsicles from "./views/Popsicle/Popsicles/Popsicles";
import CreatePopsicles from "./views/Popsicle/Popsicles/CreatePopsicles";
import InventoryPopsicles from "./views/Popsicle/Inventory/InventoryPopsicles";
import CreateInvPopsicles from "./views/Popsicle/Inventory/CreateInvPopsicles";
import Sales from "./views/Sales/Sales.jsx";
import CreateSale from "./views/Sales/CreateSale";
import StockMateriaPrima from "./views/Stock/StockMateriaPrima";
import StockPopsicles from "./views/Stock/StockPopsicles";
import EditProvider from "./views/Provider/EditProvider";
import EditCustomers from "./views/Customer/EditCustomers";
import DetailSale from "./views/Sales/DetailSale";

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("usuario"));
 const rol = user.rol;
 console.log(rol);

  return (
    <div>
      {location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        !location.pathname.startsWith("/Venta/") && <NavBar />}
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ingredientes" element={<Ingredient />} />
        <Route path="/recetas" element={<Recipe />} />
        <Route path="/crear_receta" element={<CreateRecipe />} />
        <Route path="/proveedores" element={<Provider />} />
        <Route path="/Provider/:id" element={<EditProvider />} />
        <Route path="/crear_proveedore" element={<CreateProvider />} />
        <Route path="/Inventario" element={<Inventory />} />
        <Route path="/crear_inventario" element={<CreateInventory />} />
        <Route path="/batidos" element={<Smoothie />} />
        <Route path="/Clientes" element={<Customers />} />
        <Route path="/crear_clientes" element={<CreateCustomers />} />
        <Route path="/Cliente/:id" element={<EditCustomers />} />
        <Route path="/TipoPaletas" element={<TypePopsicle />} />
        <Route path="/Paletas" element={<Popsicles />} />
        <Route path="/crear_paletas" element={<CreatePopsicles />} />
        <Route path="/InventarioPaletas" element={<InventoryPopsicles />} />
        <Route path="/create_inven_Paletas" element={<CreateInvPopsicles />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Ventas" element={<Sales />} />
        <Route path="/Venta/:id" element={<DetailSale />} />
        <Route path="/crear_ventas" element={<CreateSale />} />
        <Route path="/stock_mp" element={<StockMateriaPrima />} />
        <Route path="/stock_popsicle" element={<StockPopsicles />} />
      </Routes>
    </div>
  );
}

export default App;
