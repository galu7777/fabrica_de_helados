import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import {
  getTypePopsicle,
  createTypePopsicle,
} from "../../../redux/actions/actions";
import { Box } from "@mui/material";

export default function TypePopsicle() {
  const dispatch = useDispatch();
  const typePopsicles = useSelector((state) => state.typePopsicles);
  const { data } = typePopsicles;

  useEffect(() => {
    dispatch(getTypePopsicle());
  }, [dispatch]);
  console.log(data);

  const [form, setForm] = useState({ nombre: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  console.log(form.nombre);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !isNaN(form.nombre)) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, ingresa un nombre de tipo de paleta válido.",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar este tipo de paleta ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Registro Exitoso!", "", "success");
          dispatch(createTypePopsicle({nombre: form.nombre}));
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };
  const columns = [
    {
      field: "nombre",
      headerName: "Tipos de Paleta",
      width: 500,
       headerAlign: 'center',
      align: "center",
    },
  ];

  const rows =
    data &&
    data.map((item) =>
      //bg-[#fae9ee]
      ({ id: item.id, nombre: item.nombre })
    );

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="bg-white rounded-md shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-[#9b1028] p-1">
           Clasificacion de Paletas
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-sm text-[#9b1028] p-1">
                Tipo de paleta:
              </span>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Escribe el nuevo tipo de paleta a registrar"
                className="w-full px-3 py-2 mt-1 rounded-md border-2 border-9b1028 focus:outline-none focus:border-fa042c"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-[#fa042c] text-white py-2 rounded-md hover:bg-[#da637a] transition duration-300"
            >
              Crear tipo de paleta
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 justify-center flex">
        <Box sx={{ height: "100%", width: "30%" }}>
          {data ? (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          ) : (
            <h3 className="text-2xl font-bold text-[#9b1028]">
              No hay tipo de paletas !
            </h3>
          )}
        </Box>
      </div>
    </>
  );
}
