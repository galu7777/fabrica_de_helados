import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsales } from "../../../redux/actions/actions";
import { Box } from "@mui/material";
import CircularIndeterminate from "../../../components/spinner/Spinner";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";


export default function ListDispatch() {
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
      field: "Detalle",
      headerName: "Detalle",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <span
            onClick={() => window.open(`/Pedidos/${params.row.id}`, "_blank")}
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
            Lista de Pedidos
          </div>

        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <Box
          sx={{
            height: 640,
            width: "60%",
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
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
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

