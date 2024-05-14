
import { useEffect } from "react";
import { getStockPopsicle } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";

export default function StockPopsicles() {
  const dispatch = useDispatch();
  const stockPop = useSelector((state) => state.stockPop);
  const data = stockPop.data;


  useEffect(() => {
    dispatch(getStockPopsicle());
  }, [dispatch]);

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
      field: "nombre_paleta",
      headerName: "Nombre de la Paleta",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "peso_unitario",
      headerName: "peso",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "unidad_medida",
      headerName: "Unidad de medida",
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
        image: item.Paletum.image,
        nombre_paleta: item.nombre_paleta,
        cantidad: item.cantidad,
        peso_unitario: item.peso_unitario,
        unidad_medida: item.unidad_medida,
      })
    );
  return (
    <div
      className="bg-cover bg-center h-screen select-none "
      style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="flex flex-col items-center py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
          <h2 className="text-2xl text-center font-bold mb-6 text-red-700">
             Paletas Disponibles
          </h2>
        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <Box
          sx={{
            height: 400,
            width: "50%",
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
