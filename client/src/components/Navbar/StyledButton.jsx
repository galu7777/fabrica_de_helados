import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
  color: blue;

  &:hover {
    color: #fff;
    

    &::before {
      transform: scaleX(1);
    }
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

export default StyledButton;
