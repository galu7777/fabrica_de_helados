import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsales } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import CircularIndeterminate from "../../components/spinner/Spinner";
import { DataGrid } from "@mui/x-data-grid";

export default function Sales() {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales);
  const { data } = sales;
    const formatDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString(); // Utiliza el método toLocaleString para formatear la fecha y hora de manera local
    };


  useEffect(() => {
    dispatch(getsales());
  }, [dispatch]);
  console.log(data);
    const columns = [
      {
        field: "id",
        headerName: "Numero de factura",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "Cliente",
        headerName: "Cliente",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "cantidad",
        headerName: "Cantidad",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "nombre_paleta",
        headerName: "Nombre de la paleta",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "precio",
        headerName: "Precio",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "monto",
        headerName: "Monto",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "tasa",
        headerName: "Tasa",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "updatedAt",
        headerName: "Fecha",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
    ];

    const rows =
      data &&
      data.map((item) =>
        //bg-[#fae9ee]
        ({
          id: item.id,
          Cliente: item.Cliente.razon_social,
          cantidad: item.cantidad,
          nombre_paleta: item.nombre_paleta,
          precio: item.precio,
          monto: item.monto,
          tasa: item.tasa,
          updatedAt: formatDateTime(item.updatedAt),
        })
      );
  return (
    <div
      className="bg-cover bg-center h-screen select-none "
      style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="w-full flex flex-col items-center select-none py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
          <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
            Lista de Ventas
          </div>
          <Button
            color="error"
            variant="outlined"
            fullWidth
            href="/crear_ventas"
          >
            Crear Ventas
          </Button>
        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <Box
          sx={{
            height: 600,
            width: "80%",
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
}
