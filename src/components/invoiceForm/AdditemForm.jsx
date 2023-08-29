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
import { updateItemsArray, updateSelectedItem } from "../../api";

export const AddItemForm = ({
  itemData,
  setItemData,
  formData,
  setFormData,
  fetchData,
}) => {
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [addedItems, setAddedItems] = useState(formData?.items);
  useEffect(() => {
    setAddedItems(formData?.items || []);
  }, [formData]);
  const [selected, setSelected] = useState(-1);
  const handleToggleForm = () => {
    setFormVisible(!isFormVisible);
    // setItemData({
    //   description: "",
    //   dimension: "",
    //   rate: "",
    //   quantity: "",
    //   price: "",
    //   avatar: null,
    // });
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
    setLoading(true);
    const oldItems = [...formData.items];
    oldItems[selected] = itemData;
    updateSelectedItem({ ...itemData, index: selected })
      .then(() => {
        setLoading(false);
        setFormData({ ...formData, items: [...oldItems] });
      })
      .catch((err) => console.log(err));
    setSelected(-1);
  };

  const handleAddItem = async () => {
    setLoading(true);
    try {
      await updateItemsArray({ addedItems: itemData }).then(() => {
        setLoading(false);
        setFormData({ ...formData, items: [...formData.items, itemData] });
        setAddedItems([...addedItems, itemData]);
      });
    } catch (err) {
      console.log(err);
    }
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
          <StyledTextField
            label="Description"
            name="description"
            fullwidth="true"
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
              fullwidth="true"
              value={itemData.dimension}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <StyledTextField
              label="Rate"
              name="rate"
              fullwidth="true"
              type={"number"}
              value={itemData.rate}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <StyledTextField
              type="Number"
              label="Quantity"
              name="quantity"
              fullwidth="true"
              value={itemData.quantity}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </FormControl>
          <StyledTextField
            type="Number"
            label="Price"
            name="price"
            fullwidth="true"
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
              disabled={loading}
              color="primary"
              onClick={selected < 0 ? handleAddItem : updateItem}
            >
              {selected < 0 ? "Save" : "Update"}
            </StyledButton>
          </Box>
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
            itemData={itemData}
            handleToggleForm={setFormVisible}
            fetchData={fetchData}
          />
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
