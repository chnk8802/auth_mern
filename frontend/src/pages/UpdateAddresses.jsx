import * as React from "react";
import MainComponent from "../components/MainComponent";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../app/features/notification/notificationSlice";
import api from "../services/api";
import Address from "../components/fieldComponents/Address";
import { useLocation, useNavigate } from "react-router-dom";
import {
  clearCurrentPageInfo,
  setCurrentPageInfo,
} from "../app/features/currentPage/currentPageSlice";

export default function UpdateAddress() {
  const dispatch = useDispatch();
  const { type, doctype, docname, path } = useSelector((state) => state.currentPage);
  const navigate = useNavigate();
  const location = useLocation();
  const addressId = location.pathname.split("/")[3];
  const [addressData, setAddressData] = React.useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  React.useEffect(() => {
    dispatch(clearCurrentPageInfo());
    dispatch(
      setCurrentPageInfo({
        type: "form",
        doctype: "Address",
        docname: addressId,
        pageHeading: "",
        isReport: false,
      })
    );
  }, []);

  const getAdddress = async () => {
    try {
      const response = await api.get(`${path}/${addressId}`);
      console.log(response)
      const address = response.data.data;
      setAddressData({
          addressLine1: address.addressLine1 || "",
          addressLine2: address.addressLine2 || "",
          city: address.city || "",
          state: address.state || "",
          pincode: address.pincode || "",
          country: address.country || "",
        });
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to fetch address",
          type: "error",
        })
      );
      console.log(
        error.response ? error.response.data : "Failed to fetch address"
      );
    }
  };

  React.useEffect(() => {
    getAdddress();
  }, [addressId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setAddressData({
        ...addressData,
        [name]: value,
      });
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addressData);
    try {
      const response = await api.patch(`${path}/${addressId}`, addressData);
      dispatch(
        showNotification({
          message: "Address Updated successfully!",
          type: "success",
        })
      );
      setCustomerData({
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        });
      navigate(`${path}/all-${doctype}`);
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
        <Address formData={addressData} handleChange={handleChange} />
        <Grid item xs={12}>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            update Customer
          </Button>
        </Grid>
      </Grid>
    </MainComponent>
  );
}
