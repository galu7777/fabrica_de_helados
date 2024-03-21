import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import {
  createIngredient,
  getIngredients,
  deleteIngredient,
  detailIngredient,
  editIngredient,
} from "../../redux/actions/actions";
import { Box } from "@mui/material";

import CircularIndeterminate from "../../components/spinner/Spinner";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Ingredient = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients);
  const detail = useSelector((state) => state.ingredientDetail);
  const data = ingredients.data;
  const detailData = detail.data;
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    if (isEditing && detailData) {
      showEditDialog();
    }
  }, [isEditing, detailData]);
  const refrescarPagina = () => {
    window.location.reload();
  };

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
          dispatch(createIngredient(form.nombre.toUpperCase()));
          setTimeout(() => {
            refrescarPagina();
          }, "1000");
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };
  const handleEdit = (id) => {
    dispatch(detailIngredient(id));
    setIsEditing(true);
    setEditingId(id);
  };

  const showEditDialog = () => {
    const nombre = detailData.nombre;
    Swal.fire({
      title: "Editar Ingrediente",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      html: `<input id="swal-nombre" class="swal2-input" value="${nombre}" placeholder="Nombre">`,
      preConfirm: () => {
        const newNombre = Swal.getPopup()
          .querySelector("#swal-nombre")
          .value.trim();
        if (!newNombre) {
          Swal.showValidationMessage("Por favor, ingrese un nombre válido.");
        }
        return { nombre: newNombre };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(editIngredient(editingId, result.value));
      }
      setIsEditing(false);
      setEditingId(null);
    });
  };

  // Función para manejar la eliminación de un ingrediente
  const handleDelete = (id) => {
    // Mostrar un cuadro de diálogo de confirmación con SweetAlert
    Swal.fire({
      title: "¿Estás seguro de que quieres Eliminarlo?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire("Registro Exitoso!", "", "success");
        dispatch(deleteIngredient(id));
        setTimeout(() => {
          refrescarPagina();
        }, "1000");
      }
    });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre del Ingrediente",
      width: 400,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            Editar
          </Button>
        </div>
      ),
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </Button>
        </div>
      ),
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
          <h2 className="text-2xl text-center font-bold mb-6 text-red-700">
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
            <Button color="error" variant="outlined" fullWidth type="submit">
              Aceptar
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <Box
          sx={{
            height: 400,
            width: "50%",
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
