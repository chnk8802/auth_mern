import { Grid, TextField, Typography } from "@mui/material";
import * as React from "react";

export default function Address({ formData, handleChange }) {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography>Address</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="addressLine1"
            label="Address Line 1"
            name="addressLine1"
            value={formData.address.addressLine1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="addressLine2"
            label="Address Line 2"
            name="addressLine2"
            value={formData.address.addressLine2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="city"
            label="City"
            name="city"
            value={formData.address.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="state"
            label="State"
            name="state"
            value={formData.address.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="pincode"
            label="Pincode"
            type="number"
            name="pincode"
            value={formData.address.pincode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="country"
            label="Country"
            name="country"
            value={formData.address.country}
            onChange={handleChange}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}
