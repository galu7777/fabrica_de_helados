import  { useState, useEffect } from "react";
import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { detailInventoryPopsicle } from "../../../redux/actions/actions";
import PropTypes from "prop-types";

const DetailPopsicle = ({ id }) => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(detailInventoryPopsicle(id));
    }
  }, [dispatch, id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span onClick={handleOpen} className="cursor-pointer">
        <VisibilityIcon color="primary" />
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "#FFFFFF",
              boxShadow: 24,
              p: 4,
              borderRadius: 8,
            }}
          >
            {detail && detail.data && (
              <div className="space-y-6 text-black text-center">
                <Typography variant="h4" component="h2">
                  {detail.data.nombre_paleta}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Tipo: {detail.data.tipo}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Descripción: {detail.data.descripcion}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Cantidad: {detail.data.cantidad}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Peso unitario: {detail.data.peso_unitario}{" "}
                  {detail.data.unidad_medida}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

DetailPopsicle.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailPopsicle;
