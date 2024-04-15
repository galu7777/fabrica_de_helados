import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { validationNumber } from "../../../validations/validationNumber";
import { validatedValue } from "../../../validations/validatedValue ";
import { createCustomer } from "../../../redux/actions/actions";
import "./style.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function Modalformcustomers() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

    const refrescarPagina = () => {
      window.location.reload();
    };

  const [form, setForm] = useState({
    razon_social: "",
    direccion: "",
    cod_dni: "V",
    cedula_rif: "",
    telefono: "",
  });
  const [telSelect, setTelSelect] = useState({
    uno: "0414",
    dos: "",
  });

  const handleTel = (e) => {
    const { name, value } = e.target;
    if (name === "dos" && !validationNumber(value)) {
      setForm({ ...form, [name]: validatedValue(value) });
      return;
    }

    setTelSelect({ ...telSelect, [name]: value });
  };

  useEffect(() => {
    const telefono = telSelect.uno + telSelect.dos;
    setForm({ ...form, telefono });
  }, [telSelect]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el nombre del campo es 'cedula_rif' y el valor no es un número, actualizamos el estado con el valor validado
    if (name === "cedula_rif" && !validationNumber(value)) {
      setForm({ ...form, [name]: validatedValue(value) });
      return;
    }

    setForm({ ...form, [name]: value });
  };
  useEffect(() => {}, [form]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.razon_social.trim() || !isNaN(form.razon_social)) {
    // Muestra una alerta indicando el error
    Swal.fire({
      title: "Verifica la información.",
      text: "Por favor, ingresa un nombre de Cliente válido.",
      icon: "warning",
    });
  } else {
    // Esperar 100ms antes de mostrar la alerta
    await new Promise((resolve) => setTimeout(resolve, 100));

    Swal.fire({
      title: "¿Quieres registrar este Cliente?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      denyButtonText: `No registrar`,
      focusConfirm: false, // Evita que se enfoque automáticamente el botón de confirmación
      customClass: {
        container: "my-swal", // Clase personalizada para el contenedor de SweetAlert
      },
      backdrop: true, // Hace que el fondo sea clicleable
      allowOutsideClick: false, // Evita que se cierre haciendo clic fuera del mensaje
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleClose();
        try {
          Swal.fire("Registro Exitoso!", "", "success");
          await dispatch(
            createCustomer({
              razon_social: form.razon_social.toUpperCase(),
              direccion: form.direccion.toUpperCase(),
              telefono: form.telefono,
              cod_dni: form.cod_dni,
              cedula_rif: form.cedula_rif,
            })
          );
          setTimeout(() => {
            refrescarPagina();
          }, 1000);
        } catch (error) {
          // Captura cualquier error que ocurra durante el envío de datos
          const { response } = error;

          Swal.fire({
            width: "40em",
            title: `${response.data.data}`,
            text: "No se pudo Guardar El Cliente",
            icon: "error",
            showConfirmButton: false,
            timer: 4000,
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Los Cambios no se registraron.", "", "info");
      }
    });
  }
};



  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Crear Cliente
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
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
                      label="RIF O CEDULA DE IDENTIDAD"
                      variant="outlined"
                      type="text"
                      fullWidth
                      value={form.cedula_rif}
                      onChange={handleChange}
                      name="cedula_rif"
                      required
                      maxLength={10}
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
                      value={telSelect.uno}
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
                      type="text"
                      onChange={handleTel}
                      name="dos"
                      value={telSelect.dos}
                      required
                    />
                  </div>
                </div>
              </div>
              <Button color="error" variant="outlined" fullWidth type="submit">
                Aceptar
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
