import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableRecipe from "./TableRecipe";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  createRecipe,
  getIngredients,
  getPopsicle,
} from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popsicles = useSelector((state) => state.popsicles);
  const dataPopsicles = popsicles.data;
  const [selectedPopsicle, setSelectedPopsicle] = useState("");

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getPopsicle());
  }, [dispatch]);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSelectedIngredientsChange = (ingredients) => {
    setSelectedIngredients(ingredients);
  };

  const [form, setForm] = useState({
    nombre: "",
  });
  // nombre de la receta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Obtener solo los ingredientes seleccionados
    const selectedIngredientesIds = selectedIngredients
      .filter((ingredient) => ingredient.selected)
      .map((ingredient) => ({
        id: ingredient.id,
        cantidad: ingredient.cantidad || 0,
      }));

    const nombre = form.nombre.toUpperCase();
    const dataTransformada = {
      nombre,
      id_paleta: selectedPopsicle.id,
      ingredientes: selectedIngredientesIds,
    };


    // Verificar si form.cantidad y form.medida están definidos antes de llamar a trim()
    if (
      !nombre ||
      !nombre.trim() ||
      !selectedPopsicle.id ||
      !selectedIngredientesIds ||
      !selectedIngredientesIds.length ||
      selectedIngredientesIds.some((ingrediente) => !ingrediente.cantidad)
    ) {
      Swal.fire({
        title: "Verifica la información.",
        text: "Por favor, completa todos los campos.",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "¿Quieres registrar esta receta?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then(async(result) => {
        if (result.isConfirmed) {

          try {
            await dispatch(createRecipe(dataTransformada));
            Swal.fire("Registro Exitoso!", "", "success");

            navigate("/Recetas");
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
      <div className="flex flex-col items-center py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
          <h2 className="text-2xl text-center font-bold mb-6 text-red-700">
            Crea una Nueva Receta
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
              <div className="flex-grow mr-2 py-1">
                <TextField
                  fullWidth
                  type="text"
                  name="nombre"
                  required
                  label="Nombre de la receta"
                  variant="standard"
                  value={form.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="w-2/4 mt-1  ">
                {dataPopsicles && ( // Verificación de nulidad para data
                  <Autocomplete
                    options={dataPopsicles.filter(
                      (option) => option.status === "CREADO"
                    )}
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
                    onChange={(e, value) => setSelectedPopsicle(value)}
                  />
                )}
              </div>
            </div>
            <Button color="error" variant="outlined" fullWidth type="submit">
              Crear Receta
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-8 w-2/5 mx-auto shadow-2xl rounded-lg">
        <TableRecipe
          onSelectedIngredientsChange={handleSelectedIngredientsChange}
        />
      </div>
    </div>
  );
}
