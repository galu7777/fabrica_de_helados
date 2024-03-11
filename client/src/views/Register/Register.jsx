import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.style.css";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { registerNewUser } from "../../redux/actions/actions";

function Register() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.newUser)
  const navigate = useNavigate();

  const [input, setInput] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

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
          title: "Este usuario ya esta registrado."
        });
      }
  };

  return (
    <div className="w-full h-screen z-30 bg-red-400 flex content-center">
      <div className="register-form bg-gray-300">
        <form className="w-full p-6" onSubmit={handleSubmit}>
          <h1 className="register-title-h1-prop text-2xl font-bold text-center">Registrarse</h1>
          
          <div className="mb-6 px-2">
            <label htmlFor="nombre" className="form-label text-center my-[35px] ">
              Nombre
            </label>
            <input
              name="nombre"
              value={input.nombre}
              onChange={handleChange}
              type="text"
              className="form-register-control"
              placeholder="Miguel"
            />
            {/* {error.nombre && <p className="error-inputs text-center">{error.nombre}</p>} */}
          </div>

          <div className="mb-6 px-2">
            <label htmlFor="apellido" className="form-label text-center">
              Apellido
            </label>
            <input
              name="apellido"
              value={input.apellido}
              onChange={handleChange}
              type="text"
              className="form-register-control"
              placeholder="Velasco"
            />
            {/* {error.apellido && <p className="error-inputs text-center">{error.apellido}</p>} */}
          </div>

          <div className="mb-6 px-2">
            <label htmlFor="email" className="form-label text-center">
              Email
            </label>
            <input
              name="email"
              value={input.email}
              onChange={handleChange}
              type="email"
              className="form-register-control"
              placeholder="ejem...@tonygelati.com"
            />
            {/* {error.email && <p className="error-inputs text-center">{error.email}</p>} */}
          </div>

          <div className="mb-6 px-2">
            <label htmlFor="password" className="form-label text-center">
              Contraseña
            </label>
            <div>
              <input
                name="password"
                value={input.password}
                onChange={handleChange}
                type="password"
                className="form-register-control"
                placeholder="********"
              />
            </div>
            {/* {error.password && <p className="error-inputs text-center">{error.password}</p>} */}
          </div>
          
          <hr className="espacio"></hr>
          <div className='flex justify-center content-center w-full'>
            <button type="submit" className="btn-register">
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
        <p>
          Ya tienes una cuenta?{" "}
          <Link to="/login" className="linkR text-center">
            iniciar Sesion
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;