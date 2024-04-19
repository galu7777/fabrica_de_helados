import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getStockPopsicle } from "../../redux/actions/actions";
import CircularIndeterminate from "../../components/spinner/Spinner";
import PropTypes from "prop-types";
import { getMonitor } from "consulta-dolar-venezuela";
export default function SalesTable({ onSelectedPopsiclesChange }) {
  const dispatch = useDispatch();
  const popsicle = useSelector((state) => state.stockPop);
  const { data: dataPopInv } = popsicle;
  const [rows, setRows] = useState([]);
  const [showTextField, setShowTextField] = useState({});
  const [totalOfTotals, setTotalOfTotals] = useState(0);
  const [BCV, setBCV] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      const response = await getMonitor("BCV", "lastUpdate");
      setBCV(response.bcv.price);
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getStockPopsicle());
  }, [dispatch]);

  useEffect(() => {
    if (dataPopInv) {
      const updatedRows = dataPopInv.map((item) => ({
        id: item.id,
        nombre_paleta: item.nombre_paleta,
        peso_unitario: item.peso_unitario,
        tipo: item.TipoDePaletum.nombre,
        cantidad: 0,
        disponible: item.cantidad,
        precio: item.precio,
        total: 0,
        select: false,
      }));
      setRows(updatedRows);
    }
  }, [dataPopInv]);

  useEffect(() => {
    onSelectedPopsiclesChange(rows, BCV);
  }, [rows, BCV, onSelectedPopsiclesChange]);

  const handleQuantityChange = (event, rowId) => {
    const { value } = event.target;
    const newValue = value === "" ? 1 : Number(value);
    if (!isNaN(newValue) && newValue >= 0) {
      const updatedRows = rows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              cantidad: newValue,
              select: newValue !== 0,
            }
          : row
      );
      setRows(updatedRows);
      calculateTotals(updatedRows);
      if (newValue === 0) {
        setShowTextField((prevState) => ({ ...prevState, [rowId]: false }));
      }
    }
  };
  const totalEnBSCalculado = totalOfTotals * BCV;

const handleAddButtonClick = (rowId) => {
  setShowTextField((prevState) => ({ ...prevState, [rowId]: true }));

  // Actualizar el valor del select a true para la fila correspondiente
  const updatedRows = rows.map((row) =>
    row.id === rowId ? { ...row, select: true, cantidad: 1 } : row
  );
  setRows(updatedRows);
};

  const calculateTotals = (updatedRows) => {
    const updatedRowsWithTotals = updatedRows.map((row) => ({
      ...row,
      total: row.cantidad * row.precio || 0,
    }));
    setRows(updatedRowsWithTotals);

    // Calcular el total de todos los totales
    const total = updatedRowsWithTotals.reduce(
      (acc, row) => acc + row.total,
      0
    );
    setTotalOfTotals(total);
  };

  const columns = [
    {
      field: "nombre_paleta",
      headerName: "Nombre de Paleta",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tipo",
      headerName: "Tipo ",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
  {
  field: "cantidad",
  headerName: "Agregar",
  width: 200,
  headerAlign: "center",
  align: "center",
  renderCell: (params) => showTextField[params.id] ? (
    <Select
      sx={{width: '50%', textAlign: 'center'}}
      value={params.row.cantidad === 0 ? "" : params.row.cantidad}
      onChange={(event) => handleQuantityChange(event, params.id)}
      displayEmpty
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200,
            overflowY: "auto",
          },
        },
      }}
    >
      <MenuItem value={0}>0</MenuItem>
      {[...Array(params.row.disponible).keys()].map((value) => (
        <MenuItem key={value + 1} value={value + 1}>
          {value + 1}
        </MenuItem>
      ))}
    </Select>
  ) : (
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleAddButtonClick(params.id)}
    >
      Agregar
    </Button>
  ),
},
    {
      field: "disponible",
      headerName: "Disponible",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "precio",
      headerName: "Precio",
      width: 130,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "total",
      headerName: "Total",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div className="mt-8 rounded-lg bg-white shadow-lg w-full">
      {dataPopInv ? (
        <>
          <div className="p-4 w-full">
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              disableRowSelectionOnClick
            />
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Total a pagar:</p>
              <p className="text-2xl font-bold text-amazon-orange">
                $
                {totalOfTotals.toLocaleString("es-VE", {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Tasa {BCV}:</p>
              <div className="text-right">
                <p className="text-gray-500">Total a pagar en BS:</p>
                <p className="text-lg font-medium text-gray-600">
                  {totalEnBSCalculado.toLocaleString("es-VE", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  Bs
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-8">
          <CircularIndeterminate />
        </div>
      )}
    </div>
  );
}

SalesTable.propTypes = {
  onSelectedPopsiclesChange: PropTypes.func.isRequired,
};
