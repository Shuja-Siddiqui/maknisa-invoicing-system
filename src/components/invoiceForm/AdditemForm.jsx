import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  FormControl,
  Typography,
} from "@mui/material";

export const AddItemForm = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [itemData, setItemData] = useState({
    description: "",
    dimension: "",
    rate: "",
    quantity: "",
    price: "",
    avatar: null,
  });

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

  const handleInputChange = (field, value) => {
    setItemData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setItemData((prevData) => ({
      ...prevData,
      avatar: file,
    }));
  };

  const handleAddItem = () => {
    // Handle adding the item to your state or perform necessary actions
    // ...

    // Clear the form fields
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
      <Typography variant="h5" gutterBottom>
        Add Item
      </Typography>
      {isFormVisible && (
        <form>
          <FormControl fullWidth>
            <TextField
              label="Description"
              fullWidth
              value={itemData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Dimension"
              fullWidth
              value={itemData.dimension}
              onChange={(e) => handleInputChange("dimension", e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Rate"
              fullWidth
              value={itemData.rate}
              onChange={(e) => handleInputChange("rate", e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Quantity"
              fullWidth
              value={itemData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Price"
              fullWidth
              value={itemData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </FormControl>
        </form>
      )}
      <Button variant="contained" color="primary" onClick={handleToggleForm}>
        {isFormVisible ? "Cancel" : "Add Item"}
      </Button>
    </Container>
  );
};
