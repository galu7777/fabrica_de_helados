import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopsicle,
  createStorePopsicle,
} from "../../../redux/actions/actions";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { validationNumber } from "../../../validations/validationNumber";
import { validatedValue } from "../../../validations/validatedValue ";

export default function CreateStore() {
  const dispatch = useDispatch();

  const refrescarPagina = () => {
    window.location.reload();
  };
  
  const [cantidad, setCantidad] = useState("");

  const [selectedPopsicle, setSelectedPopsicle] = useState("");

  const popsicles = useSelector((state) => state.popsicles);

  const dataPopsicles = popsicles.data;

  useEffect(() => {
    dispatch(getPopsicle());
  }, [dispatch]);

  const handlePopsicleSelect = (event, value) => {
    setSelectedPopsicle(value);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    // Si el valor no es un número, actualizamos el estado con el valor validado
    if (!validationNumber(value)) {
      setCantidad(validatedValue(value));
    } else {
      setCantidad(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPopsicle || !cantidad) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, Seleccione todos los campos",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar esta paleta al almacen ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          try {
            Swal.fire("Registro Exitoso!", "", "success");
            await dispatch(
              createStorePopsicle({
                id_paleta: selectedPopsicle.id,
                cantidad: Number(cantidad),
              })
            );
            setTimeout(() => {
              refrescarPagina();
            }, 1000);
          } catch (error) {
            // Captura cualquier error que ocurra durante el envío de datos

            console.log(error.response.data.data.message);
            Swal.fire({
              width: "20em",
              title: `${error.response.data.data.message}`,
              text: "No se pudo Registar al inventario de Paletas",
              icon: "error",
              showConfirmButton: false,
              timer: 4000,
            });
          }
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mt-8 justify-center flex">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-between mb-5">
            <div className="flex-grow mr-2 py-1">
              {dataPopsicles && (
                <Autocomplete
                  options={dataPopsicles}
                  fullWidth
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Seleccione una Paleta"
                      variant="standard"
                      required
                    />
                  )}
                  onChange={handlePopsicleSelect}
                />
              )}
            </div>
            <div className="w-2/4 mt-1">
              <TextField
                required
                fullWidth
                type="text"
                label="Cantidad"
                variant="standard"
                value={cantidad}
                onChange={handleChange}
              />
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
