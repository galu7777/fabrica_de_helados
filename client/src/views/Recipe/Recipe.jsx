import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";
import { getRecipes } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

const Recipe = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const { data } = recipes;
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
  console.log(data);
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre del Ingrediente",
      width: 500,
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows =
    data &&
    data.map((item) =>
      //bg-[#fae9ee]
      ({ id: item.id, nombre: item.nombre })
    );
  return (
    <div
      className="bg-cover bg-center h-screen select-none "
      style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="w-full flex flex-col items-center select-none py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
          <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
            Receta
          </div>
          <Button
            color="error"
            variant="outlined"
            fullWidth
            href="/crear_receta"
          >
            Crear Receta
          </Button>
        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <Box
          sx={{
            height: 400,
            width: "30%",
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
};

export default Recipe;
