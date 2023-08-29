import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardMedia } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getInvoiceById, updateItem } from "../../api/config";

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
}) => {
  const handleEditItem = () => {
    try {
      // updateItem().then((res) => console.log(res));
      getInvoiceById(localStorage.getItem("@invoiceId"))
        .then((res) => {
          setItemData((prev) => {
            return { ...prev, ...res };
          });
          console.log(itemData);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    // setSelected(number);
    // setAddedItems([...addedItems.slice(0, number)]);
  };
  return (
    <Card sx={{ width: "50%", display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: "50%" }}
        image={img}
        alt="Live from space album cover"
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
          <Button>
            <Delete />
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
