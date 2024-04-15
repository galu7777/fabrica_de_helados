import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CircularIndeterminate from "../../../components/spinner/Spinner";
import { DataGrid } from "@mui/x-data-grid";
import { getInventoryPopsicle } from "../../../redux/actions/actions";
import CreateStore from "../Store/CreateStore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DetailPopsicle from "../../../components/modal/paletas/DetailPopsicle";

export default function InventoryPopsicles() {
  const dispatch = useDispatch();
  const inventoryPopsicle = useSelector((state) => state.inventoryPopsicle);
  const { data } = inventoryPopsicle;

  useEffect(() => {
    dispatch(getInventoryPopsicle());
  }, [dispatch]);

  const [expandedRows, setExpandedRows] = useState({});

  const handleRowExpand = (rowId) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString();
  };

  const columns = [
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
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Detalle",
      headerName: "Detalle",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <span
            className="cursor-pointer"
            onClick={() => handleRowExpand(params.id)}
          >
            {expandedRows[params.id] ? (
              <VisibilityOffIcon color="primary" />
            ) : (
              <VisibilityIcon color="primary" />
            )}
          </span>
          {expandedRows[params.id] && (
            <DetailPopsicle
              id={params.id}
              onClose={() => handleRowExpand(params.id)}
            />
          )}
        </div>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Fecha",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows =
    data &&
    data.map((item) => ({
      id: item.id,
      nombre_paleta: item.nombre_paleta,
      cantidad: item.cantidad,
      tipo: item.tipo,
      peso_unitario: item.peso_unitario,
      unidad_medida: item.unidad_medida,
      updatedAt: formatDateTime(item.updatedAt),
    }));

  return (
    <div
      className="bg-cover bg-center h-screen select-none "
      style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="w-full flex flex-col items-center select-none py-10">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
          <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
            Inventario de Paletas
          </div>
          <CreateStore />
        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <Box
          sx={{
            height: 800,
            width: "70%",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {data ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={25}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 25,
                  },
                },
              }}
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
