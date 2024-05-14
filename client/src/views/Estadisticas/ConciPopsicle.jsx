import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConciliacionPopsicle } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";

export function ConciPopsicle() {
  const dispatch = useDispatch();
  const popsicles = useSelector((state) => state.popsicleAprox);
  const { data } = popsicles;
  console.log(data)

  useEffect(() => {
    dispatch(getConciliacionPopsicle());
  }, [dispatch]);

  const columns = [

    {
      field: "nombre",
      headerName: "Nombre de la Paleta",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidadReceta",
      headerName: "Total Esperado",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidadStock",
      headerName: "Total Registrado",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "diferencia",
      headerName: "diferencia",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];

    const rows =
      data &&
      data.map((item, index) => ({
        id: index, // Utiliza el índice como identificador único
        paletaId: item.paletaId,
        nombre: item.nombre,
        cantidadReceta: item.cantidadReceta,
        cantidadStock: item.cantidadStock,
        diferencia: item.diferencia,
      }));


  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <div className="mt-5">
        <p className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
         Reporte de Paletas
        </p>
        <Box
          sx={{
            height: 800,
            width: "100%",
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
                    pageSize: 25,
                  },
                },
              }}
              pageSizeOptions={[25]}
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
