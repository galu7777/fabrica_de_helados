import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getInventoryPopsicle } from "../../redux/actions/actions";
import CircularIndeterminate from "../../components/spinner/Spinner";
import PropTypes from "prop-types";

export default function SalesTable({ onSelectedPopsiclesChange }) {
  const dispatch = useDispatch();
  const popInventory = useSelector((state) => state.inventoryPopsicle);
  const { data: dataPopInv } = popInventory;
  const [rows, setRows] = useState([]);
  const [showTextField, setShowTextField] = useState({});
  const [totalOfTotals, setTotalOfTotals] = useState(0);


  useEffect(() => {
    dispatch(getInventoryPopsicle());
  }, [dispatch]);

  useEffect(() => {
    if (dataPopInv) {
      const updatedRows = dataPopInv.map((item) => ({
        id: item.id,
        nombre_paleta: item.nombre_paleta,
        peso_unitario: item.peso_unitario,
        cantidad: 0,
        precio: 0,
        tasa: 35,
        total: 0,
        select: false,
      }));
      setRows(updatedRows);
    }
  }, [dataPopInv]);



  useEffect(() => {
    onSelectedPopsiclesChange(rows);
  }, [rows, onSelectedPopsiclesChange]);

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

  const handleAddButtonClick = (rowId) => {
    setShowTextField((prevState) => ({ ...prevState, [rowId]: true }));

    // Actualizar el valor de select a true para la fila correspondiente
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, select: true } : row
    );
    setRows(updatedRows);
  };
  const calculateTotals = (updatedRows) => {
    const updatedRowsWithTotals = updatedRows.map((row) => ({
      ...row,
      total: row.cantidad * row.peso_unitario || 0,
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
      field: "cantidad",
      headerName: "Agregar",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        showTextField[params.id] ? (
          <TextField
            type="number"
            value={params.row.cantidad}
            content="center"
            onChange={(event) => handleQuantityChange(event, params.id)}
          />
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
      field: "peso_unitario",
      headerName: "Peso",
      width: 140,
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
    <div className="mt-8 w-full rounded-md bg-white mx-auto">
      {dataPopInv ? (
        <>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
          />
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Total de a pagar :</p>
              <p className="text-2xl font-bold text-amazon-orange">
                $ {totalOfTotals.toFixed(2)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <CircularIndeterminate />
      )}
    </div>
  );
}

SalesTable.propTypes = {
  onSelectedPopsiclesChange: PropTypes.func.isRequired,
};
