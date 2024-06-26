import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getsales } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import CircularIndeterminate from "../../components/spinner/Spinner";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Sales() {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sales);
  const { data } = sales;


    const formatDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString();
    };


  useEffect(() => {
    dispatch(getsales());
  }, [dispatch]);

    const columns = [
      {
        field: "id",
        headerName: "Numero de Pedido",
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
        field: "cantidad_total",
        headerName: "Cantidad de paletas",
        width: 200,
        headerAlign: "center",
        align: "center",
      },

      {
        field: "monto_total",
        headerName: "Monto",
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "tasa",
        headerName: "Tasa",
        width: 100,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "Detalle",
        headerName: "Detalle",
        width: 200,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
          <div>
            <span
              onClick={() => window.open(`/Venta/${params.row.id}`, "_blank")}
              className="cursor-pointer"
            >
              <VisibilityIcon color="primary" />
            </span>
          </div>
        ),
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
    data.map((item) => ({
      id: item.id,
      Cliente: item.Cliente.razon_social,
      cantidad_total: item.cantidad_total,
      monto_total: `${item.monto_total.toFixed(2)}$`,
      tasa: item.tasa,
      updatedAt: formatDateTime(item.updatedAt),
    }));

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
          <Link to={`/crear_ventas`}>
            <Button
              color="error"
              variant="outlined"
              fullWidth
            >
              Crear Ventas
            </Button>
          </Link>
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
