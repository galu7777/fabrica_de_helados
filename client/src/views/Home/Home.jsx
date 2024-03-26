import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStockPopsicle } from "../../redux/actions/actions";
import CircularIndeterminate from "../../components/spinner/Spinner";

const Home = () => {
  const stock = useSelector((state) => state.stockPop);
  const { data } = stock;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStockPopsicle());
  }, [dispatch]);

  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-500">
          Paletas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data ? (
            data.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:shadow-red-500 transition duration-300"
              >
                <img
                  className="w-full h-64 object-cover"
                  src="/rojo.jpg"
                  alt="Imagen de ejemplo"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.nombre_paleta}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>

                  <p className="text-gray-700 py-2">
                    ({item.cantidad} Disponibles)
                  </p>
                  <div className="py-2 mb-5">
                    <span className="bg-gray-200 rounded-full px-3 text-sm font-semibold text-gray-700 py-3">
                      Peso {item.peso_unitario} {item.unidad_medida}
                    </span>
                  </div>

                  <p className="text-2xl mb-5 text-center font-bold text-gray-800">
                    Precio: ${item.precio}
                  </p>
                  <button className="bg-blue-500 w-full justify-center items-center text-center text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
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
  );
};

export default Home;
