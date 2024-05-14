import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVentaMes } from "../../redux/actions/actions";


export default function VentaMes() {
  const dispatch = useDispatch();
  const estadistica = useSelector((state) => state.ventaMes);
  const { data: dataVenta } = estadistica;
  // Estado para controlar si los datos se han cargado
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Solo si los datos no se han cargado, se realiza la carga
    if (!dataLoaded) {
      dispatch(getVentaMes());
      setDataLoaded(true); // Marcar los datos como cargados
    }
  }, [dispatch, dataLoaded]);


  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex justify-center md:justify-start md:mr-2 mb-4 md:mb-0">
          <div className="p-4 bg-indigo-100 rounded-md">
            <img
              className="h-10 w-10 object-contain text-indigo-600"
              src="/icons/wallet.svg"
              alt="Wallet Icon"
            />
          </div>
        </div>
        <div className="text-center md:text-left">
          <p className="text-gray-500">Número de Ventas</p>
          <p className="text-4xl">
            $ {dataVenta ? dataVenta.totalAmount.toFixed(2) : "0"}
          </p>
        </div>
      </div>

    </div>
  );
}
