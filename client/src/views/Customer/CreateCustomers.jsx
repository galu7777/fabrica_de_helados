import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createCustomer } from "../../redux/actions/actions";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
export default function CreateCustomers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    razon_social: "",
    direccion: "",
    cod_dni: "",
    cedula_rif: "",
    telefono: "",
  });
  const [telSelect, setTelSelect] = useState({
    uno: "",
    dos: "",
  });
  const handleTel = (e) => {
    const { name, value } = e.target;
    setTelSelect({ ...telSelect, [name]: value });
  };

  useEffect(() => {
    const telefono = telSelect.uno + telSelect.dos;
    setForm({ ...form, telefono });
  }, [telSelect]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {

  }, [form]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.razon_social.trim() || !isNaN(form.razon_social)) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, ingresa un nombre de Cliente válido.",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar este Cliente ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Registro Exitoso!", "", "success");
          dispatch(
            createCustomer({
              razon_social: form.razon_social.toUpperCase(),
              direccion: form.direccion.toUpperCase(),
              telefono: form.telefono,
              cod_dni: form.cod_dni,
              cedula_rif: form.cedula_rif,
            })
          );
            navigate("/Clientes");
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };
  return (
    <div
      className="bg-cover bg-center h-screen select-none "
      style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="flex flex-col items-center py-10">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-1/3 mx-auto">
          <h2 className="text-2xl text-center font-bold mb-6 text-red-700">
            Crea un Nuevo Cliente
          </h2>
          <form onSubmit={handleSubmit} className="w-full p-8 ">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <TextField
                  label="Nombre del Cliente"
                  variant="outlined"
                  fullWidth
                  required
                  value={form.razon_social}
                  onChange={handleChange}
                  name="razon_social"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <TextField
                  label="Direccion"
                  variant="outlined"
                  value={form.direccion}
                  onChange={handleChange}
                  fullWidth
                  name="direccion"
                  required
                />
              </div>
            </div>
            <div className="flex -mx-3 mb-6">
              <div className="w-full px-3 flex">
                <div className="w-1/4 mr-4">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="w-full"
                    required
                    defaultValue={"V"}
                    value={form.cod_dni}
                    onChange={handleChange}
                    name="cod_dni"
                  >
                    <MenuItem value={"V"}>V</MenuItem>
                    <MenuItem value={"E"}>E</MenuItem>
                    <MenuItem value={"J"}>J</MenuItem>
                    <MenuItem value={"G"}>G</MenuItem>
                    <MenuItem value={"R"}>R</MenuItem>
                    <MenuItem value={"P"}>P</MenuItem>
                  </Select>
                </div>
                <div className="w-3/4">
                  <TextField
                    label="Cedula de Identidad"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={form.cedula_rif}
                    onChange={handleChange}
                    name="cedula_rif"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3 mb-6">
              <div className="w-full px-3 flex">
                <div className="w-1/4 mr-4">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="w-full"
                    defaultValue={""}
                    onChange={handleTel}
                    name="uno"
                    value={form.uno}
                    required
                  >
                    <MenuItem value={"0414"}>0414</MenuItem>
                    <MenuItem value={"0424"}>0424</MenuItem>
                    <MenuItem value={"0412"}>0412</MenuItem>
                    <MenuItem value={"0416"}>0416</MenuItem>
                    <MenuItem value={"0426"}>0426</MenuItem>
                  </Select>
                </div>
                <div className="w-3/4">
                  <TextField
                    label="Numero de Telefono"
                    variant="outlined"
                    fullWidth
                    type="number"
                    onChange={handleTel}
                    name="dos"
                    value={form.dos}
                    required
                  />
                </div>
              </div>
            </div>
            <Button color="error" variant="outlined" fullWidth type="submit">
              Aceptar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
