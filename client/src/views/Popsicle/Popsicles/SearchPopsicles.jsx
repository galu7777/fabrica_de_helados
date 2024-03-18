import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { getTypePopsicle } from "../../../redux/actions/actions";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types"; // Importar PropTypes

export default function SearchPopsicles({ onPopsicleTypeSelect }) {
  const dispatch = useDispatch();
  const popsicleType = useSelector((state) => state.typePopsicles);
  const { data } = popsicleType;
  const [selectedPopsicle, setSelectedPopsicle] = useState(null);

  useEffect(() => {
    dispatch(getTypePopsicle());
  }, [dispatch]);

  const handlePopsicleSelect = (event, value) => {
    setSelectedPopsicle(value);
    onPopsicleTypeSelect(value);
  };
  console.log(selectedPopsicle)

  return (
    <div>
      <div className="mb-5 flex items-center justify-center">
        {data && ( // Verificación de nulidad para data
          <Autocomplete
            options={data}
            fullWidth
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar Tipo de Paleta"
                variant="outlined"
                required
              />
            )}
            onChange={handlePopsicleSelect}
          />
        )}
      </div>
    </div>
  );
}

// Validación de las props esperadas
SearchPopsicles.propTypes = {
  onPopsicleTypeSelect: PropTypes.func.isRequired,
};


// Validación de las props esperadas
SearchPopsicles.propTypes = {
  onPopsicleTypeSelect: PropTypes.func.isRequired,
};

