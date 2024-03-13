import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Customers() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  const { data } = customers;
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  console.log(data);
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Utiliza el método toLocaleString para formatear la fecha y hora de manera local
  };
    const columns = [
      {
        field: "nombre",
        headerName: "Nombre",
        width: 200,
        editable: true,
      },
      {
        field: "apellido",
        headerName: "Apellido",
        width: 300,
        editable: true,
      },
      {
        field: "telefono",
        headerName: "Telefono",
        width: 300,
      },
      {
        field: "direccion",
        headerName: "Direccion",
        width: 400,
      },
      {
        field: "updatedAt",
        headerName: "Fecha",
        width: 300,
      },
    ];

    const rows =
      data &&
      data.map((item) =>
        //bg-[#fae9ee]
        ({
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido,
          telefono: item.telefono,
          direccion: item.direccion,
          updatedAt: formatDateTime(item.updatedAt),
        })
      );


  return (
    <>
      <div className="select-none w-full flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md w-96">
          <div className="text-center text-2xl font-bold mb-4 text-[#9b1028] p-1">
            Clientes
          </div>
          <a
            href="/crear_clientes"
            type="submit"
            className="text-center w-full bg-[#fa042c] text-white py-2 rounded-md hover:bg-[#da637a] transition duration-300"
          >
            Agregar Clientes
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
