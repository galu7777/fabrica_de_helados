import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import {
  getTypePopsicle,
  createTypePopsicle,
} from "../../../redux/actions/actions";
import { Box } from "@mui/material";
import CircularIndeterminate from "../../../components/spinner/Spinner";
import TextField from "@mui/material/TextField";

export default function TypePopsicle() {
  const dispatch = useDispatch();
  const typePopsicles = useSelector((state) => state.typePopsicles);
  const { data } = typePopsicles;
    const refrescarPagina = () => {
      window.location.reload();
    };

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
          refrescarPagina("TipoPaletas");
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
      <div
        className="bg-cover bg-center h-screen select-none "
        style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
      >
        <div className="flex flex-col items-center py-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
            <h2 className="text-2xl text-center font-bold mb-6 text-red-700">
              Crea un Nuevo Tipo de Paleta
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <TextField
                  fullWidth
                  type="text"
                  name="nombre"
                  label="Escribe el nuevo tipo de paleta a registrar"
                  variant="standard"
                  value={form.nombre}
                  onChange={handleChange}
                />
              </div>
              <Button color="error" variant="outlined" fullWidth type="submit">
                Aceptar
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 justify-center flex">
          <Box
            sx={{
              height: 400,
              width: "30%",
              backgroundColor: "white",
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            {data ? (
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            ) : (
              <CircularIndeterminate />
            )}
          </Box>
        </div>
      </div>
    </>
  );
}
