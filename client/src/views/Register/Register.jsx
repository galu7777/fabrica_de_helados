import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.style.css";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { registerNewUser } from "../../redux/actions/actions";
import InputAdornment from "@mui/material/InputAdornment";


function Register() {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.newUser)
  const navigate = useNavigate();

  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    repitPassword: "",
  });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfimPassword] = useState(false);


  // const [error, setError] = useState({
  //   nombre: "",
  //   apellido: "",
  //   email: "",
  //   password: "",
  // });

  // const validate = (input) => {
  //   let error = {};

  //   if (input.nombre.trim().length === 0) {
  //     error.nombre = "Ingrese un nombre.";
  //   } else if(!/^[a-zA-Z\s]+$/.test(input.nombre)) {
  //     error.nombre = "El nombre solo debe contener letras y espacios.";
  //   }

  //   if (input.apellido.trim().length === 0) {
  //     error.apellido = "Ingrese un apellido.";
  //   } else if (!/^[a-zA-Z\s]+$/.test(input.apellido)) {
  //     error.apellido = "El apellido solo debe contener letras y espacios.";

  //   if (input.email.trim().length === 0) {
  //     error.email = "Ingrese un correo electrónico.";
  //   } else if(!/\S+@\S+\.\S+/.test(input.email)) {
  //     error.email = "Ingrese un correo electrónico válido.";
  //   }

  //   if (input.password.trim().length === 0) {
  //     error.password = "Ingrese una contraseña.";
  //   } else if(!/(?=.*[A-Z])(?=.*\d)/.test(input.password)) {
  //     error.password =
  //       "La contraseña debe contener al menos una mayúscula y un número.";
  //   }

  //   return error;
  // };

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    // setError(
    //   validate({
    //     ...input,
    //     [event.target.name]: event.target.value,
    //   })
    // );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (Object.keys(error).length === 0) {
    const newUser = { ...input };
    try {
      await dispatch(registerNewUser(newUser));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "¡El usuario se registró exitosamente!",
        showConfirmButton: false,
        timer: 2000,
      });
      setInput({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        direction_shipping: "",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Este usuario ya esta registrado.",
      });
    }
  };

  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/rosa.jpg')" }}
      >
        <div className="flex">
          <div className="flex-1">
            <div className="flex justify-center items-center h-screen">
              <div className="bg-white rounded-md shadow-md h-3/4 w-2/4 p-8">
                <form className="w-full p-6 " onSubmit={handleSubmit}>
                  <h1 className="text-pink-500 text-2xl font-bold text-center">
                    Registrarse
                  </h1>

                  <div className="mb-6 px-2 mt-10">
                    <TextField
                      label="Nombre"
                      variant="outlined"
                      required
                      fullWidth
                      value={input.nombre}
                      onChange={handleChange}
                      type="text"
                      name="nombre"
                      id="nombre"
                    />

                    {/* {error.nombre && <p className="error-inputs text-center">{error.nombre}</p>} */}
                  </div>

                  <div className="mb-6 px-2">
                    <TextField
                      label="apellido"
                      variant="outlined"
                      fullWidth
                      value={input.apellido}
                      onChange={handleChange}
                      required
                      type="text"
                      name="apellido"
                      id="apellido"
                    />

                    {/* {error.apellido && <p className="error-inputs text-center">{error.apellido}</p>} */}
                  </div>

                  <div className="mb-6 px-2">
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      alue={input.email}
                      onChange={handleChange}
                      type="text"
                      required
                      name="email"
                      id="email"
                    />

                    {/* {error.email && <p className="error-inputs text-center">{error.email}</p>} */}
                  </div>

                  <div className="mb-6 px-2">
                    <TextField
                      label="contraseña"
                      variant="outlined"
                      fullWidth
                      value={input.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      id="password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityOutlinedIcon
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="cursor-pointer text-black"
                            />
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* {error.password && <p className="error-inputs text-center">{error.password}</p>} */}
                  </div>
                  <div className="mb-6 px-2">
                    <TextField
                      label="Repetir contraseña"
                      variant="outlined"
                      fullWidth
                      value={input.repitPassword}
                      required
                      onChange={handleChange}
                      type={showConfirmPassword ? "text" : "password"}
                      name="repitPassword"
                      id="repitPassword"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityOutlinedIcon
                              onClick={() =>
                                setShowConfimPassword((prev) => !prev)
                              }
                              className="cursor-pointer text-black"
                            />
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* {error.password && <p className="error-inputs text-center">{error.password}</p>} */}
                  </div>

                  <hr className="espacio"></hr>
                  <div className="flex justify-center content-center w-full">
                    <button
                      type="button"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-gradient-to-r from-blue-500 to-pink-400 hover:from-pink-500 hover:to-wite "
                    >
                      Registrarse
                    </button>
                  </div>
                  {/* {Object.keys(error).length === 0 ? (
            <div className='flex justify-center content-center w-full'>
              <button type="submit" className="btn-register">
                Registrarse
              </button>
            </div>
          ) : (
            <div className='flex justify-center content-center w-full'>
              <button type="submit" className="btn-register-dis" disabled>
                Registrarse
              </button>
            </div>
          )} */}
                </form>
                <p className="text-center">
                  Ya tienes una cuenta?{" "}
                  <Link to="/login" className="linkR text-center">
                    iniciar Sesion
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-md shadow-md w-96">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
