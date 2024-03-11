import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventory } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
export default function Inventory() {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  const { data } = inventory;
  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Utiliza el método toLocaleString para formatear la fecha y hora de manera local
  };

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre del Ingrediente",
      width: 200,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 200,
    },
    {
      field: "unidad_medida",
      headerName: "Unidad de medida",
      width: 200,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 200,
    },
    {
      field: "Proveedor",
      headerName: "Proveedor",
      width: 200,
    },
    {
      field: "updatedAt",
      headerName: "Fecha",
      width: 200,
    },
  ];

  const rows =
    data &&
    data.map((item) =>
      //bg-[#fae9ee]
      ({
        id: item.id,
        nombre: item.Ingrediente.nombre,
        cantidad: item.cantidad,
        unidad_medida: item.unidad_medida,
        tipo: item.tipo,
        Proveedor: item.Proveedor.razon_social,
        updatedAt: formatDateTime(item.updatedAt),
      })
    );

  return (
    <>
      <div className="select-none w-full flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md w-96">
          <div className="text-center text-2xl font-bold mb-4 text-[#9b1028] p-1">
            Inventario
          </div>
          <a
            href="/crear_inventario"
            type="submit"
            className="text-center w-full bg-[#fa042c] text-white py-2 rounded-md hover:bg-[#da637a] transition duration-300"
          >
           Agregar Mercancia
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
                sx={{ height: 750 }}
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
