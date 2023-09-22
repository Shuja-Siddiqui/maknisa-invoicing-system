import React, { useState, useLayoutEffect } from "react";
import {
  InputLabel,
  Container,
  Box,
  Grid,
  MenuItem,
} from "@mui/material";
import { AddItemForm } from "./AdditemForm";
import { StyledSelectField, StyledTextField } from "../../utils/elements";
import { StyledButton } from "../../pages";
import { updateInvoice, genrateInvoice, getInvoiceById } from "../../api";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
export const initialFormState = {
  client_name: "",
  location: {
    details: "",
    area: "",
    city: "",
    province: "",
  },
  category: "",
  making_time: "",
  terms: "",
  payment: "",
  price: 1,
  discount: 0,
  items: [],
};

export const InvoiceForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [itemData, setItemData] = useState({
    description: "",
    dimension: "",
    rate: "",
    quantity: "",
    price: "",
    avatar: null,
  });
  const [editableTerms, setEditableTerms] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();

  const handleToggleEdit = () => {
    setEditableTerms(!editableTerms);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // If debounceTimer exists, cancel the debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    if (value === "FixedPayment") {
      setPayment(value);
    }
    if (value === "Item") {
      setPayment(value);
    }
    // Set a new debounce timer after input change
    setDebounceTimer(setTimeout(saveDraftDebounced, 4000));
  };

  const handleLocationChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [field]: value,
      },
    }));

    // If debounceTimer exists, cancel the debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set a new debounce timer after input change
    setDebounceTimer(setTimeout(saveDraftDebounced, 4000));
  };

  const saveDraftDebounced = async () => {
    try {
      await updateInvoice({ ...formData });
      clearTimeout(debounceTimer); // Clear the debounce timer after saving
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await genrateInvoice({ ...formData });
      navigate("/print-invoice");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = () => {
    const id = localStorage.getItem("@invoiceId");
    if (id) {
      getInvoiceById(localStorage.getItem("@invoiceId")).then((res) =>
        setFormData(res)
      );
    } else {
      console.error("no id ");
      setTimeout(() => {
        navigate("/");
      }, 300);
    }
  };

  useLayoutEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ backgroundColor: "#fff", marginTop: "20px" }}>
      <Box
        sx={{ color: "#F98E0A", cursor: "pointer" }}
        onClick={() => window.history.back()}
      >
        <ArrowBack />
      </Box>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
          <StyledTextField
            sx={{ mb: 2, mt: 2 }}
            placeholder="Client Name"
            fullwidth="true"
            value={formData.client_name}
            onChange={(e) => handleInputChange("client_name", e.target.value)}
          />
          <InputLabel sx={{ color: "#F98E0A", mb: 2, mt: 2 }}>
            Location
          </InputLabel>
          <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                placeholder="Details"
                value={formData.location.details}
                onChange={(e) =>
                  handleLocationChange("details", e.target.value)
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                placeholder="Area"
                value={formData.location.area}
                onChange={(e) => handleLocationChange("area", e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                placeholder="City"
                value={formData.location.city}
                onChange={(e) => handleLocationChange("city", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                placeholder="Province"
                value={formData.location.province}
                onChange={(e) =>
                  handleLocationChange("province", e.target.value)
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
            <Grid item xs={12} sm={6}>
              <StyledSelectField
                placeholder="category"
                value={itemData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="Funiture">Funiture</MenuItem>
                <MenuItem value="Wood">Wood</MenuItem>
              </StyledSelectField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                sx={{ mb: 2 }}
                placeholder=" Making Time"
                fullwidth="true"
                value={formData.making_time}
                onChange={(e) =>
                  handleInputChange("making_time", e.target.value)
                }
              />
            </Grid>
          </Grid>
          <StyledSelectField
            placeholder="payment"
            value={formData.payment}
            onChange={(e) => handleInputChange("payment", e.target.value)}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="FixedPayment">Fixed Payment</MenuItem>
            <MenuItem value="Item">Item</MenuItem>
            {/* Add more menu items as needed */}
          </StyledSelectField>
          {payment === "FixedPayment" ? (
            <StyledTextField
              sx={{ mb: 2 }}
              placeholder="Price"
              fullwidth="true"
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          ) : (
            <StyledTextField
              sx={{ mb: 2 }}
              placeholder="Discount"
              fullwidth="true"
              type="text"
              name="discount"
              value={formData.discount}
              onChange={(e) => handleInputChange("discount", e.target.value)}
            />
          )}

          <InputLabel sx={{ color: "#F98E0A", mb: 2, mt: 2 }}>
            Terms & Conditions
          </InputLabel>
          <textarea
            placeholder="Terms"
            fullwidth="true"
            rows={6}
            value={formData.terms}
            onChange={(e) => handleInputChange("terms", e.target.value)}
            readOnly={!editableTerms}
            style={{
              maxHeight: 200,
              overflowY: "auto",
              mb: 2,
              color: !editableTerms ? "#aaa" : "black",
              width: "100%",
              background: "#fff",
              border: "1px solid orange",
              borderRadius: 5,
              padding: "1em",
            }}
            inputprops={{ style: { color: "red" } }}
          >
            {formData.terms}
          </textarea>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <StyledButton
              variant="outlined"
              color="primary"
              onClick={handleToggleEdit}
            >
              {editableTerms ? "Save" : "Edit"}
            </StyledButton>
          </Box>
          <AddItemForm
            itemData={itemData}
            setItemData={setItemData}
            formData={formData}
            setFormData={setFormData}
            fetchData={fetchData}
          />
          <StyledButton type="submit" variant="contained" color="primary">
            Generate Invoice
          </StyledButton>
        </form>
      </Container>
    </Box>
  );
};
