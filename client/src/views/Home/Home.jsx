import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStockPopsicle } from "../../redux/actions/actions";
import CircularIndeterminate from "../../components/spinner/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stock = useSelector((state) => state.stockPop);
  const { data } = stock;
  const MAX_DESCRIPTION_LENGTH = 20; // Número máximo de caracteres para la descripción

  const paletas = data
    ? data.map((pop) => {
        try {
          return {
            id: pop.id,
            image: pop.Paletum.image,
            nombre_paleta: pop.nombre_paleta,
            descripcion: pop.Paletum.descripcion,
            Tipo: pop.TipoDePaletum.nombre,
            cantidad: pop.cantidad,
            precio_unitario: pop.precio_unitario,
            peso_unitario: pop.peso_unitario,
            unidad_medida: pop.unidad_medida,
            precio: pop.precio.toFixed(2),
          };
        } catch (error) {
          console.error("Error decoding image data:", error);
        }
      })
    : [];

  useEffect(() => {
    dispatch(getStockPopsicle());
  }, [dispatch]);

  const truncateDescription = (description) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
    }
    return description;
  };



  return (
    <>
      {data && (
        <div className="w-full  py-16 select-none h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-500">
              Paletas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paletas ? (
                paletas.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:shadow-red-500 transition duration-300"
                  >
                    <img
                      className="w-full h-64 object-cover"
                      src={`data:image/png;base64,${item.image}`}
                      alt="Imagen de ejemplo"
                      onClick={() => navigate(`/showPopsicle/${item.id}`)}
                    />

                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.nombre_paleta}
                      </h3>
                      <p
                        className="text-gray-700 mb-4 line-clamp"
                        title={item.descripcion}
                      >
                        {truncateDescription(item.descripcion)}
                      </p>
                      <p className="text-gray-700 py-2">
                        ({item.cantidad} Disponibles)
                      </p>
                      <div className="flex justify-between">
                        <div className="py-2 mb-5">
                          <span className="bg-gray-200 rounded-full px-3 text-sm font-semibold text-gray-700 py-3">
                            Peso {item.peso_unitario} {item.unidad_medida}
                          </span>
                        </div>
                        <div className="py-2 mb-5">
                          <span className="bg-gray-200 rounded-full px-3 text-sm font-semibold text-gray-700 py-3">
                            {item.Tipo}
                          </span>
                        </div>
                      </div>
                      <p className="text-2xl mb-5 text-center font-bold text-gray-800">
                        Precio: ${item.precio}
                      </p>
                      <button
                        className="bg-blue-500 w-full justify-center items-center text-center text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={() => {
                          const telefono = "+584144151683"; // Número de teléfono al que deseas enviar el mensaje
                          const mensaje = `¡Hola! Me interesa el producto: ${item.nombre_paleta}. Descripción: ${item.descripcion}. Precio: $${item.precio}.`;
                          const url = `https://wa.me/${telefono}?text=${encodeURIComponent(
                            mensaje
                          )}`;
                          window.open(url, "_blank");
                        }}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <CircularIndeterminate />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
