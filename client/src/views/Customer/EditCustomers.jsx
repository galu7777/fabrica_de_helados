import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { detailCustomers, editCustomers } from "../../redux/actions/actions";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { validationNumber } from "../../validations/validationNumber";
import { validatedValue } from "../../validations/validatedValue ";

const EditCustomers = () => {
  const { id } = useParams();
  const customers = useSelector((state) => state.customerDetail);
  const { data } = customers;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    razon_social: "",
    direccion: "",
    cod_dni: "",
    cedula_rif: "",
    telefono: "",
  });

  useEffect(() => {
    dispatch(detailCustomers(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (data) {
      setFormData({
        razon_social: data.razon_social,
        direccion: data.direccion,
        cod_dni: data.cod_dni,
        cedula_rif: data.cedula_rif,
        telefono: data.telefono,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
      if (name === "cedula_rif" && !validationNumber(value)) {
        setFormData({ ...formData, [name]: validatedValue(value) });
        return;
      }


    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Quieres Editar este Cliente?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      denyButtonText: "No registrar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          editCustomers(id, {
            razon_social: formData.razon_social,
            direccion: formData.direccion,
            telefono: formData.telefono,
            cod_dni: formData.cod_dni,
            cedula_rif: formData.cedula_rif,
          })
        );
        navigate("/Clientes");
        Swal.fire("Editado Exitoso!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Los Cambios no se registraron.", "", "info");
      }
    });
  };

  return (
    <div
      className="bg-cover bg-center h-screen select-none"
      style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
    >
      <div className="flex flex-col items-center py-10">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-1/3 mx-auto">
          <h2 className="text-2xl text-center font-bold mb-6 text-red-700">
            Editar Cliente
          </h2>
          <form onSubmit={handleSubmit} className="w-full p-8 ">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <TextField
                  label="Nombre del Cliente"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.razon_social}
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
                  value={formData.direccion}
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
                    value={formData.cod_dni}
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
                    label="RIF"
                    variant="outlined"
                    type="text"
                    fullWidth
                    value={formData.cedula_rif}
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
                    value={formData.telefono.slice(0, 4)}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "telefono",
                          value: `${e.target.value}${formData.telefono.slice(
                            4
                          )}`,
                        },
                      })
                    }
                    name="telefono"
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
                    value={formData.telefono.slice(4)}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "telefono",
                          value: `${formData.telefono.slice(0, 4)}${
                            e.target.value
                          }`,
                        },
                      })
                    }
                    name="telefono"
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
};

export default EditCustomers;
