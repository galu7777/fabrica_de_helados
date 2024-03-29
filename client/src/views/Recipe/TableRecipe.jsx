import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import CircularIndeterminate from "../../components/spinner/Spinner";

const TableRecipe = ({ onSelectedIngredientsChange }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const { data } = ingredients;

  const [rows, setRows] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    onSelectedIngredientsChange(selectedIngredients);
  }, [selectedIngredients, onSelectedIngredientsChange]);

  useEffect(() => {
    if (data) {
      const updatedRows = data.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        unidad: item.unidad,
        cantidad: item.cantidad || "",
      }));
      setRows(updatedRows);
    }
  }, [data]);

  useEffect(() => {
    // Actualizar los ingredientes seleccionados cuando cambian las filas
    const updatedSelectedIngredients = rows.filter((row) => row.selected);
    setSelectedIngredients(updatedSelectedIngredients);
  }, [rows]);

  const units = ["", "KG", "GR", "L", "ML", "OZ"];

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, selected: isChecked } : row
    );
    setRows(updatedRows);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const columns = [
    {
      field: "select",
      headerName: "",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.row.selected || false}
              onChange={(event) => handleCheckboxChange(event, params.id)}
              sx={{ color: "gray" }}
            />
          }
          sx={{ justifyContent: "center" }}
        />
      ),
    },
    {
      field: "nombre",
      headerName: "Nombre del Ingrediente",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <TextField
        required
          id={`cantidad-${params.id}`}
          label="Cantidad"
          variant="outlined"
          value={params.row.cantidad || ""}
          onChange={(event) =>
            handleInputChange(params.id, "cantidad", event.target.value)
          }
          size="small"
        />
      ),
    },
    {
      field: "unidad",
      headerName: "Unidad de Medida",
      width: 200,
      renderCell: (params) => (
        <FormControl size="small" fullWidth>
          <Select
            value={params.row.unidad || ""}
            onChange={(event) =>
              handleInputChange(params.id, "unidad", event.target.value)
            }
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Seleccionar unidad</em>
            </MenuItem>
            {units.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
  ];

  return (
    <div className="mt-8 w-full bg-white mx-auto">
      {data ? (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableSelectionOnClick
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
    </div>
  );
};

export default TableRecipe;
