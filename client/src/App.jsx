import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/Navbar/NavBar";
import Home from "./views/Home/Home";
import Ingredient from "./views/Ingredient/Ingredient";
import Recipe from "./views/Recipe/Recipe";
import CreateRecipe from "./views/Recipe/CreateRecipe";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

function App() {
  const location = useLocation();
  
  return (
      <div>
        { 
          location.pathname !== "/register" && location.pathname !== "/login" && <NavBar />
        }
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ingredientes" element={<Ingredient />} />
          <Route path="/receta" element={<Recipe />} />
          <Route path="/crear_receta" element={<CreateRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
  );
}

export default App;
