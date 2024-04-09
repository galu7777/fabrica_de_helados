import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, detailUser, editUser } from "../../redux/actions/actions";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CircularIndeterminate from "../../components/spinner/Spinner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";

export default function ListUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userList);
  const { data: detailData = {} } = useSelector((state) => state.userDetail);
  const { data } = users;
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (isEditing && detailData) {
      showEditDialog();
    }
  }, [isEditing, detailData]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  const refrescarPagina = () => {
    window.location.reload();
  };
    const handleEdit = (id) => {
      dispatch(detailUser(id));
      setIsEditing(true);
      setEditingId(id);
    };
const showEditDialog =  () => {

   dispatch(detailUser());


    const { nombre, apellido, email, rol } = detailData;

    Swal.fire({
      title: "Editar Usuario",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      customClass: {
        popup: "w-2/4",
      },
      html: `
          <div class="flex flex-col select-none">
          <div class="flex justify-between gap-6">
              <div class="w-1/2">
              <label for="swal-nombre" class="block font-medium text-gray-700">Nombre</label>
              <input id="swal-nombre" class="swal2-input rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-3/4" value="${
                nombre || ""
              }" placeholder="Nombre">
              </div>
              <div class="w-1/2">
              <label for="swal-apellido" class="block font-medium text-gray-700">Apellido</label>
              <input id="swal-apellido" class="swal2-input rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-3/4" value="${
                apellido || ""
              }" placeholder="Apellido">
              </div>
          </div>
          <div class="mt-6">
              <label for="swal-email" class="block font-medium text-gray-700">Email</label>
              <input id="swal-email" class="swal2-input rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-3/4" value="${
                email || ""
              }" placeholder="Email">
          </div>
          <div class="mt-6">
              <label for="swal-rol" class="block font-medium text-gray-700">Rol</label>
              <select id="swal-rol" class="swal2-select rounded-md shadow-sm border-2 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-3/4">
          <option value="superAdmi" ${
            rol === "superAdmi" ? "selected" : ""
          }>superAdmi</option>
          <option value="admin" ${
            rol === "admin" ? "selected" : ""
          }>admin</option>
              <option value="empleado" ${
                rol === "empleado" ? "selected" : ""
              }>empleado</option>
              <option value="clientes" ${
                rol === "clientes" ? "selected" : ""
              }>clientes</option>
              </select>
          </div>
          </div>
      `,
      preConfirm: () => {
        const newNombre = Swal.getPopup()
          .querySelector("#swal-nombre")
          .value.trim();
        const newApellido = Swal.getPopup()
          .querySelector("#swal-apellido")
          .value.trim();
        const newEmail = Swal.getPopup()
          .querySelector("#swal-email")
          .value.trim();
        const newRol = Swal.getPopup().querySelector("#swal-rol").value.trim();

        if (!newNombre || !newApellido || !newEmail || !newRol) {
          Swal.showValidationMessage("Por favor, complete todos los campos.");
        }
        return {
          nombre: newNombre,
          apellido: newApellido,
          email: newEmail,
          rol: newRol,
        };
      },
    }).then((result) => {


       if (result.isConfirmed) {
         dispatch(editUser(editingId, result.value));
         Swal.fire(
           "¡Actualización exitosa!",
           "Los datos del usuario han sido actualizados.",
           "success"
         );

         setTimeout(() => {
          refrescarPagina();
         }, 3000);


      }
    });
};


  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 400,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rol",
      headerName: "Rol",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <VisibilityIcon
            variant="outlined"
            color="primary"
            className="cursor-pointer"
            onClick={() => handleEdit(params.row.id)}
            //onClick={() => handleDelete(params.row.id)}
          ></VisibilityIcon>
        </div>
      ),
    },
  ];

  const rows =
    data &&
    data.map((item) =>
      //bg-[#fae9ee]
      ({
        id: item.id,
        nombre: item.nombre,
        apellido: item.apellido,
        email: item.email,
        rol: item.rol,
      })
    );
  return (
    <>
      <div
        className="bg-cover bg-center h-screen select-none "
        style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
      >
        <div className="w-full flex flex-col items-center select-none py-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
            <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
              Lista de Usuarios
            </div>
          </div>
        </div>
        <div className="mt-8 justify-center flex">
          <Box
            sx={{
              height: 400,
              width: "70%",
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
