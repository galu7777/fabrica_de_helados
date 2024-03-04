import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2'
import { createIngredient, getIngredients } from "../../redux/actions/actions";
import { Box } from "@mui/material";

const Ingredient = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const { data } = ingredients;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  console.log(data);

  const [form, setForm] = useState({
    nombre: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !isNaN(form.nombre)) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, ingresa un nombre de ingrediente válido.",
        icon: "warning"
      });
    }
    Swal.fire({
      title: "Quieres registrar este Ingrediente ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      denyButtonText: `No registrar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Registro Exitoso!", "", "success");
        dispatch(createIngredient(form.nombre));
      } else if (result.isDenied) {
        Swal.fire("Los Cambios no se registraron.", "", "info");
      }
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nombre',
      headerName: 'Nombre del Ingrediente',
      width: 200,
      editable: true,
    }
  ];

  const rows = data && data.map((item) => (
    //bg-[#fae9ee]
    { id: item.id, nombre: item.nombre }
  ));

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-[#9b1028] p-1">Crea un Nuevo Ingrediente</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-sm text-[#9b1028] p-1">Nombre del Ingrediente:</span>
            <input
              type="text"
              name='nombre'
              value={form.nombre}
              onChange={handleChange}
              placeholder="Escribe el nuevo ingrediente a registrar"
              className="w-full px-3 py-2 mt-1 rounded-md border-2 border-9b1028 focus:outline-none focus:border-fa042c"
            />
          </label>
          <button type="submit" className="w-full bg-[#fa042c] text-white py-2 rounded-md hover:bg-[#da637a] transition duration-300">
            Crear Ingrediente
          </button>
        </form>
      </div>
      <div className="mt-8">
        <Box sx={{ height: 400, width: '100%' }}>
          {data ? (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          ) : (
            <h3 className="text-2xl font-bold text-[#9b1028]">No hay Ingredientes !</h3>
          )}
        </Box>
      </div>
    </div>
  );
}

export default Ingredient;
