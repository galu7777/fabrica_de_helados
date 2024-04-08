import { useEffect, useState } from "react";
import { getRecipes, createSmoothie } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import Swal from "sweetalert2";
import Button from "@mui/material/Button";

export default function CreateSmoothie() {

  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const { data } = recipes;
    const [selected, setSelected] = useState(null);
console.log(selected)
    const refrescarPagina = () => {
      window.location.reload();
    };
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected.name === "") {
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
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          try {
            Swal.fire("Registro Exitoso!", "", "success");
            await dispatch(
              createSmoothie({
                id_receta: selected.id,
              })
            );
            setTimeout(() => {
              refrescarPagina();
            }, "1000");
          } catch (error) {
            // Captura cualquier error que ocurra durante el envío de datos
            const { response } = error;
            Swal.fire({
              width: "40em",
              title: `${response.data.data}`,
              text: "No se pudo Realizar el Batido",
              icon: "error",
              showConfirmButton: true,


            });
          }

        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };
    const handleSelect = (event, value) => {
      setSelected(value);

    };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full ">
        <div className=" -mx-3 mb-6 ">
          <div className="w-full px-3">
            <div className="w-full mr-4">

              {data && ( // Verificación de nulidad para data
                <Autocomplete
                  options={data}
                  fullWidth
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buscar Receta"
                      variant="outlined"
                      required
                    />
                  )}
                  onChange={handleSelect}
                />
              )}
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
