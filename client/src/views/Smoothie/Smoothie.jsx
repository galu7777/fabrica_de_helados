import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSmoothies } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";
import CreateSmoothie from "./CreateSmoothie";
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
      field: "id_receta",
      headerName: "Nombre la receta",
      width: 400,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidad",
      headerName: "cantidad total de ingredientes",
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
    data.map((item) =>
      //bg-[#fae9ee]
      ({
        id: item.id,
        id_receta: item.id_receta,
        cantidad: item.cantidad,
        updatedAt: formatDateTime(item.updatedAt),
      })
    );

  return (
    <>
      <div
        className="bg-cover bg-center h-screen select-none "
        style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
      >
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
    </>
  );
}
