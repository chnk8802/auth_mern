import * as React from "react";
import MainComponent from "../components/MainComponent";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../app/features/notification/notificationSlice";
import api from "../services/api";
import Address from "../components/fieldComponents/Address";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearCurrentPageInfo,
  setCurrentPageInfo,
} from "../app/features/currentPage/currentPageSlice";

export default function UpdateCustomer() {
  const dispatch = useDispatch();
  const { type, doctype, docname, path } = useSelector((state) => state.currentPage);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const [customerData, setCustomerData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
  });

  React.useEffect(() => {
    dispatch(clearCurrentPageInfo());
    dispatch(setCurrentPageInfo({type: "form", doctype: "Customer", docname: userId, pageHeading: "", isReport: false}))
    getCustomer();
  },[userId]);

  const getCustomer = async () => {
    try {
      const response = await api.get(`${path}/${userId}`);
      const customer = response.data.customer;
      setCustomerData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: {
          addressLine1: customer.address.addressLine1 || "",
          addressLine2: customer.address.addressLine2 || "",
          city: customer.address.city || "",
          state: customer.address.state || "",
          pincode: customer.address.pincode || "",
          country: customer.address.country || "",
        },
      });
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to fetch customer",
          type: "error",
        })
      );
      console.log(
        error.response ? error.response.data : "Failed to fetch customer"
      );
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({name, value})
    if (name in customerData.address) {
      setCustomerData({
        ...customerData,
        address: {
          ...customerData.address,
          [name]: value,
        },
      });
    } else {
      setCustomerData({
        ...customerData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(customerData);
    try {
      const response = await api.patch(`/customers/${userId}`, customerData);
      dispatch(
        showNotification({
          message: "Customer Updated successfully!",
          type: "success",
        })
      );
      setCustomerData({
        name: "",
        email: "",
        phone: "",
        address: {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
        },
      });
      navigate("/customers/all-customers");
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to update customer",
          type: "error",
        })
      );
      console.log(
        error.response ? error.response.data : "Failed to Update customer"
      );
    }
  };

  return (
    <MainComponent>
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
        <Address formData={customerData} handleChange={handleChange} />
        <Grid item xs={12}>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            update Customer
          </Button>
        </Grid>
      </Grid>
    </MainComponent>
  );
}
