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

export default function CreateInventory() {
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("");
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const providers = useSelector((state) => state.providers);
  const dataIng = ingredients.data;
  const dataProv = providers.data;
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getProviders());
  }, [dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIngredient || !selectedProvider || !cantidad || !unidad) {
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
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Registro Exitoso!", "", "success");
          dispatch(
            createInventory({
              cantidad: cantidad,
              tipo: type,
              IngredienteId: selectedIngredient,
              ProveedorId: selectedProvider,
              unidad_medida: unidad
            })
          );
           navigate("/Inventario");
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
                <InputLabel id="demo-simple-select-helper-label">
                  Seleccione un Ingrediente
                </InputLabel>
                <Select
                  labelId="ingredient-select-label"
                  id="ingredient-select"
                  required
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="">Seleccione un ingrediente</MenuItem>
                  {dataIng &&
                    dataIng.map((ingredient) => (
                      <MenuItem key={ingredient.id} value={ingredient.id}>
                        {ingredient.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            </div>
            <div className="w-full px-3 mb-10">
              <InputLabel id="demo-simple-select-helper-label">
                Seleccione un Proveedor
              </InputLabel>
              <Select
                required
                labelId="provider-select-label"
                id="provider-select"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="w-full"
              >
                <MenuItem value="">Seleccione un proveedor</MenuItem>
                {dataProv &&
                  dataProv.map((provider) => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.razon_social}
                    </MenuItem>
                  ))}
              </Select>
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
              <div className="w-2/4 mr-4 py-6">
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Cantidad"
                  variant="outlined"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>

              <div className="w-2/4 py-0.5">
                <InputLabel id="demo-simple-select-helper-label">
                  Seleccione una Unidad de medida
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={unidad}
                  fullWidth
                  onChange={(e) => setUnidad(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Seleccionar unidad</em>
                  </MenuItem>
                  <MenuItem value={"KG"}>KG</MenuItem>
                  <MenuItem value={"GR"}>GR</MenuItem>
                  <MenuItem value={"L"}>L</MenuItem>
                  <MenuItem value={"ML"}>ML</MenuItem>
                  <MenuItem value={"OZ"}>OZ</MenuItem>
                </Select>
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
