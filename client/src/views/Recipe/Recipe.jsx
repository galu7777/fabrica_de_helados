import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';

import {  getRecipes } from "../../redux/actions/actions";
import { Box } from "@mui/material";
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
      field: 'nombre',
      headerName: 'Nombre del Ingrediente',
      width: 200,
      editable: true,
    }
  ];

  const rows = data && data.map((item) => (
    //bg-[#fae9ee]
    { id: item.id, nombre: item.nombre }
  ));
  return (
    <>
      <div className="w-full flex flex-col items-center select-none">
        <div className="bg-white rounded-md shadow-md w-96">
          <div className="text-center text-2xl font-bold mb-4 text-[#9b1028] p-1">
            Receta
          </div>
          <a
            href="/crear_receta"
            type="submit"
            className="text-center w-full bg-[#fa042c] text-white py-2 rounded-md hover:bg-[#da637a] transition duration-300"
          >
            Crear Receta
          </a>
          <div className="mt-8">
            <Box sx={{ height: 400, width: "100%" }}>
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
                <h3 className="text-2xl font-bold text-[#9b1028]">
                  No hay Receitas !
                </h3>
              )}
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}


export default  Recipe
