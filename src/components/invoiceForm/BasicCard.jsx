import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit, Image } from "@mui/icons-material";
import { deleteSelectedItem, getInvoiceById, updateImage } from "../../api";
import { url } from "../../api/config";
import { StyledButton } from "../../pages";

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
  id,
}) => {
  const [showModal, setShowModal] = React.useState(false);
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
          fetchData();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateImage(formData, img).then(() => {
      fetchData();
      setShowModal(false);
    });
  };
  return (
    <>
      <Dialog open={showModal}>
        <DialogTitle>Update Image</DialogTitle>
        <form onSubmit={handleImageUpdate}>
          <DialogContent>
            <input type="file" name="avatar" id="avatar_update_image" />
          </DialogContent>
          <DialogActions>
            <StyledButton variant="contained" type="submit">
              Update Image
            </StyledButton>
            <StyledButton
              variant="outlined"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </StyledButton>
          </DialogActions>
        </form>
      </Dialog>
      <Card sx={{ width: "100%", display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: "50%" }}
          image={
            img
              ? `${url}/files/${img}`
              : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
          }
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
                  <strong>Dimension: </strong> {dimension || "   --"}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" component="div">
                    <strong>Rate: </strong>
                    {rate || 0}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginLeft: "10px" }}
                  >
                    <strong>Quantity: </strong>
                    {quantity || 0}
                  </Typography>
                </Box>
                <Typography variant="h6" component="div">
                  <strong>Price: </strong> {isNaN(price) ? 0 : price}
                </Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            <Button onClick={() => handleEditItem()} sx={{ color: "#EC7C34" }}>
              <Edit />
            </Button>
            <Button
              onClick={() => setShowModal(true)}
              sx={{ color: "#EC7C34" }}
            >
              <Image />
            </Button>
            <Button
              onClick={() => handleDeleteItem()}
              sx={{ color: "#EC7C34" }}
            >
              <Delete />
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
};
