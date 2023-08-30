import React, { useState, useLayoutEffect } from "react";
import { FormControl, InputLabel, Container, Box } from "@mui/material";
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
  making_time: "",
  terms: "",
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
  const navigate = useNavigate();

  const handleToggleEdit = () => {
    setEditableTerms(!editableTerms);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(formData);
    // If debounceTimer exists, cancel the debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
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
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              mb: 2,
              gap: "10px",
            }}
          >
            <StyledTextField
              placeholder="Details"
              value={formData.location.details}
              onChange={(e) => handleLocationChange("details", e.target.value)}
              sx={{
                width: {
                  xl: "50%",
                  lg: "50%",
                  md: "50%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
            />
            <StyledTextField
              placeholder="Area"
              value={formData.location.area}
              onChange={(e) => handleLocationChange("area", e.target.value)}
              sx={{
                width: {
                  xl: "50%",
                  lg: "50%",
                  md: "50%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
            />
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "row", mb: 2, gap: "10px" }}
          >
            <StyledTextField
              placeholder="City"
              value={formData.location.city}
              onChange={(e) => handleLocationChange("city", e.target.value)}
              sx={{
                width: {
                  xl: "50%",
                  lg: "50%",
                  md: "50%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
            />
            <StyledTextField
              placeholder="Province"
              value={formData.location.province}
              onChange={(e) => handleLocationChange("province", e.target.value)}
              sx={{
                width: {
                  xl: "50%",
                  lg: "50%",
                  md: "50%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
            />
          </FormControl>
          <StyledTextField
            sx={{ mb: 2 }}
            placeholder=" Making Time"
            fullwidth="true"
            value={formData.making_time}
            onChange={(e) => handleInputChange("making_time", e.target.value)}
          />
          <StyledTextField
            sx={{ mb: 2 }}
            placeholder="Discount"
            fullwidth="true"
            type="number"
            name="discount"
            value={formData.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
          />

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
