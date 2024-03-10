import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar/NavBar";
import Home from "./views/Home/Home";
import Ingredient from "./views/Ingredient/Ingredient";
import Recipe from "./views/Recipe/Recipe";
import CreateRecipe from "./views/Recipe/CreateRecipe";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ingredientes" element={<Ingredient />} />
          <Route path="/receta" element={<Recipe />} />
          <Route path="/crear_receta" element={<CreateRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

