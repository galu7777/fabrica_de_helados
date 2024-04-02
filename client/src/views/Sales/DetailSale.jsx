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


  return (
    <>
      <Box
        className="select-none"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper className="w-full" elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Factura de Venta</Typography>
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
              {data?.Cliente?.razon_social}
            </div>
            <div className="mb-2 mt-2 ">
              <span className="text-base font-semibold text-gray-900">
                {" "}
                Domicilio Fiscal:{" "}
              </span>{" "}
              {data?.Cliente?.direccion}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  {" "}
                  <span className="text-base font-semibold text-gray-900">
                    {" "}
                    Telefono:{" "}
                  </span>{" "}
                  {data?.Cliente?.telefono}
                </div>
              </div>

              <div className="text-lg font-normal">
                <div>
                  <span className="text-base font-semibold text-gray-900">
                    {" "}
                    Cédula/RIF:{" "}
                  </span>{" "}
                  {data?.Cliente?.cod_dni} {data?.Cliente?.cedula_rif}
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
                  <TableCell align="center">Precio</TableCell>
                  <TableCell align="center">Monto USD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{data?.cantidad}</TableCell>
                  <TableCell align="center">    {data?.nombre_paleta}</TableCell>
                  <TableCell align="center">{data?.precio}</TableCell>
                  <TableCell align="center">{data?.monto_usd}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
