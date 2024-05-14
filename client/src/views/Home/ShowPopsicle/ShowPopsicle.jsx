import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStockPopsicleDetail } from "../../../redux/actions/actions";
import {Typography} from "@mui/material";
export default function ShowPopsicle() {
  const { id } = useParams();
  const showPopsicle = useSelector((state) => state.detail_stockpop);
  const { data } = showPopsicle;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockPopsicleDetail(id));
  }, [dispatch, id]);

  return (
    <>
      {data && (
        <div className="bg-blue-50 select-none">
          <div>
            <div className="flex items-center justify-center">
              <img
                src={"/tonygelati.png"}
                alt="Logo"
                style={{ width: "80px", height: "50px" }}
              />
              <Typography
                sx={{ marginTop: 2 }}
                variant="h4"
                gutterBottom
                className="font-bold py-5 text-center items-start text-red-600"
              >
                Tony Gelati
              </Typography>
            </div>
          </div>
          <div className="flex md:items-start md:justify-center gap-8 mt-10">
            <div className="flex-1 md:pr-8 h-auto rounded-2xl bg-gray-50 shadow-xl">
              <div className="flex">
                <div className="flex-1">
                  <p> </p>
                </div>
                <div className="flex-1">
                  <div
                    className="mx-40"
                    style={{
                      width: "450px",
                      height: "385px",
                      borderRadius: "10%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ccc",
                    }}
                  >
                    <img
                      className=" object-contain rounded-2xl"
                      src={`data:image/png;base64,${data.Paletum.image}`}
                      alt="Imagen de ejemplo"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8 rounded-2xl p-2 bg-gray-50 flex-1 h-96  shadow-xl">
              <div className="flex flex-col justify-between h-full">
                <div className="container text-gray-500">
                  <h2 className="text-4xl font-bold mb-4">
                    {data.nombre_paleta}
                  </h2>
                  <h3 className="text-lg font-semibold mb-2">
                    Detalles del producto
                  </h3>
                  <p className="text-gray-500 mb-4 text-lg font-medium">
                    {data.Paletum.descripcion}
                  </p>

                  <div>
                    <p className="text-gray-500 text-lg py-1">
                      Peso:{" "}
                      <span className="font-semibold">
                        {data.peso_unitario} {data.unidad_medida}{" "}
                      </span>
                      Categoría:{" "}
                      <span className="font-semibold">
                        {data.TipoDePaletum.nombre}
                      </span>
                    </p>
                  </div>

                  <div className=" items-center py-3">
                    <p className="text-2xl font-bold text-gray-600">
                      Precio: ${data.precio.toFixed(2)}
                    </p>
                  </div>
                  <div className="items-end text-end justify-end flex ">
                    <button
                      className="bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 transition duration-300 text-lg"
                      onClick={() => {
                        const telefono = "+584144151683"; // Número de teléfono al que deseas enviar el mensaje
                        const mensaje = `¡Hola! Me interesa el producto: ${data.nombre_paleta}. Descripción: ${data.Paletum.descripcion}. Precio: $${data.precio}.`;
                        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(
                          mensaje
                        )}`;
                        window.open(url, "_blank");
                      }}
                    >
                      Comprar ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white select-none mt-8">
            <div>
              <h2 className="text-4xl font-bold mb-2 text-center text-gray-500">
                Paletas
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
