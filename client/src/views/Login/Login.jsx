import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { signin } from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./Login.style.css";
import InputAdornment from "@mui/material/InputAdornment";

function Login() {
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [error, setError] = useState("");
  // const [currentUser, setCurrentUser] = useState({});

  const [cUser, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   if (usuarioActual) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signin(cUser));
      Swal.fire({
        width: "20em",
        title: "Sesion iniciada.",
        showConfirmButton: false,
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
     window.location.href = "/home";
    } catch (error) {
      const { response } = error
      Swal.fire({
        width: "20em",
        title: `${response.data.data}`,
        text: "No se pudo iniciar sesion",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/naranja.jpeg')" }}
    >
      <div className="flex">
        <div className="flex-1"></div>
        <div className="flex-1">
          <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-md shadow-md h-2/4 w-2/4 p-8">
              <form className="p-6  " onSubmit={handleSubmit}>
                <h1 className="text-indigo-600 text-2xl font-bold text-center">
                  Iniciar Sesión
                </h1>
                <div className="mb-6 px-2 mt-10">
                  <TextField
                    label="Email"
                    value={cUser.email}
                    variant="outlined"
                    fullWidth
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
                    value={cUser.password}
                    variant="outlined"
                    fullWidth
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

                <hr className="espacio"></hr>
                <div className="flex justify-center content-center w-full">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-3.5 hover:bg-indigo-600  py-2.5 text-sm font-semibold text-white shadow-sm "
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
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="linkR text-center hover:text-indigo-600"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
