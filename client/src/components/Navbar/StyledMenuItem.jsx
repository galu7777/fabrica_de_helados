import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

const StyledMenuItem = styled(MenuItem)(({ backgroundColor, color }) => ({
  backgroundColor: backgroundColor,
  color: color,
  "&:hover": {
    backgroundColor: "red  !important",
    color: "white !important",
  },
  "&::before": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    backgroundColor: "#fff",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.3s ease",
  },
  "&:hover::before": {
    transform: "scaleX(1)",
  },
}));

export default StyledMenuItem;
