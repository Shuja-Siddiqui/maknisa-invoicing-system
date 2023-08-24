import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Box,
} from "@mui/material";
import { AddItemForm } from "./AdditemForm";

const initialFormState = {
  client_name: "",
  location: {
    details: "",
    area: "",
    city: "",
    province: "",
    making_time: "",
  },
  estimate_time: "",
  terms:
    "Foam quality - Master Molty Furniture to be delivered after construction completion of house Wood quality - Sheesham Wood Polish included Imported fabric on sofas same quality as pictures Cushions as per client demand Carriage will be paid by customer Mattress will not be included 50% payment in advance 30% before polish and poshish 20% before delivery",
  discount: "",
  items: [],
};

export const InvoiceForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [items, setItems] = useState([]);
  const [editableTerms, setEditableTerms] = useState(false);
  const [isAddItemFormVisible, setAddItemFormVisible] = useState(false);
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

  const handleAddItem = (itemData) => {
    setItems([...items, itemData]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 2, mt: 2 }}
          label="Client Name"
          fullWidth
          value={formData.client_name}
          onChange={(e) => handleInputChange("client_name", e.target.value)}
        />

        <InputLabel>Location</InputLabel>

        <FormControl sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
          <TextField
            label="Details"
            value={formData.location.details}
            onChange={(e) => handleLocationChange("details", e.target.value)}
          />
          <TextField
            label="Area"
            value={formData.location.area}
            onChange={(e) => handleLocationChange("area", e.target.value)}
          />
          <TextField
            label="City"
            value={formData.location.city}
            onChange={(e) => handleLocationChange("city", e.target.value)}
          />
          <TextField
            label="Province"
            value={formData.location.province}
            onChange={(e) => handleLocationChange("province", e.target.value)}
          />
        </FormControl>

        <TextField
          sx={{ mb: 2 }}
          label=" Makign Time"
          fullWidth
          value={formData.making_time}
          onChange={(e) => handleInputChange("making-time", e.target.value)}
        />
        <InputLabel>Terms & Conditions</InputLabel>

        <TextField
          fullWidth
          multiline
          rows={6}
          value={formData.terms}
          onChange={(e) => handleInputChange("terms", e.target.value)}
          disabled={!editableTerms}
          sx={{ maxHeight: 200, overflowY: "auto", marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" onClick={handleToggleEdit}>
            {editableTerms ? "Save" : "Edit"}
          </Button>
        </Box>

        <Box>{<AddItemForm />}</Box>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};
