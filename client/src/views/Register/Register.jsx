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
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfimPassword] = useState(false);
    const [repitPassword, setrepitPassword] = useState('');



  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (Object.keys(error).length === 0) {
       console.log(input);
    const newUser = { ...input };
    if (repitPassword !== input.password) {
       Swal.fire({
         title: "Verifica la informacion.",
         text: "Por favor, verifique que las contraseñas sean iguales",
         icon: "warning",
       });

    }else {
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

    }

  };

  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen flex items-center justify-center select-none"
        style={{ backgroundImage: "url('/rosa.jpg')" }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4 md:mb-0">
            <div className="flex justify-center items-center">
              <div className="bg-white rounded-md shadow-md p-8 max-w-md w-full">
                <form className="w-full p-6" onSubmit={handleSubmit}>
                  <h1 className="text-pink-500 text-2xl font-bold text-center mb-8">
                    Registrarse
                  </h1>

                  <div className="mb-4">
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
                  </div>

                  <div className="mb-4">
                    <TextField
                      label="Apellido"
                      variant="outlined"
                      fullWidth
                      value={input.apellido}
                      onChange={handleChange}
                      required
                      type="text"
                      name="apellido"
                      id="apellido"
                    />
                  </div>

                  <div className="mb-4">
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={input.email}
                      onChange={handleChange}
                      type="text"
                      required
                      name="email"
                      id="email"
                    />
                  </div>

                  <div className="mb-4">
                    <TextField
                      label="Contraseña"
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
                  </div>

                  <div className="mb-4">
                    <TextField
                      label="Repetir contraseña"
                      variant="outlined"
                      fullWidth
                      value={repitPassword}
                      required
                      onChange={(e) => setrepitPassword(e.target.value)}
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
                  </div>

                  <div className="flex justify-center mt-10">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-gradient-to-r from-blue-500 to-pink-400 hover:from-pink-500 hover:to-indigo-600"
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
                <hr className="my-1" />
                <p className="text-center">
                  Ya tienes una cuenta?{" "}
                  <Link to="/login" className="linkR text-center">
                    iniciar Sesion
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/4 hidden md:block">
            <div className="bg-white rounded-md shadow-md w-96"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
