import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardMedia } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { deleteSelectedItem, getInvoiceById } from "../../api";
import { file_url } from "../../api/config";

export const BasicCard = ({
  number,
  img,
  rate,
  quantity,
  price,
  description,
  payment,
  fixedPrice,
  dimension,
  setItemData,
  setSelected,
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
    <Card sx={{ width: "100%", display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: "50%" }}
        image={`${file_url}/${img}`}
        alt={description}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          {payment === "FixedPayment" ? (
            <>
              <Typography gutterBottom variant="h6" component="div">
                <strong>Description: </strong> {description}
              </Typography>
              <Typography variant="h6" component="div">
                <strong>Price: </strong> {fixedPrice}
              </Typography>
            </>
          ) : (
            <>
              <Typography gutterBottom variant="h6" component="div">
                <strong>Description: </strong> {description}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                <strong>Dimension: </strong> {dimension}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                  <strong>Rate: </strong>
                  {rate}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginLeft: "10px" }}
                >
                  <strong>Quantity: </strong>
                  {quantity}
                </Typography>
              </Box>
              <Typography variant="h6" component="div">
                <strong>Price: </strong> {price}
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          <Button onClick={() => handleEditItem()} sx={{ color: "#EC7C34" }}>
            <Edit />
          </Button>
          <Button onClick={() => handleDeleteItem()} sx={{ color: "#EC7C34" }}>
            <Delete />
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
