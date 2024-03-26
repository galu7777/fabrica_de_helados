import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TableRecipe from "./TableRecipe";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createRecipe, getIngredients } from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
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
        unidad_medida: ingredient.unidad || 0,
      }));

    const nombre = form.nombre.toUpperCase();
      const dataTransformada = {
        nombre,
        ingredientes: selectedIngredientesIds,
      };
      console.log(dataTransformada)

    // Verificar si form.cantidad y form.medida están definidos antes de llamar a trim()
    if (
      !nombre ||
      !nombre.trim() ||
      !selectedIngredientesIds ||
      !selectedIngredientesIds.length ||
      selectedIngredientesIds.some((ingrediente) => !ingrediente.cantidad) ||
      selectedIngredientesIds.some((unidades) => !unidades.unidad_medida)
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
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Registro Exitoso!", "", "success");
          // Envía los datos al backend
          dispatch(createRecipe(dataTransformada));

          navigate("/Recetas");
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
            <div>
              <TextField
                fullWidth
                type="text"
                name="nombre"
                required
                label="Escribe el nuevo ingrediente a registrar"
                variant="standard"
                value={form.nombre}
                onChange={handleChange}
              />
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
