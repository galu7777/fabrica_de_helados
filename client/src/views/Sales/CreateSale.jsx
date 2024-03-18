import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCustomers, createSales } from "../../redux/actions/actions";
import SearchCustomers from "./SearchCustomers";
import SalesTable from "./Table";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
//import { useNavigate } from "react-router-dom";



export default function CreateSale() {
  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPopsicles, setSelectedPopsicles] = useState([]);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };
  const handleSelectedPopsiclesChange = (selectedRows) => {
    setSelectedPopsicles(selectedRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredRows = selectedPopsicles
      .filter((row) => row.select === true)
      .map((row) => ({
        id: row.id,
        cantidad: row.cantidad || 0,
        precio: row.peso_unitario || 0,
        monto: row.total || 0,
        tasa: row.tasa,
      }));
    const selectedCustomersIds = selectedCustomer.id;

    if (!filteredRows) {
      Swal.fire({
        title: "Verifica la información.",
        text: "Por favor, selecciona un cliente.",
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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Venta registrada exitosamente!", "", "success");
        // Envía los datos al backend
        dispatch(createSales({ selectedCustomersIds, filteredRows }));
      } else if (result.isDenied) {
        Swal.fire("La venta no se registró.", "", "info");
      }
    });
  };

  return (
    <div className="bg-cover bg-center h-screen select-none bg-gray-100 ">
      <div className="flex flex-col h-screen rounded-lg shadow-xl items-center select-none bg-white mx-auto my-auto w-2/4">
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
