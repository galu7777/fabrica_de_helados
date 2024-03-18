import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { getCustomers } from "../../redux/actions/actions";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types"; // Importar PropTypes

const SearchCustomers = ({ onCustomerSelect }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);
  const { data } = customers;
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleCustomerSelect = (event, value) => {
    setSelectedCustomer(value);
    onCustomerSelect(value);
  };

  return (
    <div className="border-gray-300 border border-solid p-4 rounded-md">
      <div className="mb-5 flex items-center justify-center ">
        {data && (
          <Autocomplete
            options={data}
            getOptionLabel={(option) => option.razon_social}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Buscar clientes"
                variant="outlined"
              />
            )}
            onChange={handleCustomerSelect}
            sx={{ width: 300 }}
          />
        )}
      </div>
      {selectedCustomer && (
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 flex">
            <TextField
              label="Código DNI"
              value={selectedCustomer.cod_dni}
              disabled
              sx={{ my: 1, mr: 2, width: 100 }}
            />
            <TextField
              label="Cédula/RIF"
              value={selectedCustomer.cedula_rif}
              disabled
              fullWidth
              sx={{ my: 1, mr: 2, width: "25%" }}
            />
            <TextField
              label="Teléfono"
              value={selectedCustomer.telefono}
              disabled
              fullWidth
              sx={{ my: 1, mr: 2, width: "25%" }}
            />
            <TextField
              label="Dirección"
              value={selectedCustomer.direccion}
              disabled
              sx={{ my: 1, width: "35%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Validación de las props esperadas
SearchCustomers.propTypes = {
  onCustomerSelect: PropTypes.func.isRequired,
};

export default SearchCustomers;
