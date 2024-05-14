import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { getStockMateriaPrima } from "../../redux/actions/actions";

const LowStockAlert = () => {
    const dispatch = useDispatch();
    const stockMp = useSelector((state) => state.stockMP);
    const data = stockMp.data;

    useEffect(() => {
        dispatch(getStockMateriaPrima());
    }, [dispatch]);
    useEffect(() => {
        if (data) {
            const alerts = [];
            data.forEach((item) => {
                if (item.cantidad < 10) {
                    alerts.push(
                        `El ingrediente ${item.Ingrediente.nombre} tiene una cantidad de ${item.cantidad.toFixed(2)} ${item.unidad_medida}\n\n`
                    );

                }
            });

            if (alerts.length > 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Poca materia prima",
                    html: alerts.join(`<p class="mb-3 mt-5 text-left">`),
                    confirmButtonText: "Aceptar",
                    customClass: {
                        popup: "w-auto h-auto",
                    },
                });
            }
        }
    }, [data]);


    return null;
};
export default LowStockAlert;
