import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventory } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import CircularIndeterminate from "../../components/spinner/Spinner";
export default function Inventory() {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  const { data } = inventory;
  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Utiliza el método toLocaleString para formatear la fecha y hora de manera local
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre del Ingrediente",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "unidad_medida",
      headerName: "Unidad de medida",
      width: 100,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "invoice_amount",
      headerName: "Monto de la factura",
      width: 150,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Proveedor",
      headerName: "Proveedor",
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
        nombre: item.Ingrediente.nombre,
        cantidad: item.cantidad,
        unidad_medida: item.unidad_medida,
        invoice_amount: item.invoice_amount,
        tipo: item.tipo,
        Proveedor: item.Proveedor.razon_social,
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
              Movimiento
            </div>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              href="/crear_inventario"
            >
             Agregar Mercancia
            </Button>
          </div>
        </div>
        <div className="mt-8 justify-center flex">
          <Box
            sx={{
              height: 400,
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
    </>
  );
}
