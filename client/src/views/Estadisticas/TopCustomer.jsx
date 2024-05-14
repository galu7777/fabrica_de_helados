import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { getTopCustomer } from "../../redux/actions/actions";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

export default function TopCustomer() {
  const dispatch = useDispatch();
  const topCustomer = useSelector((state) => state.topCustomer);
  const { data: dataTop } = topCustomer;

  // Estado para almacenar los datos del cliente mejor clasificado
  const [form, setForm] = useState({
    id_cliente: "",
    razon_social: "",
    cod_dni: "",
    cedula_rif: "",
    total_comprado: "",
  });


  useEffect(() => {
      dispatch(getTopCustomer());
  }, [dispatch,]);

  useEffect(() => {
    // Actualizar el estado 'form' cuando se obtengan los datos del cliente mejor clasificado
    if (dataTop) {
      setForm({
        id_cliente: dataTop.id_cliente,
        razon_social: dataTop.razon_social,
        cod_dni: dataTop.cod_dni,
        cedula_rif: dataTop.cedula_rif,
        total_comprado: dataTop.total_comprado.toFixed(2),
      });
    }
  }, [dataTop]);

  return (
    <div className="ml-20 text-left ">
      <p className="text-gray-600 font-normal py-8 text-2xl">Mejor Cliente</p>
      <div className="justify-between flex ">
        <div className="text-center">
          <div>
            <EmojiEventsRoundedIcon
              sx={{ color: "#FFA500", fontSize: "3rem" }}
            />
          </div>

          <p className="text-gray-500 text-lg my-1">{form.razon_social}</p>

          <p className="text-gray-500 text-lg">
            {form.cod_dni} {form.cedula_rif}
          </p>
        </div>

        <div>
          <img
            className="h-48 -mt-10 w-36 object-contain text-indigo-600"
            src="/icons/customers.png"
            alt="Wallet Icon"
          />
        </div>
      </div>

      <Divider />
      <p className="text-gray-500 text-2xl my-5">Monto total Compra en Helados</p>
      <div className="flex ">
        <div>
          <p className="text-4xl">
            <img
              className="h-10 w-16 object-contain text-indigo-600"
              src="/icons/helado.svg"
              alt="Wallet Icon"
            />{" "}
          </p>
        </div>
        <div className="text-4xl mb-10">$ {form.total_comprado}</div>
      </div>
    </div>
  );
}
