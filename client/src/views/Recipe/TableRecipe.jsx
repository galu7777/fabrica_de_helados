  import  { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { getIngredients } from "../../redux/actions/actions";
  import TextField from "@mui/material/TextField";
  import Checkbox from "@mui/material/Checkbox";
  import FormControlLabel from "@mui/material/FormControlLabel";

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
          cantidad: item.cantidad || "",
          unidad: item.unidad,
        }));
        setRows(updatedRows);
      }
    }, [data]);

    useEffect(() => {
      // Actualizar los ingredientes seleccionados cuando cambian las filas
      const updatedSelectedIngredients = rows.filter((row) => row.selected);
      setSelectedIngredients(updatedSelectedIngredients);
    }, [rows]);

    const units = ["", "kg", "g", "l", "ml", "oz", "lb"];

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

    return (
      <div className="w-full">
        <div className="mt-8">
          {data ? (
            <table className="w-full text-sm text-left rtl:text-right text-white dark:text-white">
              {/* Encabezado de la tabla */}
              <thead className="text-xs text-white uppercase bg-red-500 dark:bg-red-600 dark:text-white">
                <tr>
                  <th className="px-6 py-3 items-center text-center text-xs font-medium text-white uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                    Nombre del Ingrediente
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                    Unidad de Medida
                  </th>
                </tr>
              </thead>
              {/* Cuerpo de la tabla */}
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white hover:bg-red-100 border-b border-gray-200 dark:border-gray-600"
                  >
                    <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={row.selected}
                            onChange={(event) =>
                              handleCheckboxChange(event, row.id)
                            }
                            sx={{ color: "blue" }}
                          />
                        }
                        sx={{ justifyContent: "center" }}
                      />
                    </td>
                    <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-black">
                      {row.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <TextField
                        id={`cantidad-${row.id}`}
                        label="Cantidad"
                        variant="outlined"
                        value={row.cantidad}
                        onChange={(event) =>
                          handleInputChange(
                            row.id,
                            "cantidad",
                            event.target.value
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        id={`unidad-${row.id}`}
                        value={row.unidad}
                        onChange={(event) =>
                          handleInputChange(row.id, "unidad", event.target.value)
                        }
                        className="border border-gray-300 p-1 rounded-md w-full"
                      >
                        {units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h3 className="text-2xl font-bold text-gray-500">
                No hay Ingredientes
              </h3>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default TableRecipe;
