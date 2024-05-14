import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSmoothies } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";
import CreateSmoothie from "./CreateSmoothie";
import LowStockAlert from "../../components/Alert/LowStockAlert";

export default function Smoothie() {
  const dispatch = useDispatch();
  const smoothies = useSelector((state) => state.smoothies);
  const { data } = smoothies;
  useEffect(() => {
    dispatch(getSmoothies());
  }, [dispatch]);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Utiliza el método toLocaleString para formatear la fecha y hora de manera local
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre la receta",
      width: 400,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidad",
      headerName: "Peso del Batido",
      width: 400,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updatedAt",
      headerName: "Fecha",
      width: 400,
      headerAlign: "center",
      align: "center",
    },
  ];

const rows =
  data &&
  data.map((item) => {
    const total = item.cantidad / 1000;
    return {
      id: item.id,
      nombre: item.Recipe.nombre,
      cantidad: `${total} KG`,
      updatedAt: formatDateTime(item.updatedAt),
    };
  });

  console.log(data)


  return (
    <>
      <div
        className="bg-cover bg-center h-screen select-none "
        style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
      >
        <LowStockAlert />
        <div className="flex flex-col items-center py-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
            <h2 className="text-2xl text-center font-bold mb-6 text-red-700">
              Crea un Nuevo Batido
            </h2>
            <CreateSmoothie />
          </div>
        </div>
        <div className="mt-8 justify-center flex">
          <Box
            sx={{
              height: 400,
              width: "65%",
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
