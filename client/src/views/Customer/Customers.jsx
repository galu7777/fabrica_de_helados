import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, deleteCustomers } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";


export default function Customers() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  const { data } = customers;
  useEffect(() => {
    dispatch(getCustomers());
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
          dispatch(deleteCustomers(id));
          setTimeout(() => {
            refrescarPagina();
          }, "1000");
        }
      });
    };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Utiliza el método toLocaleString para formatear la fecha y hora de manera local
  };
    const columns = [
      {
        field: "razon_social",
        headerName: "Razon Social",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "direccion",
        headerName: "Direccion",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "cod_dni",
        headerName: "DNI",
        width: 50,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "cedula_rif",
        headerName: "RIF",
        width: 200,
        headerAlign: "center",
        align: "center",
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
              href={`/Cliente/${params.row.id}`}
              //onClick={() => handleDelete(params.row.id)}
            >
              Editar
            </Button>
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
          razon_social: item.razon_social,
          direccion: item.direccion,
          cod_dni: item.cod_dni,
          cedula_rif: item.cedula_rif,
          telefono: item.telefono,
          updatedAt: formatDateTime(item.updatedAt),
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
              Cliente
            </div>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              href="/crear_clientes"
            >
              Crear Cliente
            </Button>
          </div>
        </div>
        <div className="mt-8 justify-center flex">
          <Box
            sx={{
              height: 400,
              width: "55%",
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
