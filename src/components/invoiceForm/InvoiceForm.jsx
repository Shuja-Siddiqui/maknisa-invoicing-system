import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  InputLabel,
  Container,
  Box,
  Grid,
  MenuItem,
  Button,
} from "@mui/material";
import { AddItemForm } from "./AdditemForm";
import { StyledTextField } from "../../utils/elements";
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

const currencies = [
  {
    value: "Cement&Sikha",
    label: "Cement&Sikha",
  },
  {
    value: "Bricks&Sand",
    label: "Bricks&Sand",
  },
  {
    value: "Steel",
    label: "Steel",
  },
  {
    value: "Sanitary-Labour",
    label: "Sanitary Labour",
  },
  {
    value: "Cotractor-Labour-Grey",
    label: "Cotractor Labour Grey",
  },
  {
    value: "Electric-Labour-Grey",
    label: "Electric Labour Grey",
  },
  {
    value: "Shuttering",
    label: "Shuttering",
  },
  {
    value: "Mebrain-Sheet",
    label: "Mebrain Sheet",
  },
  {
    value: "Tiles",
    label: "Tiles",
  },
  {
    value: "UPVC",
    label: "UPVC",
  },
  {
    value: "Ash-Wood",
    label: "Ash Wood",
  },
  {
    value: "MDF",
    label: "MDF",
  },
  {
    value: "Aluminium",
    label: "Aluminium",
  },
  {
    value: "Solar",
    label: "Solar",
  },
  {
    value: "Wires",
    label: "Wires",
  },
  {
    value: "Paint-Material",
    label: "Paint Material",
  },
  {
    value: "Wood-Works",
    label: "Wood Works",
  },
  {
    value: "Funiture",
    label: "Funiture",
  },
  {
    value: "Lights/Chandelier",
    label: "Lights/Chandelier",
  },
  {
    value: "Sika",
    label: "Sika",
  },
  {
    value: "Kitchen-Chugtais",
    label: "Kitchen Chugtais",
  },
  {
    value: "Celing",
    label: "Celing",
  },
  {
    value: "WorughtIron/gaits,Reling",
    label: "WorughtIron/gaits,Reling",
  },
  {
    value: "Renovation",
    label: "Renovation",
  },
  {
    value: "Cleaning",
    label: "Cleaning",
  },
  {
    value: "Tiles-Labour",
    label: "Tiles Labour",
  },
  {
    value: "Electric-Labour",
    label: "Electric Labour",
  },
  {
    value: "Graphy",
    label: "Graphy",
  },
  {
    value: "Home-Appliance",
    label: "Home Appliance",
  },
  {
    value: "Groot/Spacer/Bond",
    label: "Groot/Spacer/Bond",
  },
];

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
  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  const handleToggleEdit = () => {
    setEditableTerms(!editableTerms);
  };

  const handleChangeButtonClick = () => {
    setIsEditable(true);
  };

  const handleDropdownChange = (e) => {
    handleInputChange("payment", e.target.value);
    // Disable the dropdown after selection
    setIsEditable(false);
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
    // setDebounceTimer(setTimeout(saveDraftDebounced, 4000));
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
    // setDebounceTimer(setTimeout(saveDraftDebounced, 4000));
  };

  const saveDraftDebounced = async () => {
    try {
      await updateInvoice({ ...formData });
      clearTimeout(debounceTimer); // Clear the debounce timer after saving
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
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
      getInvoiceById(localStorage.getItem("@invoiceId")).then((res) => {
        setFormData(initialFormState);
        setTimeout(() => {
          setFormData(res);
        }, 1000);
      });
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

  useEffect(() => {
    // set debounce inside useEffect to get latest State t the time of update
    setDebounceTimer(setTimeout(saveDraftDebounced, 4000));
  }, [formData]);

  useEffect(() => {
    setIsEditable(formData?.payment === "");
  }, [formData?.payment]);

  return (
    <Box sx={{ backgroundColor: "#fff", marginTop: "20px" }}>
      <Box
        sx={{ color: "#F98E0A", cursor: "pointer" }}
        onClick={() => window.history.back()}
      >
        <ArrowBack />
      </Box>
      <Container maxWidth="md">
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
              placeholder="House No."
              value={formData.location.details}
              onChange={(e) => handleLocationChange("details", e.target.value)}
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
              onChange={(e) => handleLocationChange("province", e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              id="outlined-select-currency"
              select
              label="Category"
              defaultValue="Category"
              helperText="Please select your category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              sx={{ marginBottom: 2 }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              sx={{ mb: 2 }}
              placeholder=" Making Time"
              fullwidth="true"
              value={formData.making_time}
              onChange={(e) => handleInputChange("making_time", e.target.value)}
            />
          </Grid>
        </Grid>
        {/* {formData?.completed === false && formData?.payment == "" ? (
          <StyledTextField
            id="outlined-select-currency"
            select
            label="Payment"
            defaultValue={formData.payment || "Payment"}
            helperText="Please select your payment"
            value={formData.payment}
            onChange={(e) => handleInputChange("payment", e.target.value)}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="FixedPayment">Fixed Payment</MenuItem>
            <MenuItem value="Item">Item</MenuItem>
          </StyledTextField>
        ) : (
          <StyledTextField
            id="outlined-select-currency"
            disabled
            select
            label="Payment"
            defaultValue={formData.payment || "Payment"}
            helperText="Please select your payment"
            value={formData.payment}
            onChange={(e) => handleInputChange("payment", e.target.value)}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="FixedPayment">Fixed Payment</MenuItem>
            <MenuItem value="Item">Item</MenuItem>
          </StyledTextField>
        )} */}

        <Box sx={{ position: "relative" }}>
          <StyledTextField
            id="outlined-select-currency"
            select
            label="Payment"
            defaultValue={formData.payment || "Payment"}
            helperText="Please select your payment"
            value={formData.payment}
            // onChange={(e) => handleInputChange("payment", e.target.value)}
            onChange={handleDropdownChange}
            sx={{ marginBottom: 2 }}
            disabled={!isEditable} // Disable if isEditable is false
          >
            <MenuItem value="FixedPayment">Fixed Payment</MenuItem>
            <MenuItem value="Item">Item</MenuItem>
          </StyledTextField>

          {/* Payment Button */}
          {isEditable ? (
            <Button
              sx={{
                position: "absolute",
                right: "0%",
                top: "-21%",
                padding: "1px 15px",
                fontSize: "10px",
                background: "#F98E0A",
                border: "none",
                color: "white",
                "&:hover": {
                  // Hover effect
                  background: "none", // Change to a darker shade on hover (adjust as needed)
                  border: "1px solid #F98E0A",
                  color: "#F98E0A", // Optional: add a slight opacity effect on hover
                },
              }}
              variant="outlined"
              onClick={() => setIsEditable(false)}
            >
              Confirm
            </Button>
          ) : (
            <Button
              sx={{
                position: "absolute",
                right: "0%",
                top: "-21%",
                padding: "1px 15px",
                fontSize: "10px",
                background: "#F98E0A",
                border: "none",
                color: "white",
                "&:hover": {
                  // Hover effect
                  background: "none", // Change to a darker shade on hover (adjust as needed)
                  border: "1px solid #F98E0A",
                  color: "#F98E0A", // Optional: add a slight opacity effect on hover
                },
              }}
              variant="outlined"
              onClick={handleChangeButtonClick}
            >
              Change
            </Button>
          )}
        </Box>

        {payment === "FixedPayment" || formData?.payment === "FixedPayment" ? (
          <StyledTextField
            sx={{ mb: 2 }}
            label="Price"
            placeholder="Price"
            fullwidth="true"
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
        ) : (
          <>
            <StyledTextField
              sx={{ mb: 2 }}
              label="Discount"
              placeholder="Discount"
              fullwidth="true"
              type="text"
              name="discount"
              value={formData.discount}
              onChange={(e) => handleInputChange("discount", e.target.value)}
            />
          </>
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
        <StyledButton
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Generate Invoice
        </StyledButton>
      </Container>
    </Box>
  );
};
