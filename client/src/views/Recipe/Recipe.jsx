import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";
import {
  getRecipes,
  deleteRecipe,
  detailRecipe,
  editRecipe,
} from "../../redux/actions/actions";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

import Swal from "sweetalert2";

const Recipe = () => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes);
  const detail = useSelector((state) => state.recipeDetail);
  const data = recipes.data;

  const detailData = detail.data;
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (isEditing && detailData) {
      showEditDialog();
    }
  }, [isEditing, detailData]);
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const refrescarPagina = () => {
    window.location.reload();
  };

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
        dispatch(deleteRecipe(id));
        setTimeout(() => {
          refrescarPagina();
        }, "1000");
      }
    });
  };

  const handleEdit = (id) => {
    dispatch(detailRecipe(id));
    setIsEditing(true);
    setEditingId(id);
  };

  const showEditDialog = async () => {
    const { nombre, Ingredientes } = detailData;
    // Crear una plantilla HTML con entradas de texto para cada ingrediente
    const ingredientesHTML = Ingredientes.map((ingrediente, index) => {
      const { nombre, RecipeIngrediente } = ingrediente;
      const { cantidad, unidad_medida } = RecipeIngrediente;
      return `
         <div key="ingredient-${index}">
                <h1 class='text-2xl font-bold text-blue-600 mt-5'>Editar Ingrediente</h1>
                <input id="swal-nombre" class="swal2-input" value="${nombre}" placeholder="Nombre" readonly>
                <input id="swal-cantidad-${index}" type="number" class="swal2-input "  style="width: 15%; display: inline-block;" value="${cantidad}" placeholder="Cantidad" >
                <input id="swal-cantidad-${index}" type="text" class="swal2-input "  style="width: 15%; display: inline-block;" value="${unidad_medida}" placeholder="unidad_medida" readonly >

            </div>
      `;
    }).join("");

    Swal.fire({
      title: "Editar Ingrediente",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      customClass: {
        popup: "w-2/4", // Establece el ancho deseado utilizando las clases de Tailwind
      },
      html: `
      <div>
                       <h1 class='text-2xl font-bold text-indigo-800 mt-5'>Nombre de la Receta</h1>
        <input id="swal-nombre" class="swal2-input" value="${nombre}" placeholder="Nombre">
        ${ingredientesHTML}
      </div>
    `,
      preConfirm: () => {
        const newNombre = Swal.getPopup()
          .querySelector("#swal-nombre")
          .value.trim();
        if (!newNombre) {
          Swal.showValidationMessage("Por favor, ingrese un nombre válido.");
        }

        const newIngredientes = Ingredientes.map((ingrediente, index) => {
          const cantidadInput = Swal.getPopup().querySelector(
            `#swal-cantidad-${index}`
          );


          return {
            ...ingrediente,
            RecipeIngrediente: {
              cantidad: cantidadInput.value.trim(),

            },
          };
        });

        return { nombre: newNombre, Ingredientes: newIngredientes };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {

         try {
           // Transformar result.value al formato esperado
           const { nombre, Ingredientes } = result.value;

           const ingredientesTransformados = Ingredientes.map(
             ({ id, RecipeIngrediente }) => ({
               id,
               cantidad: RecipeIngrediente.cantidad,
               unidad_medida: RecipeIngrediente.unidad_medida,
             })
           );

           const dataTransformada = {
             nombre,
             ingredientes: ingredientesTransformados,
           };

           // Dispatch con el formato transformado
          await dispatch(editRecipe(editingId, dataTransformada));
           Swal.fire("Editado con Exito!", "", "success");
           setTimeout(() => {
             refrescarPagina();
           }, "1000");

           // Muestra una alerta de éxito
           Swal.fire({
             title: "Registro Exitoso!",
             icon: "success",
           });

           // Refresca la página después de un segundo
           setTimeout(() => {
             refrescarPagina();
           }, 1000);
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

      }

      setIsEditing(false);
      setEditingId(null);
    });
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre del Ingrediente",
      width: 500,
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
      className="bg-cover bg-center min-h-screen select-none"
      style={{ backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="w-full flex flex-col items-center py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 lg:w-1/3 w-full mx-4">
          <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
            Receta
          </div>
          <Link to="/crear_receta">
            <Button
              color="error"
              variant="outlined"
              fullWidth
            >
              Crear Receta
            </Button>
          </Link>
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
          className="mx-auto lg:w-1/2"
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

export default Recipe;
