import { useEffect, useState } from "react";
import { getRecipes, createSmoothie } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
export default function CreateSmoothie() {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const { data } = recipes;
    const refrescarPagina = () => {
      window.location.reload();
    };
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
           setTimeout(() => {
             refrescarPagina();
           }, "1000");

        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full ">
        <div className=" -mx-3 mb-6 ">
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

        <Button color="error" variant="outlined" fullWidth type="submit">
          Aceptar
        </Button>
      </form>
    </>
  );
}
