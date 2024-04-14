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


  const metodo = [
    "SALIDA POR PUBLICIDAD",
    "SALIDA POR DERRETIDAS",
    "SALIDA POR REGALADAS",
    "SALIDA POR DUEÑO",
    "OTRO",
  ];
export default function SalidaPaletas() {
  const dispatch = useDispatch();

  const refrescarPagina = () => {
    window.location.reload();
  };

  const [cantidad, setCantidad] = useState("");

  const [selectedPopsicle, setSelectedPopsicle] = useState("");

  const [descripcion, setDescripcion] = useState("");


  const popsicles = useSelector((state) => state.popsicles);

  const dataPopsicles = popsicles.data;


 const [value, setValue] = useState(metodo[0]);
 const [tipo, setTipo] = useState("");



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

    if (!selectedPopsicle || !cantidad || !tipo) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, Seleccione todos los campos",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar esta Salida al Stock paleta ?",
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
                tipo: tipo,
                descripcion,
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
              text: "No se pudo Registar la salida de Paletas",
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
    <div
      className="bg-cover bg-center h-screen select-none "
      style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="w-full flex flex-col items-center select-none py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
          <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
            Salida de Paletas
          </div>
        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <form
          onSubmit={handleSubmit}
          className="w-2/4 p-8 bg-white rounded-lg shadow-2xl"
        >
          <div className="justify-center mb-5">
            <div className="flex-grow py-5">
              {dataPopsicles && (
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

            <div className="flex-grow py-5">
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={tipo}
                onInputChange={(event, newInputValue) => {
                  setTipo(newInputValue);
                }}
                id="controllable-states-demo"
                options={metodo}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Seleone un Motivo" />
                )}
              />
            </div>
          </div>
          <div className="w-full mt-5">
            <TextField
              required
              fullWidth
              type="text"
              label="Cantidad"
              variant="outlined"
              value={cantidad}
              onChange={handleChange}
            />
          </div>
          <div className="w-full mt-10 mb-10">
            <TextField
              id="outlined-multiline-static"
              label="Descipcion del motivo (Opcional)"
              multiline
              rows={4}
              fullWidth
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <Button color="error" variant="outlined" fullWidth type="submit">
            Aceptar
          </Button>
        </form>
      </div>
    </div>
  );
}

