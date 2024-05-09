import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const user = JSON.parse(localStorage.getItem("usuario"));

const sections = [
  { image: "/icons/casa.png", label: "Home", path: "/home" },
  {
    image: "/icons/analytics.svg",
    label: "Estadísticas",
    path: "/dashboard",
    roles: ["superAdmi"],
  },

  {
    image: "/icons/helado.svg",
    label: "Paletas",

    subMenuItems: [
      // {
      //   image: "/icons/tipos.png",
      //   label: "Tipos",
      //   path: "/TipoPaletas",
      // },
      {
        image: "/icons/disponible.png",
        label: "Disponibles",
        path: "/stock_popsicle",
      },
      {
        image: "/icons/intercambio.png",
        label: "movimientos",
        path: "/InventarioPaletas",
      },
      {
        image: "/icons/salida.png",
        label: "Salida",
        path: "/SalidaPaletas",
      },
      {
        image: "/icons/lista.png",
        label: "Lista de Paletas",
        path: "/Paletas",

      },
    ],
    roles: ["superAdmi","empleado"],
  },

  {
    image: "/icons/helado.svg",
    label: "Materia Prima",
    subMenuItems: [
      {
        image: "/icons/tipos.png",
        label: "Ingredientes",
        path: "/ingredientes",
      },
      {
        image: "/icons/disponible.png",
        label: "Recetas",
        path: "/recetas",
      },
      {
        image: "/icons/intercambio.png",
        label: "Batidos",
        path: "/batidos",
      },
      {
        image: "/icons/salida.png",
        label: "Mercancia",
        path: "/Inventario",
      },
      {
        image: "/icons/lista.png",
        label: "Inventario",
        path: "/stock_mp",
        roles: ["superAdmi"],
      },
    ],
    roles: ["superAdmi"],
  },
  {
    image: "/icons/cliente.png",
    label: "Proveedores",
    path: "/proveedores",
    roles: ["superAdmi", "admin", "empleado"],
  },
  {
    image: "/icons/cliente.png",
    label: "Clientes",
    path: "/Clientes",
    roles: ["superAdmi", "admin"],
  },
  {
    image: "/icons/venta.png",
    label: "Ventas",
    path: "/crear_ventas",
    roles: ["superAdmi", "admin"],
  },
  {
    image: "/icons/usuario.png",
    label: "Usuarios",
    path: "/users",
    roles: ["superAdmi"],
  },
  {
    image: "/icons/helado.svg",
    label: "Mercancia",
    subMenuItems: [
      {
        image: "/icons/salida.png",
        label: "Agregar",
        path: "/crear_inventario",
      },
      {
        image: "/icons/lista.png",
        label: "Inventario",
        path: "/stock_mp",
        roles: ["superAdmi"],
      },
    ],
    roles: ["admin", "empleado"],
  },
];

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    setCurrentPath(path);
    navigate(path);
  };
  // Filtrar las secciones según el rol del usuario
  const filteredSections = sections.filter((section) => {
    if (!user) return false; // Si no hay usuario, ocultar todas las secciones
    if (!section.roles) return true; // Si no hay roles definidos, mostrar la sección
    return section.roles.includes(user.rol); // Mostrar la sección si el rol del usuario está incluido en los roles permitidos
  });

  return (
    <div className="-mb-12 select-none">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: "red" }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Toolbar>
                {user &&
                (user.rol === "empleado" ||
                  user.rol === "admin" ||
                  user.rol === "superAdmi") ? (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 5,
                      ...(open && { display: "none" }),
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  ""
                )}

                <Typography
                  onClick={() => navigate("/home")}
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ cursor: "pointer" }}
                >
                  DON PALETON
                </Typography>
              </Toolbar>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center">
                  <div className="h-full">
                    <HomeRoundedIcon
                      className="cursor-pointer"
                      style={{ fontSize: "35px" }}
                    />
                  </div>
                  <div className="mr-2">
                    <AccountMenu />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <span className="ml-1"></span>
                    <Typography className="p-1 rounded-sm cursor-pointer mr-2 hover:bg-white hover:text-red-700">
                      <a href="/login">Iniciar Sesión</a>
                    </Typography>
                    <span className="mr-1 ml-1">|</span>
                    <Typography className="p-1 rounded-sm cursor-pointer mr-2 hover:bg-white hover:text-red-700">
                      <a href="/register">Registrar</a>
                    </Typography>
                  </div>
                </>
              )}
            </div>
          </div>
        </AppBar>
        {user &&
        (user.rol === "empleado" ||
          user.rol === "admin" ||
          user.rol === "superAdmi") ? (
          <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{ backgroundColor: "red" }}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon className=" text-white" />
                ) : (
                  <ChevronLeftIcon className=" text-white" />
                )}
                <h2 className="text-white">Cerrar</h2>
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {filteredSections.map((section, index) => (
                <React.Fragment key={index}>
                  {section.subMenuItems ? ( // Si tiene subMenuItems, renderizar un Accordion
                    <Accordion>
                      <AccordionSummary
                        // sx={{display: "block"}}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                      >
                        <ListItemIcon>
                          <img
                            src={section.image}
                            alt={section.label}
                            style={{ width: "24px", height: "24px" }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={section.label} />
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {section.subMenuItems.map((subItem, subIndex) => (
                            <ListItem
                              key={`${index}-${subIndex}`}
                              button
                              onClick={() => handleNavigation(subItem.path)}
                              selected={subItem.path === currentPath}
                            >
                              <ListItemIcon>
                                <img
                                  src={subItem.image}
                                  alt={subItem.label}
                                  style={{ width: "24px", height: "24px" }}
                                />
                              </ListItemIcon>
                              <ListItemText primary={subItem.label} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    // Si no tiene subMenuItems, renderizar un ListItem simple
                    <ListItem
                      button
                      onClick={() => handleNavigation(section.path)}
                      selected={section.path === currentPath}
                    >
                      <ListItemIcon>
                        <img
                          src={section.image}
                          alt={section.label}
                          style={{ width: "24px", height: "24px" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={section.label} />
                    </ListItem>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Drawer>
        ) : null}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
    </div>
  );
}
