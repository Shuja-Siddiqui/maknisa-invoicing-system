import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
} from "@mui/material";

const initialFormState = {
  client_name: "",
  location: {
    details: "",
    area: "",
    city: "",
    province: "",
  },
  estimate_time: "",
  terms:
    "Foam quality - Master Molty Furniture to be delivered after construction completion of house Wood quality - Sheesham Wood Polish included Imported fabric on sofas same quality as pictures Cushions as per client demand Carriage will be paid by customer Mattress will not be included 50% payment in advance 30% before polish and poshish 20% before delivery",
  discount: "",
  items: [],
};

export const InvoiceForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [terms, setTerms] = useState(
    "Foam quality - Master Molty Furniture to be delivered after construction completion of house Wood quality - Sheesham Wood Polish included Imported fabric on sofas same quality as pictures Cushions as per client demand Carriage will be paid by customer Mattress will not be included 50% payment in advance 30% before polish and poshish 20% before delivery"
  );
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
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Client Name"
          fullWidth
          value={formData.client_name}
          onChange={(e) => handleInputChange("client_name", e.target.value)}
        />

        <InputLabel>Location</InputLabel>

        <FormControl sx={{ display: "flex", flexDirection: "row" }}>
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

        {/* ... Other fields ... */}

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};
