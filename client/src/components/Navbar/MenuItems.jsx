import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StyledMenuItem from "./StyledMenuItem";
import PropTypes from "prop-types";

const MenuItems = ({ handleClose, path, label }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
    handleClose();
  };

  return (
    <StyledMenuItem
      onClick={handleClick}
      style={{
        color: pathname === path ? "white" : "black",
        backgroundColor: pathname === path ? "red" : "inherit", // Agregar background-color según la condición
      }}
    >
      <div>{label}</div>
    </StyledMenuItem>
  );
};

MenuItems.propTypes = {
  handleClose: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired, // Corregir el tipo de la propiedad "path"
  label: PropTypes.string.isRequired, // Corregir el tipo de la propiedad "label"
};

export default React.memo(MenuItems);
