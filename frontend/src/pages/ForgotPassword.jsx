import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import VerifyEmail from "../components/authentication/VerifyEmail";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import OtpInput from "../components/authentication/OtpInput";
import ChangePassword from "../components/authentication/ChangePassword";

export default function ForgotPassword() {
  return (
    <>
    <Header/>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <VerifyEmail/>
        {/* <OtpInput/> */}
        {/* <ChangePassword/> */}
        <Link to="/login" ><Typography variant="body2">Back to login</Typography></Link>
      </Box>
    </Container>
    </>
  );
}
