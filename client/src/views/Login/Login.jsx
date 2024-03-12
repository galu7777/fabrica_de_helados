import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { signin } from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./Login.style.css";
import InputAdornment from "@mui/material/InputAdornment";

function Login() {
  const navigate = useNavigate();
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
      console.log(cUser)
      await dispatch(signin(cUser));
      Swal.fire({
        width: "20em",
        title: "Sesion iniciada.",
        showConfirmButton: false,
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
      navigate("/home");
    } catch (error) {
      Swal.fire({
        width: "20em",
        title: "No se pudo iniciar sesion",
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
    <div className="body-login bg-red-400">
      <div className="login-container flex content-center">
        <div className="container flex h-1/2  justify-center">
          <div className="login-div bg-white rounded-lg shadow-2xl ">
            <h1 className="text-2xl font-bold text-center text-[#9b1028]">
              Iniciar Sesión
            </h1>
            {/* {error && <p>{error}</p>} */}

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="div-inputs">
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={cUser.email}
                  onChange={handleChange}
                  type="text"
                  name="email"
                  id="email"
                />
              </div>

              <div className="div-inputs">
                <TextField
                  label="password"
                  variant="outlined"
                  fullWidth
                  value={cUser.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
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

              <div className="w-full flex justify-center p-3">
                <button type="submit" className="btn-is">
                  Iniciar sesión
                </button>
              </div>
            </form>
            <p>
              ¿No tienes una cuenta?{" "}
              <Link className="text-blue-500 font-semibold hover:text-indigo-700" to="/register">
                Regístrate
              </Link>
            </p>
          </div>
        </div>

        <div className="login-image-div"></div>
      </div>
    </div>
  );
}

export default Login;
