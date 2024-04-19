import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVentaMes } from "../../redux/actions/actions";
import Divider from "@mui/material/Divider";


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
    <div className="flex flex-col items-center">
      <div className="flex  w-full  ">
        <div>
          <div className="p-4 bg-indigo-100 rounded-md">
            <img
              className="h-10 w-10 object-contain text-indigo-600"
              src="/icons/wallet.svg"
              alt="Wallet Icon"
            />
          </div>
        </div>
        <div className="mx-2">
            <p className="text-gray-500">Número de Ventas</p>
          <p className="text-4xl">
            $ {dataVenta ? dataVenta.totalAmount : "0"}
          </p>
        </div>
      </div>

      <div className="w-full mt-5">
        <Divider />
      </div>
    </div>
  );
}
