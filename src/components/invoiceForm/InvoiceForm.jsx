import React, { useState, useEffect, useLayoutEffect } from "react";
import { FormControl, InputLabel, Container, Box } from "@mui/material";
import { AddItemForm } from "./AdditemForm";
import { StyledTextField } from "../../utils/elements";
import { StyledButton } from "../../pages";
import {
  updateInvoice,
  genrateInvoice,
  getInvoiceById,
} from "../../api/config";
import debounce from "lodash.debounce";
const initialFormState = {
  client_name: "",
  location: {
    details: "",
    area: "",
    city: "",
    province: "",
  },

  making_time: "",
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
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

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
      setIsDebouncing(true);
      await updateInvoice({ ...formData });
      setIsDebouncing(false);
      clearTimeout(debounceTimer); // Clear the debounce timer after saving
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await genrateInvoice({ ...formData });
      console.log("Invoice data saved");
    } catch (err) {
      console.error(err);
    }
  };

  useLayoutEffect(() => {
    const id = localStorage.getItem("@invoiceId");

    if (id) {
      getInvoiceById(localStorage.getItem("@invoiceId")).then((res) =>
        setFormData(res)
      );
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: "#fff", marginTop:"20px" }}>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
          <StyledTextField
            sx={{ mb: 2, mt: 2 }}
            label="Client Name"
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
            label=" Making Time"
            fullwidth="true"
            value={formData.making_time}
            onChange={(e) => handleInputChange("making_time", e.target.value)}
          />
          <StyledTextField
            sx={{ mb: 2 }}
            label="discount"
            fullwidth="true"
            type="Number"
            value={formData.dis}
            onChange={(e) => handleInputChange("discount", e.target.value)}
          />
          <InputLabel sx={{ color: "#F98E0A", mb: 2, mt: 2 }}>
            Terms & Conditions
          </InputLabel>
          <textarea
            label="Terms"
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
          />
          <StyledButton type="submit" variant="contained" color="primary">
            Generate Invoice
          </StyledButton>
        </form>
      </Container>
    </Box>
  );
};
