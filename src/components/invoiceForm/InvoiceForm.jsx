import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Container, Box } from "@mui/material";
import { AddItemForm } from "./AdditemForm";
import { StyledTextArea, StyledTextField } from "../../utils/elements";
import { StyledButton } from "../../pages";

const initialFormState = {
  client_name: "",
  location: {
    details: "",
    area: "",
    city: "",
    province: "",
    making_time: "",
  },
  terms:
    "Foam quality - Master Molty Furniture to be delivered after construction completion of house Wood quality - Sheesham Wood Polish included Imported fabric on sofas same quality as pictures Cushions as per client demand Carriage will be paid by customer Mattress will not be included 50% payment in advance 30% before polish and poshish 20% before delivery",
  discount: "",
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
  const handleToggleEdit = () => {
    setEditableTerms(!editableTerms);
  };
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box sx={{ backgroundColor: "#000000" }}>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
          <StyledTextField
            sx={{ mb: 2, mt: 2 }}
            label="Client Name"
            fullWidth
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
              label="Details"
              value={formData.location.details}
              onChange={(e) => handleLocationChange("details", e.target.value)}
              sx={{ width: "50%" }}
            />
            <StyledTextField
              label="Area"
              value={formData.location.area}
              onChange={(e) => handleLocationChange("area", e.target.value)}
              sx={{ width: "50%" }}
            />
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "row", mb: 2, gap: "10px" }}
          >
            <StyledTextField
              label="City"
              value={formData.location.city}
              onChange={(e) => handleLocationChange("city", e.target.value)}
              sx={{ width: "50%" }}
            />
            <StyledTextField
              label="Province"
              value={formData.location.province}
              onChange={(e) => handleLocationChange("province", e.target.value)}
              sx={{ width: "50%" }}
            />
          </FormControl>
          <StyledTextField
            sx={{ mb: 2 }}
            label=" Makign Time"
            fullWidth
            value={formData.making_time}
            onChange={(e) => handleInputChange("making-time", e.target.value)}
          />
          <StyledTextField
            sx={{ mb: 2 }}
            label="discount"
            fullWidth
            value={formData.making_time}
            onChange={(e) => handleInputChange("discount", e.target.value)}
          />
          <InputLabel sx={{ color: "#F98E0A", mb: 2, mt: 2 }}>
            Terms & Conditions
          </InputLabel>
          <textarea
            label="Terms"
            fullWidth
            rows={6}
            onChange={(e) => handleInputChange("terms", e.target.value)}
            disabled={!editableTerms}
            style={{
              maxHeight: 200,
              overflowY: "auto",
              mb: 2,
              color: !editableTerms ? "#aaa" : "#fff",
              width: "100%",
              background: "#000",
              border: "1px solid orange",
              borderRadius: 5,
              padding: "1em",
            }}
            inputProps={{ style: { color: "red" } }}
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
          />
          <StyledButton type="submit" variant="contained" color="primary">
            Submit
          </StyledButton>
        </form>
      </Container>
    </Box>
  );
};
