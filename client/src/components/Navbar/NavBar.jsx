import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import StyledButton from "./StyledButton";
import MenuItems from "./MenuItems";
import useMenu from "./useMenu";
import Menu from "@mui/material/Menu";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const drawerWidth = 240;

function DrawerAppBar({ window }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const sections = [
    {
      label: "Home",
      path: "/home",
    },
    {
      label: "Materia Prima",
      path: "/stock_mp",
      subMenuItems: [
        { label: "Ingredientes", path: "/ingredientes" },
        { label: "Receta", path: "/Recetas" },
        { label: "Movimientos de Materia Prima", path: "/Inventario" },
        { label: "Materia Prima Disponible", path: "/stock_mp" },
      ],
    },
    {
      label: "Paletas",
      path: "/Paletas",
      subMenuItems: [
        { label: "Tipos de Paletas", path: "/TipoPaletas" },
        { label: "Paletas Disponibles", path: "/stock_popsicle" },
        { label: "Inventario de Paletas", path: "/InventarioPaletas" },
        { label: "Lista de Paletas", path: "/Paletas" },
      ],
    },
    {
      label: "Proveedores",
      path: "/Proveedores",
    },
    {
      label: "Batidos",
      path: "/Batidos",
    },
    {
      label: "Clientes",
      path: "/Clientes",
    },
    {
      label: "Ventas",
      path: "/Ventas",
    },
  ];

  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "#fa042c" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Tony Gelati
          </Typography>
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              {section.subMenuItems ? (
                <MenuItemsWithSubMenu
                  section={section}
                  pathname={pathname}
                  handleDrawerToggle={handleDrawerToggle}
                />
              ) : (
                <Link to={section.path} style={{ textDecoration: "none" }}>
                  <StyledButton
                    color="inherit"
                    sx={{
                      color:
                        pathname === section.path
                          ? "red"
                          : "rgba(255, 255, 255, 0.7)",
                      backgroundColor:
                        pathname === section.path ? "white" : "transparent",
                    }}
                  >
                    {section.label}
                  </StyledButton>
                </Link>
              )}
            </React.Fragment>
          ))}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >

        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 1, flexGrow: 1 }}>
        <Toolbar />
      
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;

function MenuItemsWithSubMenu({ section, pathname }) {
  const { label, subMenuItems } = section;
  const { anchorEl, open, handleClick, handleClose } = useMenu();

  return (
    <React.Fragment>
      <StyledButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? `${label}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="inherit"
        sx={{
          color: subMenuItems.some((item) => item.path === pathname)
            ? "red"
            : "rgba(255, 255, 255, 0.7)",
          backgroundColor: subMenuItems.some((item) => item.path === pathname)
            ? "white"
            : "transparent",
        }}
      >
        {label}
        <ArrowDropDownOutlinedIcon />
      </StyledButton>
      <Menu
        id={`${label}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {subMenuItems.map((item, index) => (
          <MenuItems
            key={index}
            handleClose={handleClose}
            path={item.path}
            label={item.label}
          />
        ))}
      </Menu>
    </React.Fragment>
  );
}

MenuItemsWithSubMenu.propTypes = {
  section: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};
