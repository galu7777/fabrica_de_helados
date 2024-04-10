import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { getTypePopsicle } from "../../../redux/actions/actions";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";

export default function SearchPopsicles({
  onPopsicleTypeSelect,
  defaultPopsicleData,
}) {
  const dispatch = useDispatch();
  const popsicleType = useSelector((state) => state.typePopsicles);
  const { data } = popsicleType;
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const fetchDefaultPopsicleData = async () => {
      try {
        await dispatch(getTypePopsicle());
        setSelectedType(defaultPopsicleData || "");
      } catch (error) {
        console.error("Error fetching default popsicle data:", error);
      }
    };
    fetchDefaultPopsicleData();
  }, [dispatch, defaultPopsicleData]);

  const handlePopsicleSelect = (event, value) => {
    setSelectedType(value);
    onPopsicleTypeSelect(value);
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-center">
        {data && (
          <Autocomplete
            options={data}
            fullWidth
            getOptionLabel={(option) => option.nombre || selectedType}
            isOptionEqualToValue={(option, value) => option.nombre === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar Tipo de Paleta"
                variant="outlined"
                required
              />
            )}
            onChange={handlePopsicleSelect}
            value={selectedType}
          />
        )}
      </div>
    </div>
  );
}

SearchPopsicles.propTypes = {
  onPopsicleTypeSelect: PropTypes.func.isRequired,
  defaultPopsicleData: PropTypes.string,
};
