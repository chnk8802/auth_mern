import * as React from "react";
import { Box, Container } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react";
import Header from "../components/Header";
import Footer2 from "../components/Footer2";
import api from '../services/api'


export default function Users() {
    
    useEffect(()=> {
        const getUsers = async () => {
            const response = await api.get('/users/all-users')
            console.log(response)
        }
        getUsers().then((response) => {
            console.log(response)
        })
    },[])
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 8.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        </Box>
      </Container>
      <Footer2 />
    </>
  );
}
