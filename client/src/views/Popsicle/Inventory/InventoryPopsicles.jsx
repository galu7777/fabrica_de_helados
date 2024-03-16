
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CircularIndeterminate from "../../../components/spinner/Spinner";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { getInventoryPopsicle } from "../../../redux/actions/actions";
export default function InventoryPopsicles() {
const dispatch = useDispatch();
  const inventoryPopsicle = useSelector((state) => state.inventoryPopsicle);
  const { data } = inventoryPopsicle;

   useEffect(() => {
     dispatch(getInventoryPopsicle());
   }, [dispatch]);
       const formatDateTime = (dateTimeString) => {
         const dateTime = new Date(dateTimeString);
         return dateTime.toLocaleString(); // Utiliza el método toLocaleString para formatear la fecha y hora de manera local
       };

     const columns = [
       {
         field: "nombre_paleta",
         headerName: "Nombre de la Paleta",
         width: 300,
         headerAlign: "center",
         align: "center",
       },
       {
         field: "tipo_paleta",
         headerName: "Tipo de Paleta",
         width: 150,
         headerAlign: "center",
         align: "center",
       },
       {
         field: "tipo",
         headerName: "Tipo",
         width: 200,
         headerAlign: "center",
         align: "center",
       },
       {
         field: "peso_unitario",
         headerName: "Peso",
         width: 100,
         headerAlign: "center",
         align: "center",
       },
       {
         field: "unidad_medida",
         headerName: "Unidad de medida ",
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
            nombre_paleta: item.nombre_paleta,
            tipo_paleta: item.tipo_paleta,
            tipo: item.tipo,
            peso_unitario: item.peso_unitario,
            unidad_medida: item.unidad_medida,
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
            Inventorio de Paleta
          </div>
          <Button
            color="error"
            variant="outlined"
            fullWidth
            href="/create_inven_Paletas"
          >
            Agregar Inventario
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
