import { useEffect, useState } from "react";
import { getRecipes, createSmoothie } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
export default function CreateSmoothie() {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const { data } = recipes;
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
  console.log(selectedRecipe);
  const handleSubmit = (e) => {
    e.preventDefault();

    if ( (selectedRecipe === "")) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, ingresa un nombre de Batido válido.",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar este Batido ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Registro Exitoso!", "", "success");
          dispatch(
            createSmoothie({
              id_receta: selectedRecipe,
            })
          );
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };
  return (
    <div className="select-none w-full flex flex-col items-center">
      <div className="bg-white rounded-md shadow-md w-96">
        <div className="text-center text-2xl font-bold mb-4 text-[#9b1028] p-1">
          Agregar Mercancia
        </div>
      </div>
      <div className="flex justify-center  h-full w-full">
        <form
          onSubmit={handleSubmit}
          className="w-1/4 p-8 bg-white rounded-lg shadow-2xl"
        >
          <div className=" -mx-3 mb-6 py-10">
            <div className="w-full px-3">
              <div className="w-full mr-4">
                <InputLabel id="demo-simple-select-helper-label">
                  Seleccione una Receta
                </InputLabel>
                <Select
                  labelId="ingredient-select-label"
                  id="ingredient-select"
                  value={selectedRecipe}
                  onChange={(e) => setSelectedRecipe(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="">Seleccione un Batido</MenuItem>
                  {data &&
                    data.map((ingredient) => (
                      <MenuItem key={ingredient.id} value={ingredient.id}>
                        {ingredient.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
}
