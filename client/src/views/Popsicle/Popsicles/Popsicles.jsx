import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopsicle, deletePopsicle } from "../../../redux/actions/actions";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../../../components/spinner/Spinner";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Popsicles() {
  const dispatch = useDispatch();
  const popsicles = useSelector((state) => state.popsicles);
  const { data } = popsicles;
    const navigate = useNavigate();

      const refrescarPagina = () => {
        window.location.reload();
      };

  useEffect(() => {
    dispatch(getPopsicle());
  }, [dispatch]);

  const handleEdit = (id) => {
    // Aquí deberías navegar a la página de edición de la paleta
    // por ejemplo, usando react-router-dom:
    navigate(`/Paleta/${id}`);
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
        dispatch(deletePopsicle(id));
        setTimeout(() => {
          refrescarPagina();
        }, "1000");
      }
    });
  };
  const columns = [
    {
      field: "image",
      headerName: "Imagen",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <img
          src={`data:image/jpeg;base64,${params.value}`}
          alt="imagen"
          style={{ width: "100%" }}
        />
      ),
    },
    {
      field: "nombre",
      headerName: "Nombre de la Paleta",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tipo_paleta",
      headerName: "Tipo de Paleta",
      width: 200,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "descripcion",
      headerName: "Descripcion",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "precio",
      headerName: "Precio",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <DeleteIcon
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >

          </DeleteIcon>
        </div>
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <VisibilityIcon
            variant="outlined"
            color="primary"
            className="cursor-pointer"
            onClick={() => handleEdit(params.row.id)}
          />
        </div>
      ),
    },
  ];


  const rows =
    data &&
    data.map((item) =>
      //bg-[#fae9ee]
      ({
        id: item.id,
        image: item.image,
        nombre: item.nombre,
        peso: item.peso,
        tipo_paleta: item.TipoDePaletum.nombre,
        unidad_medida: item.unidad_medida,
        descripcion: item.descripcion,
        precio: `${item.precio} $`,
      })
    );
  return (
    <>
      <div
        className="bg-cover bg-center h-screen select-none "
        style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
      >
        <div className="w-full flex flex-col items-center select-none py-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
            <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
              Paleta
            </div>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              href="/crear_paletas"
            >
              Crear Paleta
            </Button>
          </div>
        </div>
        <div className="mt-8 justify-center flex">
          <Box
            sx={{
              height: 400,
              width: "70%",
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
    </>
  );
}
