import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { signin } from "../../redux/actions/actions";
import "./Login.style.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const [cUser, setUser] = useState({
    email: "",
    password: "",
  });

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
    <div className="body-login bg-gray-200">
      <div className="login-container flex content-center">
        <div className="login-div bg-gray-300">
          <h1 className="text-2xl font-bold text-center text-[#9b1028]">Iniciar Sesión</h1>
          {error && <p>{error}</p>}

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="div-inputs">
              <label htmlFor="email" className="lbl-title">
                Email
              </label>
              <input
                value={cUser.email}
                type="text"
                name="email"
                id="email"
                className="form-control"
                onChange={handleChange}
                placeholder="youremail@company.com"
              />
            </div>

            <div className="div-inputs">
              <label htmlFor="password" className="lbl-title">
                Contraseña
              </label>
              <input
                value={cUser.password}
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handleChange}
                placeholder="*************"
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
            <Link className="link" to="/register">
              Regístrate
            </Link>
          </p>
        </div>

        <div className="login-image-div"></div>
      </div>
    </div>
  );
}

export default Login;