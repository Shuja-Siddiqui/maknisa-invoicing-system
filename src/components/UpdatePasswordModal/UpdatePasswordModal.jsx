import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { updatePassword } from "../../api";

export const UpdatePasswordModal = ({ show, setShow }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updatePassword({
      currentPass: formData.get("currentPass"),
      newPass: formData.get("newPass"),
      confirmPass: formData.get("confirmPass"),
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  return (
    <Dialog open={show} onClose={() => setShow(false)}>
      <DialogTitle>Update Password</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            sx={{ width: "100%", mb: 2 }}
            placeholder="Current Password"
            type="password"
            name="currentPass"
          />
          <TextField
            sx={{ width: "100%", mb: 2 }}
            placeholder="New Password"
            type="password"
            name="newPass"
          />
          <TextField
            sx={{ width: "100%", mb: 2 }}
            placeholder="Confirm Password"
            type="password"
            name="confirmPass"
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="reset"
            variant="outlined"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="outlined">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
