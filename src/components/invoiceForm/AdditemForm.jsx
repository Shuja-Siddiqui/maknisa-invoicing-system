import React, { useState } from "react";
import { Button, Container, FormControl, Typography, Box } from "@mui/material";
import { StyledTextField } from "../../utils/elements";
import { StyledButton } from "../../pages";


export const AddItemForm = ({
  itemData,
  setItemData,
  formData,
  setFormData,
}) => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleToggleForm = () => {
    setFormVisible(!isFormVisible);
    setItemData({
      description: "",
      dimension: "",
      rate: "",
      quantity: "",
      price: "",
      avatar: null,
    });
  };

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setItemData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
  };

  const handleAddItem = () => {
    setFormData({ ...formData, items: [...formData.items, itemData] });

    setItemData({
      description: "",
      dimension: "",
      rate: "",
      quantity: "",
      price: "",
      avatar: null,
    });
  };

  return (
    <Container maxWidth="md">
      {isFormVisible && (
        <>
          <Typography variant="h5" gutterBottom>
            Add Item
          </Typography>
          <form>
            <StyledTextField
              label="Description"
              name="description"
              fullWidth
              value={itemData.description}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <FormControl
              sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <StyledTextField
                label="Dimension"
                name="dimension"
                fullWidth
                value={itemData.dimension}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <StyledTextField
                label="Rate"
                name="rate"
                fullWidth
                value={itemData.rate}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
              <StyledTextField
                label="Quantity"
                name="quantity"
                fullWidth
                value={itemData.quantity}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
            </FormControl>
            <StyledTextField
              label="Price"
              name="price"
              fullWidth
              value={itemData.price}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{
                marginBottom: 2,
                appearance: "none",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                background: "#f98e0a",
                color: "white",
                cursor: "pointer",
                transition: "background 0.3s",
                "&:hover": {
                  background: "#e57905",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "2rem",
              }}
            >
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleAddItem}
              >
                Save
              </StyledButton>
            </Box>
          </form>
        </>
      )}
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleToggleForm}
      >
        {isFormVisible ? "Cancel" : "Add Item"}
      </StyledButton>
    </Container>
  );
};
