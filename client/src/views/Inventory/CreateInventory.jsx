import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredients,
  getProviders,
  createInventory,
} from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

export default function CreateInventory() {
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [type, setType] = useState("ENTREGA");
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState("");
  const [selectedUnidadIngred, setSelectedUnidadIngred] = useState(null);
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const providers = useSelector((state) => state.providers);
  const dataIng = ingredients.data;
  const dataProv = providers.data;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getProviders());
  }, [dispatch]);

  const handleIngredSelect = (event, value) => {
    setSelectedIngredient(value);
    setSelectedUnidadIngred(value.unidad_medida); // Establecer la unidad de medida
  };

  const handleProviderSelect = (event, value) => {
    setSelectedProvider(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!cantidad) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, Seleccione todos los campos",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar esta Mercancia ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then(async (result) => {

        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          try {
             await dispatch(
               createInventory({
                 cantidad: Number(cantidad),
                 tipo: type,
                 IngredienteId: selectedIngredient.id,
                 ProveedorId: selectedProvider.id,
               })
             );
             Swal.fire("Registro Exitoso!", "", "success");

             navigate("/Inventario");
          } catch (error) {
            // Captura cualquier error que ocurra durante el envío de datos
            const { response } = error;
            Swal.fire({
              width: "20em",
              title: `${response.data.data}`,
              text: "No se pudo Guardar la Receta",
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
            Agregar Mercancia
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
                {dataIng && ( // Verificación de nulidad para data
                  <Autocomplete
                    options={dataIng}
                    fullWidth
                    getOptionLabel={(option) => option.nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscar Productos"
                        variant="outlined"
                        required
                      />
                    )}
                    onChange={handleIngredSelect}
                  />
                )}
              </div>
            </div>
            <div className="w-full px-3 mb-10">
              {dataProv && ( // Verificación de nulidad para data
                <Autocomplete
                  options={dataProv.slice(1)}
                  fullWidth
                  getOptionLabel={(option) => option.razon_social}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buscar Proveedor"
                      variant="outlined"
                      required
                    />
                  )}
                  onChange={handleProviderSelect}
                />
              )}
            </div>
            <div className="w-full px-3 mb-10">
              <InputLabel id="demo-simple-select-helper-label">
                Seleccione un tipo
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                fullWidth
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value={"ENTREGA"}>ENTREGA</MenuItem>
                <MenuItem value={"SALIDA"}>SALIDA</MenuItem>
              </Select>
            </div>
            <div className="w-full px-3 flex">
              <div className="w-full mr-4 py-6">
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Cantidad"
                  variant="outlined"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {selectedUnidadIngred ? selectedUnidadIngred : ""}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
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
