import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [addedItems, setAddedItems] = useState(formData?.items);
  useEffect(() => {
    setAddedItems(formData?.items || []);
  }, [formData]);
  const [selected, setSelected] = useState(-1);
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
          />
        ))}
      </div>
    </Container>
  );
};
