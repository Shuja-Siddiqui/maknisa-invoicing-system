import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardMedia } from "@mui/material";
import { Delete, Edit, Update } from "@mui/icons-material";
import { deleteSelectedItem, getInvoiceById, updateItem } from "../../api";
import { file_url } from "../../api/config";

export const BasicCard = ({
  number,
  img,
  rate,
  quantity,
  price,
  description,
  setItemData,
  setSelected,
  setAddedItems,
  addedItems,
  itemData,
  fetchData,
  handleToggleForm,
}) => {
  const handleEditItem = () => {
    try {
      getInvoiceById(localStorage.getItem("@invoiceId"))
        .then((res) => {
          setItemData({ ...itemData, ...res?.items[number] });
          setSelected(number);
          handleToggleForm(true);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteItem = () => {
    try {
      deleteSelectedItem(number)
        .then((res) => {
          console.log(res);
          fetchData();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card sx={{ width: "50%", display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: "50%" }}
        image={`${file_url}/${img}`}
        alt={description}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Typography size="small">{rate}</Typography>
            <Typography size="small">{quantity}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleEditItem()}>
            <Edit />
          </Button>
          <Button onClick={() => handleDeleteItem()}>
            <Delete />
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
