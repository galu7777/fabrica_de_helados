import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSmoothies, getTypePopsicle, getPopsicle, createInventoryPopsicle } from "../../../redux/actions/actions";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function CreateInvPopsicles() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const [selectedSmoothie, setSelectedSmoothie] = useState("");
  const [selectedPopsicle, setSelectedPopsicle] = useState("");
  const smoothie = useSelector((state) => state.smoothies);
  const popsicles = useSelector((state) => state.popsicles);
  const dataSmoo = smoothie.data;
  const dataPopsicles = popsicles.data;

  useEffect(() => {
    dispatch(getSmoothies());
    dispatch(getTypePopsicle());
    dispatch(getPopsicle());
  }, [dispatch]);


  const handlePopsicleSelect = (event, value) => {
    setSelectedPopsicle(value);
  };

  const handleSmooSelect = (event, value) => {
    setSelectedSmoothie(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedPopsicle.id);
    console.log(selectedSmoothie.id);
    if (
      !selectedSmoothie ||
      !selectedPopsicle
    ) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, Seleccione todos los campos",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar este Inventario ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Registro Exitoso!", "", "success");
          dispatch(
            createInventoryPopsicle({
              id_batida: selectedSmoothie.id,
              id_paleta: selectedPopsicle.id,
            })
          );
          navigate("/InventarioPaletas");
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };

    return (
      <div
        className="bg-cover bg-center h-screen select-none "
        style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
      >
        <div className="w-full flex flex-col items-center select-none py-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
            <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
              Agregar Inventario de Paleta
            </div>
          </div>
        </div>
        <div className="mt-8 justify-center flex">
          <form
            onSubmit={handleSubmit}
            className="w-2/4 p-8 bg-white rounded-lg shadow-2xl"
          >
            <div className=" -mx-3 mb-6 py-10">
              <div className="w-full px-3 mb-10">
                <div className="w-full mr-4">
                  {dataSmoo && (
                    <Autocomplete
                      options={dataSmoo}
                      fullWidth
                      getOptionLabel={(option) => option.Recipe.nombre}
                      getOptionSelected={(option) => option.Recipe.nombre} // Usar la misma función para obtener y seleccionar la opción
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione un Batido"
                          variant="outlined"
                          required
                        />
                      )}
                      onChange={handleSmooSelect}
                    />
                  )}
                </div>
              </div>
              <div className="w-full px-3 mb-10">
                {dataPopsicles && ( // Verificación de nulidad para data
                  <Autocomplete
                    options={dataPopsicles}
                    fullWidth
                    getOptionLabel={(option) => option.nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Seleccione una Paleta"
                        variant="outlined"
                        required
                      />
                    )}
                    onChange={handlePopsicleSelect}
                  />
                )}
              </div>
            </div>

            <Button color="error" variant="outlined" fullWidth type="submit">
              Aceptar
            </Button>
          </form>
        </div>
      </div>
    );
}
