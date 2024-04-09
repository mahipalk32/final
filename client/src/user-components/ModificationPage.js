


import React, { useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuth0 } from "@auth0/auth0-react";

function ModificationPage() {
  const [newWallet, setNewWallet] = useState(0);
  const [open, setOpen] = useState(false); // State to manage dialog open/close
  const navigate = useNavigate();
  const { user } = useAuth0();

  const handleNewWallet = () => {
    axios
      .put(`http://localhost:8080/wallet/${user.email}`, { newWallet })
      .then((result) => {
        setOpen(true); // Open the dialog on successful update
      })
      .catch((err) => {
        console.error("Error updating wallet:", err);
      });
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    navigate("/student/high-school/payment"); // Navigate to the desired location
  };

  const handleNo = () => {
    setOpen(false)
    navigate("/")
  }

  return (
    <div className="walletdiv">
      <Card className="wallet-card">
        <TextField
          required
          fullWidth
          name="walletupdate"
          label="Enter amount"
          type="number"
          id="walletupdate"
          onChange={(e) => setNewWallet(e.target.value)}
        />
        <CardContent>
          <Button type="text" onClick={handleNewWallet} variant="outlined">
            Update Wallet
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Wallet Updated Successfully"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to continue application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yes
          </Button>
          <Button onClick={handleNo} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModificationPage;
