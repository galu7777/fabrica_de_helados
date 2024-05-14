import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEstadisticasVentas } from "../../redux/actions/actions";
import VentaMes from "./VentaMes";
import TopCustomer from "./TopCustomer";
import { ConciPopsicle } from "./ConciPopsicle";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export function Estadisticas() {
  const dispatch = useDispatch();
  const estadistica = useSelector((state) => state.estadisticas);
  const dataEstad = estadistica.data;

  useEffect(() => {
    dispatch(getEstadisticasVentas());
  }, [dispatch]);

  let data = {};
  let options = {};
  if (!dataEstad) {
    return <div>Cargando...</div>;
  } else {
    const nameMostSold = dataEstad.mostSold.nombre_paleta;
    const amountMostSold = dataEstad.mostSold.total_cantidad_salida;
    const nameLeastSold = dataEstad.leastSold.nombre_paleta;
    const amountLeastSold = dataEstad.leastSold.total_cantidad_salida;

    data = {
      labels: ["2024-05"],
      datasets: [
        {
          type: "bar",
          label: ` ${nameLeastSold} `,
          data: [amountLeastSold],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          type: "bar",
          label: ` ${nameMostSold}`,
          data: [amountMostSold],
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Verde
          borderColor: "rgba(75, 192, 192, 1)", // Verde
          borderWidth: 1,
        },
      ],
    };
    options = {
      responsive: true,

      plugins: {
        title: {
          display: true,
          text: "Estadísticas de Paleta",
        },
      },
      layout: {
        height: 200, // Establecer la altura aquí
      },
    };
  }
  const nameMostSold = dataEstad.mostSold.nombre_paleta;
  const amountMostSold = dataEstad.mostSold.total_cantidad_salida;
  const nameLeastSold = dataEstad.leastSold.nombre_paleta;
  const amountLeastSold = dataEstad.leastSold.total_cantidad_salida;

  return (
    <>
      <div className="bg-blue-50 h-screen select-none flex flex-col lg:flex-row">
        <div className="flex flex-col h-3/4 mt-4  ">
          <div className="bg-white mb-5 shadow-2xl rounded-md h-1/4">
            <div className="ml-20 text-left">
              <p className="text-gray-600 font-normal py-8 text-2xl">
                Total de Ventas
              </p>
              <VentaMes />
            </div>
          </div>
          <div className="bg-white shadow-2xl rounded-md h-full">
            <TopCustomer />
          </div>
        </div>
        <div className="p-4 flex-grow bg-gray-50 ml-5 shadow-2xl rounded-md  h-3/4 mt-4">
          <div className="bg-white ">
            <div className="p-8">
              <div className="ml-20 text-left">
                <p className="text-gray-600 font-normal text-2xl">
                  Estadísticas de Ventas
                </p>
              </div>
              <div className="h-80 flex justify-center items-center">
                <Bar data={data} options={options} />
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-center items-center">
                <div className="flex items-center">
                  <p className="text-gray-500 font-medium mr-2">
                    <span className="border-1 border rounded-2xl py-2 border-green-500 p-2 text-xs font-semibold bg-green-100 text-green-500 bg-opacity-100">
                      más vendidas
                    </span>{" "}
                    {nameMostSold} : {amountMostSold}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-500 font-medium">
                    <span className="border-1 border rounded-2xl py-2 border-red-500 p-2 text-xs font-semibold bg-red-100 text-red-500 bg-opacity-100">
                      menos vendidas
                    </span>{" "}
                    {nameLeastSold} : {amountLeastSold}
                  </p>
                </div>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 h-full -mt-40 select-none mb-10">
        <div className="w-full rounded-lg mt-4 bg-white h-screen">
          <ConciPopsicle />
        </div>
      </div>
    </>
  );
}
