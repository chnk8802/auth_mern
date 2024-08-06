import * as React from "react";
import MainComponent from "../components/MainComponent";
import { Button, Grid, TextField, Snackbar } from "@mui/material";
import api from "../services/api";

export default function AddCustomer() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [customerData, setCustomerData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleClose = (e) => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!customerData.address) {
        delete customerData.address;
      }
      const response = await api.post("/customers/add-customer", customerData);
      
      console.log(response);
      setSnackbarOpen(true);
      setCustomerData({
        name: "",
        email: "",
        phone: "",
        address: "",
      })
    } catch (error) {
      console.error(
        "Error adding customer:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <MainComponent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Customer added successfully"
        variant="outlined"
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'green',
            color: 'white',
          },
        }}
      />
      <Grid item component="h1">
        Add Customer
      </Grid>
      <Grid container item component="form" spacing={2} onSubmit={handleSubmit}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="name"
            label="Customer Name"
            name="name"
            value={customerData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={customerData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={customerData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add Customer
          </Button>
        </Grid>
      </Grid>
    </MainComponent>
  );
}
