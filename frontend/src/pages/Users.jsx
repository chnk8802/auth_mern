import * as React from "react";
import { Box, Container, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import api from "../services/api";
import ReportHeader from "../components/ReportHeader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await api.get("/users/all-users", config);
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response ? error.response.data : error.message
        );
      }
    };
    getUsers();
  }, [accessToken]);

  // Dynamically generate columns based on the keys of the first user object
  const generateColumns = (data) => {
    if (data.length === 0) return [];

    // Extract the keys from the first object
    const keys = Object.keys(data[0]);
    console.log(keys)
    // Create column definitions
    return keys.map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: 200,
      // valueFormatter: key.includes('At') ? ({ value }) => new Date(value).toLocaleDateString() : undefined
    }));
  };

  // Generate columns and format rows
  const columns = generateColumns(users);
  const rows = users.map((user) => ({
    id: user._id, // Ensure you provide a unique ID field
    ...user, // Spread the user object to include all properties
  }));

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
          <Grid container>
            <Grid item xs={12} container justifyContent="center">
              <ReportHeader docName="User" isReport={false} />
            </Grid>
            <Grid item xs={12} sx={{height: "500px" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                density="compact"
                checkboxSelection
                pageSizeOptions={[10, 50, 100]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
