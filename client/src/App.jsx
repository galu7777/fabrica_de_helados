import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar/NavBar";
import Home from "./views/Home/Home";
import Ingredient from "./views/Ingredient/Ingredient";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

