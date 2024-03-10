import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

import { getProviders } from "../../redux/actions/actions";
import { Box } from "@mui/material";

export default function Provider() {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers);
  const { data } = providers;

  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);


  const columns = [
    { field: "razon_social", headerName: "Razon Social", width: 200},
    { field: "direccion", headerName: "Direccion", width: 200 },
    { field: "cod_dni", headerName: "DNI", width: 200 },
    { field: "cedula_rif", headerName: "RIF", width: 200 },
    { field: "telefono", headerName: "Telefono", width: 200 },
  ];

  const rows =
    data &&
    data.map((item) =>
      //bg-[#fae9ee]
      ({
        id: item.id,
        razon_social: item.razon_social,
        direccion: item.direccion,
        cod_dni: item.cod_dni,
        cedula_rif: item.cedula_rif,
        telefono: item.telefono,
      })
    );
  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-[#9b1028] p-1 text-center">
          Proveedores
        </h2>
        <a
          href="/crear_proveedore"
          type="submit"
          className="text-center w-full bg-[#fa042c] text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Crear Proveedores
        </a>
      </div>
      <div className="mt-8">
        <Box sx={{ height: 400, width: "100%" }} className="text-center">
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
            <h3 className="text-2xl font-bold text-[#9b1028]">
              No hay Ingredientes !
            </h3>
          )}
        </Box>
      </div>
    </div>
  );
}
