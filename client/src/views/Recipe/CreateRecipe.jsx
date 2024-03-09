import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TableRecipe from "./TableRecipe";
import Swal from "sweetalert2";
import { createRecipe, getIngredients } from "../../redux/actions/actions";

export default function CreateRecipe() {
  const dispatch = useDispatch();


  useEffect(() => {7
    dispatch(getIngredients());
  }, [dispatch]);

 const [selectedIngredients, setSelectedIngredients] = useState([]);

 const handleSelectedIngredientsChange = (ingredients) => {
   setSelectedIngredients(ingredients);
 };

 console.log(selectedIngredients)
  const [form, setForm] = useState({
    nombre: ""
  });
  // nombre de la receta
  console.log(form.nombre);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setForm({ ...form, [name]: value });
  };

 const handleSubmit = (e) => {
   e.preventDefault();
   // Obtener solo los ingredientes seleccionados
   const selectedIngredientesIds = selectedIngredients
     .filter((ingredient) => ingredient.selected)
     .map((ingredient) => ({
       id: ingredient.id,
       cantidad: ingredient.cantidad || 0, // Si no hay cantidad especificada, establecer como 0
     }));
     console.log({
       nombre: form.nombre,
       ingredientes: selectedIngredientesIds,
     });
   if (
     !form.nombre.trim() ||
     !isNaN(form.nombre) ||
     selectedIngredientesIds.length === 0
   ) {
     Swal.fire({
       title: "Verifica la informacion.",
       text: "Por favor, ingresa un nombre de receta válido y selecciona al menos un ingrediente.",
       icon: "warning",
     });
   } else {
     Swal.fire({
       title: "Quieres registrar esta receta ?",
       showDenyButton: true,
       showCancelButton: true,
       confirmButtonText: "Registrar",
       denyButtonText: `No registrar`,
     }).then((result) => {
       if (result.isConfirmed) {
         Swal.fire("Registro Exitoso!", "", "success");
         // Envía los datos al backend
         dispatch(
           createRecipe({
             nombre: form.nombre,
             ingredientes: selectedIngredientesIds,
           })
         );
         // Limpia el formulario después de enviar
         setForm({ nombre: "", cantidad: "", medida: "" });
       } else if (result.isDenied) {
         Swal.fire("Los Cambios no se registraron.", "", "info");
       }
     });
   }
 };


  return (
    <>
      <div className="w-full select-none flex flex-col items-center">
        <div className="bg-white items-center justify-center rounded-md shadow-md w-96">
          <div className="text-center text-2xl font-bold mb-4 text-[#9b1028] p-1">
            Receta
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-sm text-[#9b1028] p-1">
                Nombre de la receta:
              </span>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Escribe el nombre de la receta"
                className="w-full px-3 py-2 mt-1 rounded-md border-2 border-9b1028 focus:outline-none focus:border-fa042c"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-[#fa042c] text-white py-2 rounded-md hover:bg-[#da637a] transition duration-300"
            >
              Crear Receta
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 w-2/5 mx-auto">
        <TableRecipe
          onSelectedIngredientsChange={handleSelectedIngredientsChange}
        />
      </div>
    </>
  );
}
