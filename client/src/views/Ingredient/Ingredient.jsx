import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { createIngredient, getIngredients } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import CircularIndeterminate from "../../components/spinner/Spinner";
import TextField from "@mui/material/TextField";


const Ingredient = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const { data } = ingredients;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [form, setForm] = useState({
    nombre: "",
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
          dispatch(createIngredient(form.nombre));
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre del Ingrediente",
      width:500,
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows =
    data &&
    data.map((item) =>
      //bg-[#fae9ee]
      ({ id: item.id, nombre: item.nombre })
    );

  return (
    <div
      className="bg-cover bg-center h-screen select-none "
      style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="flex flex-col items-center py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            Crea un Nuevo Ingrediente
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <TextField
                fullWidth
                type="text"
                name="nombre"
                label="Escribe el nuevo ingrediente a registrar"
                variant="standard"
                value={form.nombre}
                onChange={handleChange}
              />

            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Crear Ingrediente
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <Box
          sx={{
            height: 400,
            width: "30%",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
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
            <CircularIndeterminate />
          )}
        </Box>
      </div>
    </div>
  );
};

export default Ingredient;
