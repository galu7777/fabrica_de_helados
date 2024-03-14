import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSmoothies, getTypePopsicle, getPopsicle, createInventoryPopsicle } from "../../../redux/actions/actions";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function CreateInvPopsicles() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const [selectedSmoothie, setSelectedSmoothie] = useState("");
  const [selectedPopsiclesType, setSelectedPopsiclesType] = useState("");
  const [selectedPopsicle, setSelectedPopsicle] = useState("");
  const smoothie = useSelector((state) => state.smoothies);
  const typePopsicles = useSelector((state) => state.typePopsicles);
  const popsicles = useSelector((state) => state.popsicles);
  const dataSmoo = smoothie.data;
  const dataPopType = typePopsicles.data;
  const dataPopsicles = popsicles.data;

  useEffect(() => {
    dispatch(getSmoothies());
    dispatch(getTypePopsicle());
    dispatch(getPopsicle());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedSmoothie ||
      !selectedPopsiclesType ||
      !selectedPopsicle
    ) {
      // Muestra una alerta indicando el error
      Swal.fire({
        title: "Verifica la informacion.",
        text: "Por favor, Seleccione todos los campos",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Quieres registrar este Inventario ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Registrar",
        denyButtonText: `No registrar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Registro Exitoso!", "", "success");
          dispatch(
            createInventoryPopsicle({
              id_batida: selectedSmoothie,
              id_tipo_de_paleta: selectedPopsiclesType,
              id_paleta: selectedPopsicle,
            })
          );
          navigate("/InventarioPaletas");
        } else if (result.isDenied) {
          Swal.fire("Los Cambios no se registraron.", "", "info");
        }
      });
    }
  };

    return (
      <div
        className="bg-cover bg-center h-screen select-none "
        style={{ height: "940px", backgroundImage: "url('/marca-agua.svg')" }}
      >
        <div className="w-full flex flex-col items-center select-none py-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto">
            <div className="text-2xl text-center font-bold mb-6 text-[#9b1028]">
              Agregar Inventario de Paleta
            </div>
          </div>
        </div>
        <div className="mt-8 justify-center flex">
          <form
            onSubmit={handleSubmit}
            className="w-2/4 p-8 bg-white rounded-lg shadow-2xl"
          >
            <div className=" -mx-3 mb-6 py-10">
              <div className="w-full px-3 mb-10">
                <div className="w-full mr-4">
                  <InputLabel id="demo-simple-select-helper-label">
                    Seleccione un Batido
                  </InputLabel>
                  <Select
                    labelId="ingredient-select-label"
                    id="ingredient-select"
                    required
                    value={selectedSmoothie}
                    onChange={(e) => setSelectedSmoothie(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value=""> Seleccione un Batido</MenuItem>
                    {dataSmoo &&
                      dataSmoo.map((smoothie) => (
                        <MenuItem key={smoothie.id} value={smoothie.id}>
                          {smoothie.Recipe.nombre}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
              </div>
              <div className="w-full px-3 mb-10">
                <InputLabel id="demo-simple-select-helper-label">
                  Seleccione un Tipo de Paleta
                </InputLabel>
                <Select
                  required
                  labelId="provider-select-label"
                  id="provider-select"
                  value={selectedPopsiclesType}
                  onChange={(e) => setSelectedPopsiclesType(e.target.value)}
                  className="w-full"
                >
                  <MenuItem value="">Seleccione un Tipo de Paleta</MenuItem>
                  {dataPopType &&
                    dataPopType.map((poptype) => (
                      <MenuItem key={poptype.id} value={poptype.id}>
                        {poptype.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </div>

              <div className="w-full px-3 mb-10">
                <InputLabel id="demo-simple-select-helper-label">
                  Seleccione una Paleta
                </InputLabel>
                <Select
                  required
                  labelId="provider-select-label"
                  id="provider-select"
                  value={selectedPopsicle}
                  onChange={(e) => setSelectedPopsicle(e.target.value)}
                  className="w-full"
                >
                  <MenuItem value="">Seleccione una Paleta</MenuItem>
                  {dataPopsicles &&
                    dataPopsicles.map((popsicles) => (
                      <MenuItem key={popsicles.id} value={popsicles.id}>
                        {popsicles.nombre}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            </div>

            <Button color="error" variant="outlined" fullWidth type="submit">
              Aceptar
            </Button>
          </form>
        </div>
      </div>
    );
}
