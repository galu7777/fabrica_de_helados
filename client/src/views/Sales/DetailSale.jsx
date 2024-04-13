import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsales } from "../../redux/actions/actions";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

export default function DetailSale() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const sale = useSelector((state) => state.detailsale);
  const { data } = sale;
  console.log(data);

  useEffect(() => {
    dispatch(detailsales(id));
  }, [dispatch, id]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  // Calcular el total de monto USD y la tasa promedio

  return (
    <>
      <Box
        className="select-none"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {data && (
          <Paper className="w-full" elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography className="text-red-600 font-extrabold" variant="h5">
                NOTA DE ENTREGA
              </Typography>
              <IconButton onClick={handlePrint}>
                <PrintIcon />
              </IconButton>
            </Box>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
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

              <div className="text-lg font-semibold">
                <span>Fecha {formatDate(data?.updatedAt)}</span>
              </div>
            </div>
            <div className="text-lg font-semibold text-right">
              {/* <span>Numero de Factura:</span>
            {data?.id} */}
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black mb-2">
                Don Paleton, C.A.
              </h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-1">
                R.I.F: J-41215200-9
              </h2>
              <p className="text-base font-medium text-gray-600">
                Calle Principal, Hacienda Higuerote Local Nro S/N, Sector El
                Polvero, Pueblo de San Diego, Municipio de San Diego, Valencia
                Carabobo, 2006
              </p>
            </div>

            <div className=" border-4 rounded-xl p-2">
              <div className="mt-2">
                <span className="text-base font-semibold text-gray-900">
                  {" "}
                  Nombre o Razón Social:{" "}
                </span>
                {data?.Cliente.razon_social}
              </div>
              <div className="mb-2 mt-2 ">
                <span className="text-base font-semibold text-gray-900">
                  {" "}
                  Domicilio Fiscal:{" "}
                </span>{" "}
                {data?.Cliente.direccion}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div>
                    {" "}
                    <span className="text-base font-semibold text-gray-900">
                      {" "}
                      Telefono:{" "}
                    </span>{" "}
                    {data?.Cliente.telefono}
                  </div>
                </div>

                <div className="text-lg font-normal">
                  <div>
                    <span className="text-base font-semibold text-gray-900">
                      {" "}
                      Cédula/RIF:{" "}
                    </span>{" "}
                    {data?.Cliente.cod_dni} {data?.Cliente.cedula_rif}
                  </div>
                </div>
              </div>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Nombre de la Paleta</TableCell>
                    <TableCell align="center">Precio Unitario</TableCell>
                    <TableCell align="center">Monto USD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.paletasCompradas.map((venta, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {venta.ClienteVenta.cantidad}
                      </TableCell>
                      <TableCell align="center">
                        {venta.nombre_paleta}
                      </TableCell>
                      <TableCell align="center">
                        {venta.ClienteVenta.precio}
                      </TableCell>
                      <TableCell align="center">
                        {venta.ClienteVenta.monto_usd}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="p-4 border-t border-gray-200 bg-white shadow-md rounded-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <p className="text-gray-500 font-medium">Total de paletas:</p>
                  <p className="text-lg font-bold text-amazon-orange ml-2">
                    {data.cantidad_total}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-500 font-medium">Total a pagar:</p>
                  <p className="text-2xl font-bold text-amazon-orange ml-2">
                    ${data.monto_total}
                  </p>
                </div>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-medium">
                  Tasa: <strong className="text-black"> {data.tasa} </strong>
                </p>
                <div className="text-right">
                  <p className="text-gray-500 font-medium">
                    Total a pagar en BS:{" "}
                    <span className="text-lg font-bold text-black">
                      {(data.monto_total * data.tasa).toLocaleString("es-VE", {
                        maximumFractionDigits: 2,
                      })}{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Paper>
        )}
      </Box>
    </>
  );
}
