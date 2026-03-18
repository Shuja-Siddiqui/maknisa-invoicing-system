import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid, MenuItem } from "@mui/material";
import { StyledTextField } from "../../utils/elements";
import { StyledButton } from "../../pages";
import { BasicCard } from "./BasicCard";
import { updateItemsArray, updateSelectedItem } from "../../api";
import { toJson } from "../../utils/elements";

export const AddItemForm = ({
  itemData,
  setItemData,
  formData,
  setFormData,
  fetchData,
}) => {
  const rooms = [
    { value: "GF-LOBBY", label: "G.F LOBBY" },
    { value: "DRAWING-ROOM", label: "DRAWING ROOM" },
    { value: "DINING-ROOM", label: "DINING ROOM" },
    { value: "GF-LOUNGE", label: "G.F LOUNGE" },
    { value: "GF-MASTER-BEDROOM", label: "G.F MASTER BEDROOM" },
    { value: "GF-GUEST-BEDROOM", label: "G.F GUEST BEDROOM" },
    { value: "GF-BEDROOM-LOBBY", label: "G.F BEDROOM LOBBY" },

    { value: "FF-LOBBY", label: "F.F LOBBY" },
    { value: "FF-LOUNGE", label: "F.F LOUNGE" },
    { value: "FF-MASTER-BEDROOM", label: "F.F MASTER BEDROOM" },
    { value: "FF-GUEST-BEDROOM", label: "F.F GUEST BEDROOM" },
    { value: "FF-GIRL-BEDROOM", label: "F.F GIRL BEDROOM" },
    { value: "FF-BOY-BEDROOM", label: "F.F BOY BEDROOM" },
    { value: "FF-BEDROOM-LOBBY", label: "F.F BEDROOM LOBBY" },

    { value: "BASEMENT-LOBBY", label: "BASEMENT LOBBY" },
    { value: "BASEMENT-LOUNGE", label: "BASEMENT LOUNGE" },
    { value: "BASEMENT-BEDROOM-1", label: "BASEMENT BEDROOM 1" },
    { value: "BASEMENT-BEDROOM-2", label: "BASEMENT BEDROOM 2" },
    { value: "BASEMENT-THEATER-ROOM", label: "BASEMENT THEATER ROOM" },
    { value: "BASEMENT-STUDY-ROOM", label: "BASEMENT STUDY ROOM" },

    { value: "OFFICE-ROOM", label: "OFFICE ROOM" },
    { value: "STUDY-ROOM", label: "STUDY ROOM" },
  ];
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [addedItems, setAddedItems] = useState(formData?.items);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    setAddedItems(formData?.items || []);
  }, [formData]);

  const handleToggleForm = () => {
    setFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setSelected(-1);
    }
    setItemData({
      description: "",
      dimension: "",
      rate: "",
      quantity: "",
      category: "",
      price: "",
      avatar: null,
    });
  };

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const updateItem = () => {
    setLoading(true);
    const oldItems = [...formData.items];
    oldItems[selected] = itemData;
    updateSelectedItem({ ...itemData, index: selected })
      .then(() => {
        setLoading(false);
        setFormVisible(false);
        setFormData({ ...formData, items: [...oldItems] });
      })
      .catch((err) => console.log(err));
    setSelected(-1);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData(e.currentTarget);
      const formData0 = new FormData();
      formData0.append("avatar", fd.get("avatar"));
      fd.delete("avatar");
      formData0.append("addedItems", JSON.stringify({ ...toJson(fd) }));

      await updateItemsArray(formData0)
        .then((res) => {
          setLoading(false);
          setFormVisible(false);
          fetchData();
        })
        .catch((e) => {
          console.error(new Error(e));
          setLoading(false);
          setItemData({
            description: "",
            dimension: "",
            rate: "",
            category: "",
            quantity: "",
            price: "",
            avatar: null,
          });
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      {isFormVisible && (
        <form
          encType="multipart/form-data"
          onSubmit={selected < 0 ? (e) => handleAddItem(e) : updateItem}
        >
          <Typography variant="h5" color="#EC7C34" gutterBottom>
            {selected < 0 ? "Add" : "Update"} Item
          </Typography>
          <StyledTextField
            label="Description"
            name="description"
            fullwidth="true"
            value={itemData.description}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <StyledTextField
            id="outlined-select-currency"
            name="category"
            select
            required
            label="Category"
            defaultValue="Category"
            helperText="Please select your category"
            value={itemData?.category}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          >
            {rooms.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </StyledTextField>
          {formData?.payment !== "FixedPayment" && (
            <>
              <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
                <Grid item xs={12} sm={4}>
                  <StyledTextField
                    label="Dimension"
                    name="dimension"
                    fullwidth="true"
                    value={itemData.dimension}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledTextField
                    label="Rate"
                    name="rate"
                    fullwidth="true"
                    type={"number"}
                    value={itemData.rate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledTextField
                    type="Number"
                    label="Quantity"
                    name="quantity"
                    fullwidth="true"
                    value={itemData.quantity}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <StyledTextField
                type="Number"
                label="Price"
                name="price"
                fullwidth="true"
                value={itemData.rate * itemData.quantity}
                onChange={handleChange}
                sx={{ marginBottom: 2 }}
              />
            </>
          )}
          {selected < 0 && (
            <input
              type="file"
              accept="image/*"
              name="avatar"
              onChange={(e) => {
                setItemData({ ...itemData, avatar: e.target.files[0] });
              }}
              style={{
                marginBottom: 2,
                appearance: "none",
                width: "100%",
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
          )}

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
              type="submit"
              color="primary"
            >
              {selected < 0 ? "Save" : "Update"}
            </StyledButton>
          </Box>
        </form>
      )}
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleToggleForm}
        sx={{ width: "100%", marginBottom: "2rem" }}
      >
        {isFormVisible ? "Cancel" : "Add Item"}
      </StyledButton>
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
            id={item?._id}
            img={item.image}
            rate={item.rate}
            category={item?.category}
            quantity={item.quantity}
            payment={formData?.payment}
            fixedPrice={formData?.price}
            price={item.rate * item.quantity}
            description={item.description}
            dimension={item.dimension}
            setItemData={setItemData}
            setSelected={setSelected}
            setAddedItems={setAddedItems}
            addedItems={addedItems}
            itemData={itemData}
            handleToggleForm={setFormVisible}
            fetchData={fetchData}
            currency_type={formData?.currency_type}
          />
        ))}
      </div>
    </Container>
  );
};
