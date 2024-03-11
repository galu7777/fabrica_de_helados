import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSmoothies } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
      editable: true,
    },
    {
      field: "cantidad",
      headerName: "cantidad total de ingredientes",
      width: 400,
      editable: true,
    },
    {
      field: "updatedAt",
      headerName: "Fecha",
      width: 400,
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
      <div className="select-none w-full flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md w-96">
          <div className="text-center text-2xl font-bold mb-4 text-[#9b1028] p-1">
            Batidos
          </div>
          <a
            href="/crear_smoothie"
            type="submit"
            className="text-center w-full bg-[#fa042c] text-white py-2 rounded-md hover:bg-[#da637a] transition duration-300"
          >
            Agregar Batida
          </a>
        </div>
        <div className="mt-8 h-full">
          <Box sx={{ height: 750, width: "100%" }}>
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
                sx={{ height: 750, textAlign: "center" }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
              />
            ) : (
              <h3 className="text-2xl font-bold text-[#9b1028]">
                No hay Receitas !
              </h3>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
