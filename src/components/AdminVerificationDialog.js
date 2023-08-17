// AdminVerificationDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function AdminVerificationDialog({ open, onClose, onVerify }) {
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setAdminCredentials((prevCredentials) => ({
      ...prevCredentials,
      [field]: value,
    }));
  };

  const handleVerify = () => {
    onVerify(adminCredentials);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Admin Verification</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          value={adminCredentials.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={adminCredentials.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleVerify}>Verify</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminVerificationDialog;
