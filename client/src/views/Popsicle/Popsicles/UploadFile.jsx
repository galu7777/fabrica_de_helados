import  { useState } from "react";
import { Box, Typography, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PropTypes from "prop-types";

const UploadFile = ({ handleImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    handleImageChange(event);
  };

  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <label
          htmlFor="file-input"
          style={{ width: "100%", height: "170px" }}
          className="border-2 border-white border-dashed rounded-lg cursor-pointer bg-white hover:bg-red-100 dark:bg-white dark:hover:bg-red-100 dark:border-red-600 dark:hover:border-red-500"
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              pt={5}
              pb={6}
            >
              <CloudUploadIcon sx={{ fontSize: 64, color: "red" }} />
              <Typography variant="body1" color="textSecondary" mb={2}>
                <strong>Haz clic para subir</strong> 
              </Typography>
              <Typography variant="caption" color="textSecondary">
                SVG, PNG, JPG o GIF (MAX. 800x400px)
              </Typography>
            </Box>
          )}
          <Input
            id="file-input"
            type="file"
            inputProps={{ accept: ".png, .jpg, .jpeg, .gif" }}
            onChange={handleInputChange}
            sx={{ display: "none" }}
          />
        </label>
      </Box>
    </div>
  );
};

UploadFile.propTypes = {
  handleImageChange: PropTypes.func.isRequired,
};


export default UploadFile;
