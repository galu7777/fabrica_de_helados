import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";
import PropTypes from "prop-types";
import InputAdornment from "@mui/material/InputAdornment";


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
      const updatedRows = data.slice(3).map((item) => ({
        id: item.id,
        nombre: item.nombre,
        unidad_medida: item.unidad_medida,
        cantidad: item.cantidad || "",
      }));
      setRows(updatedRows);
    }
  }, [data]);

  useEffect(() => {
    const updatedSelectedIngredients = rows.filter((row) => row.selected);
    setSelectedIngredients(updatedSelectedIngredients);
  }, [rows]);



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
      width: 300,
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">

                {params.row.unidad_medida}
              </InputAdornment>
            ),
          }}
        />
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

TableRecipe.propTypes = {
  onSelectedIngredientsChange: PropTypes.func.isRequired,
};

export default TableRecipe;
