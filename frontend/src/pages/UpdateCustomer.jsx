import * as React from "react";
import MainComponent from "../components/MainComponent";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { showNotification } from "../app/features/notification/notificationSlice";
import api from "../services/api";
import Address from "../components/fieldComponents/Address";
import { useNavigate } from "react-router-dom";

export default function UpdateCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    // const getCustomer =  
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
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
      const response = await api.post("/customers/add-customer", customerData);
      dispatch(
        showNotification({
          message: "Customer created successfully!",
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
      navigate("/all-customers");
    } catch (error) {
      dispatch(
        showNotification({
          message: error.response
            ? error.response.data.message
            : "Failed to add customer",
          type: "error",
        })
      );
      console.log(
        error.response ? error.response.data : "Failed to add customer"
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
            Add Customer
          </Button>
        </Grid>
      </Grid>
    </MainComponent>
  );
}

// import * as React from "react";
// import MainComponent from "../components/MainComponent";
// import { Button, Grid, TextField } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { showNotification } from "../app/features/notification/notificationSlice";
// import api from "../services/api";

// export default function AddCustomer() {
//   const dispatch = useDispatch();
//   const [customerData, setCustomerData] = React.useState({
//     name: "",
//     email: "",
//     phone: "",
//     addressline1: "",
//   });

//   const handleChange = (e) => {
//     setCustomerData({
//       ...customerData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(customerData)
//     try {
//       const response = await api.post("/customers/add-customer", customerData);
//       dispatch(
//         showNotification({
//           message: "Customer created successfully!",
//           type: "success",
//         })
//       );
//       setCustomerData({
//         name: "",
//         email: "",
//         phone: "",
//         addressline1: "",
//       });
//     } catch (error) {
//       dispatch(
//         showNotification({
//           message: error.response
//             ? error.response.data.message
//             : "Failed to add customer",
//           type: "error",
//         })
//       );
//       console.log(
//         error.response ? error.response.data : "Failed to add customer"
//       );
//     }
//   };

//   return (
//     <MainComponent>
//       <Grid item component="h1">
//         Add Customer
//       </Grid>
//       <Grid container item component="form" spacing={2} onSubmit={handleSubmit}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             fullWidth
//             id="name"
//             label="Customer Name"
//             name="name"
//             value={customerData.name}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             id="email"
//             label="Email"
//             name="email"
//             type="email"
//             value={customerData.email}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             id="phone"
//             label="Phone"
//             name="phone"
//             value={customerData.phone}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             id="addressline1"
//             label="Address Line 1"
//             name="addressline1"
//             value={customerData.addressline1}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
//             Add Customer
//           </Button>
//         </Grid>
//       </Grid>
//     </MainComponent>
//   );
// }
