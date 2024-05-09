import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCustomers, createSales } from "../../redux/actions/actions";
import SearchCustomers from "./SearchCustomers";
import SalesTable from "./Table";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import LowStockAlert from "../../components/Alert/LowStockAlert";

export default function CreateSale() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPopsicles, setSelectedPopsicles] = useState([]);
  const [tasa, setTasa] = useState(0);
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };
  const handleSelectedPopsiclesChange = (selectedRows, BCV) => {
    setSelectedPopsicles(selectedRows);
   setTasa(BCV);
  };

const handleSubmit = (e) => {
  e.preventDefault();


  const filteredRows = selectedPopsicles
    .filter((row) => row.select === true)
    .map((row) => ({
      id_stock_paleta: row.id, // Solo envía el ID del stock de paleta
      cantidad: row.cantidad || 0,
    }));

  const selectedCustomerId = selectedCustomer.id;

  if (filteredRows.length === 0) {
    // Verifica si no hay elementos seleccionados
    Swal.fire({
      title: "Verifica la información.",
      text: "Por favor, selecciona al menos una paleta.",
      icon: "warning",
    });
    return;
  }

  const popsiclesWithZeroQuantity = filteredRows.filter(
    (popsicle) => popsicle.cantidad === 0
  );

  if (popsiclesWithZeroQuantity.length > 0) {
    const popsicleNames = popsiclesWithZeroQuantity.map(
      (popsicle) => popsicle.nombre_paleta
    );
    const message = `La cantidad de las siguientes paletas es 0: ${popsicleNames.join(
      ", "
    )}`;
    Swal.fire({
      title: "Verifica la información.",
      text: message,
      icon: "warning",
    });
    return;
  }

  Swal.fire({
    title: "¿Quieres registrar esta venta?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Registrar",
    denyButtonText: `No registrar`,
  }).then(async(result) => {
    if (result.isConfirmed) {
      try {
        Swal.fire("Venta registrada exitosamente!", "", "success");
        // Envía los datos al backend en el formato esperado
        const salesData = {
          id_cliente: selectedCustomerId,
          tasa: tasa,
          ventas: filteredRows,
        };


        await dispatch(createSales(salesData));
         navigate("/Ventas");
      } catch (error) {
        // Captura cualquier error que ocurra durante el envío de datos
        Swal.fire({
          width: "20em",
          title: `${error.response.data.data.message}`,
          text: "No se pudo Registar al inventario de Paletas",
          icon: "error",
          showConfirmButton: false,
          timer: 4000,
        });
      }

    } else if (result.isDenied) {
      Swal.fire("La venta no se registró.", "", "info");
    }
  });
};

  return (
    <div className="bg-cover bg-center h-screen select-none bg-gray-100 ">
      <LowStockAlert />
      <div className="flex flex-col h-screen items-center select-none bg-white mx-auto my-auto w-full">
        <div className="p-6 w-3/4">
          <div className="flex items-center text-center justify-center">
            <img
              src={"/tonygelati.png"}
              alt="Logo"
              style={{ width: "80px", height: "50px" }}
            />
            <Typography
              variant="h4"
              gutterBottom
              className="font-bold py-5 text-center items-start text-red-600"
            >
              Tony Gelati
            </Typography>
          </div>

          <form onSubmit={handleSubmit}>
            <SearchCustomers onCustomerSelect={handleCustomerSelect} />
            <div className="justify-center flex">

              <SalesTable
                onSelectedPopsiclesChange={handleSelectedPopsiclesChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Finalizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
