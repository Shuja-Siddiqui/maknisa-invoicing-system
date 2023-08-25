import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { StyledTextField } from "../../utils/elements";
import { StyledButton } from "../../pages";
import { BasicCard } from "./BasicCard";

export const AddItemForm = ({
  itemData,
  setItemData,
  formData,
  setFormData,
}) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [selected, setSelected] = useState(-1);
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
    const imageUrl = URL.createObjectURL(file);
    setItemData((prevData) => ({
      ...prevData,
      avatar: imageUrl,
    }));
  };

  const updateItem = () => {
    const oldItems = [...formData.items];
    oldItems[selected] = itemData;
    console.log((oldItems[selected] = itemData), "dfdsjkfjdsf");
    setFormData({ ...formData, items: [...oldItems] });
    setSelected(-1);
  };

  const handleAddItem = () => {
    setFormData({ ...formData, items: [...formData.items, itemData] });
    setAddedItems([...addedItems, itemData]);
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
                onClick={selected < 0 ? handleAddItem : updateItem}
              >
                {selected < 0 ? "Save" : "Done"}
              </StyledButton>
            </Box>
          </form>
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {addedItems.map((item, index) => (
          <>
            {console.log(index, "index")}
            <BasicCard
              key={index}
              number={index}
              img={item.avatar}
              rate={item.rate}
              quantity={item.quantity}
              price={item.price}
              description={item.description}
              setItemData={setItemData}
              setSelected={setSelected}
              setAddedItems={setAddedItems}
              addedItems={addedItems}
            />
          </>
        ))}
      </div>

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
