import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, getProviders, createInventory } from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function CreateInventory() {
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [type, setType] = useState("");
  const [cantidad, setCantidad] = useState("");
  console.log(type)
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const providers = useSelector((state) => state.providers);
  const dataIng = ingredients.data;
  const dataProv = providers.data;
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getProviders());
  }, [dispatch]);

  console.log(selectedIngredient);
  console.log(selectedProvider);
  console.log(cantidad)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cantidad)
    if (!type.trim() || !isNaN(type)) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, ingresa un nombre de ingrediente válido.",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar este Ingrediente ?",
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
            <div className="w-full px-3">
              <TextField
                fullWidth
                type="number"
                label="Cantidad"
                variant="outlined"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
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
