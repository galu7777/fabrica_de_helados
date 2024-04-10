import  { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Box, Typography, Input } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputAdornment from "@mui/material/InputAdornment";
import SearchPopsicles from "./SearchPopsicles";
import { detailPopsicle, editPopsicle } from "../../../redux/actions/actions";

export default function EditPopsicle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const popsicle = useSelector((state) => state.popsicleDetail);
  const { data } = popsicle;
  const [selectedPopsicle, setSelectedPopsicle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    image: "",
    peso: "",
    descripcion: "",
    precio: "",
  });

  useEffect(() => {
    dispatch(detailPopsicle(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      setForm({
        nombre: data.nombre,
        image: data.image,
        peso: data.peso,
        descripcion: data.descripcion,
        precio: data.precio,
      });
      setSelectedImage(data.image);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePopsicleSelect = (popsicle) => {
    setSelectedPopsicle(popsicle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nombre ||
      !form.peso ||
      !form.descripcion ||
      !form.precio ||
      selectedPopsicle === null ||
      selectedPopsicle.id === null ||
      selectedImage === null
    ) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, complete todos los campos",
        icon: "warning",
      });
    } else {
      // Crea un objeto FormData para enviar al servidor
      const formData = new FormData();
      formData.append("nombre", form.nombre.toUpperCase());
      formData.append("peso", form.peso);
      formData.append("descripcion", form.descripcion.toUpperCase());
      formData.append("id_tipo_paleta", selectedPopsicle.id);
      formData.append("precio", form.precio);
      formData.append("image", selectedImage); // Agrega la imagen al FormData

      Swal.fire({
        title: "¿Quieres registrar esta Paleta?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Registro Exitoso!", "", "success");
          // Ahora puedes enviar el formData al servidor
          dispatch(editPopsicle(formData));
          navigate("/Paletas");
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
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
            Crea una Nueva Paleta
          </h2>
          <form onSubmit={handleSubmit} className="w-full p-8 ">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                >
                  <label
                    htmlFor="file-input"
                    style={{ width: "100%", height: "170px" }}
                    className="border-2 border-white border-dashed rounded-lg cursor-pointer bg-white hover:bg-red-100 dark:bg-white dark:hover:bg-red-100 dark:border-red-600 dark:hover:border-red-500"
                  >
                    {selectedImage && (
                      <img
                        src={
                          selectedImage.startsWith("data:image/")
                            ? selectedImage
                            : `data:image/jpeg;base64,${selectedImage}`
                        }
                        alt="Selected"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <Input
                      id="file-input"
                      type="file"
                      inputProps={{ accept: ".png, .jpg, .jpeg, .gif" }}
                      onChange={handleInputChange}
                      sx={{ display: "none" }}
                    />
                  </label>
                </Box>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <TextField
                  label="Nombre de la paleta"
                  variant="outlined"
                  fullWidth
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  name="nombre"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <SearchPopsicles onPopsicleTypeSelect={handlePopsicleSelect} />
              </div>
            </div>

            <div className="flex -mx-3 mb-6">
              <div className="w-full px-3 flex">
                <div className="w-3/4 mr-4">
                  <div>
                    <TextField
                      id="outlined-adornment-weight"
                      variant="outlined"
                      type="number"
                      fullWidth
                      label="Precio"
                      value={form.precio}
                      onChange={handleChange}
                      name="precio"
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="">
                  <TextField
                    id="outlined-adornment-weight"
                    variant="outlined"
                    type="number"
                    label="Peso"
                    fullWidth
                    value={form.peso}
                    onChange={handleChange}
                    name="peso"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">GRMS</InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <TextField
                  label="Descripcion"
                  variant="outlined"
                  value={form.descripcion}
                  onChange={handleChange}
                  fullWidth
                  name="descripcion"
                  required
                />
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