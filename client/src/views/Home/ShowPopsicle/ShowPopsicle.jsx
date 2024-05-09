import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailPopsicle } from "../../../redux/actions/actions";
import {Typography} from "@mui/material";
export default function ShowPopsicle() {
  const { id } = useParams();
  const showPopsicle = useSelector((state) => state.popsicleDetail);
  const { data } = showPopsicle;
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailPopsicle(id));
  }, [dispatch, id]);

  return (
    <>
      {data && (
        <>
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
            <div className="flex-1 md:pr-8 h-auto rounded-2xl bg-gray-50">
              <div className="flex">
                <div className="flex-1">
                  <p>  </p>
                </div>
                <div className="flex-1">
                  <div
                    className="mx-40"
                    style={{
                      width: "380px",
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
                      className="w-full h-96 object-contain rounded-2xl"
                      src={`data:image/png;base64,${data.image}`}
                      alt="Imagen de ejemplo"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8 rounded-2xl p-2 bg-gray-200 flex-1 h-96">
              <div className="flex flex-col justify-between h-full">
                <div className="container">
                  <h2 className="text-4xl font-bold mb-4">{data.nombre}</h2>
                  <h3 className="text-2xl font-semibold mb-2">
                    Detalles del producto
                  </h3>
                  <p className="text-gray-800 mb-1 text-lg">
                    {data.descripcion}
                  </p>
                  <div>
                    <p className="text-gray-800 py-1 text-lg">
                      {data.description}
                    </p>

                    <p className="text-gray-700 text-lg py-1">
                      Peso:{" "}
                      <span className="font-semibold">
                        {data.peso} {data.unidad_medida} {"  "}{" "}
                      </span>
                      Categoría:{" "}
                      <span className="font-semibold">
                        {data.TipoDePaletum.nombre}
                      </span>
                    </p>

                    <div className="mt-1">
                      <p className="font-semibold text-2xl">
                        Nota:{" "}
                        <span className="font-semibold">
                          {" "}
                          La Compra minima es de 15 Paletas
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="justify-center items-center py-2">
                    <div>
                      <p className="text-4xl font-bold text-gray-700">
                        Precio: ${data.precio.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-center mt-1">
                      <a
                        href="#"
                        className="bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 transition duration-300 text-lg"
                      >
                        Comprar ahora
                      </a>
                    </div>
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
        </>
      )}
    </>
  );
}
