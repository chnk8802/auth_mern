import * as React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import DataTable from "../components/DataTable";
import MainComponent from "../components/MainComponent";

export default function Customers() {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 100,
    page: 0,
  });

  const getCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/customers/all-customers?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}`
      );
      console.log(response);
      setCustomers(response.data.data);
      setTotalRecords(response.data.totalRecords);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  };
  useEffect(() => {
    getCustomers();
  }, [paginationModel.page, paginationModel.pageSize]);

  // Dynamically generate columns based on the keys of the first user object
  const generateColumns = (data) => {
    if (data.length === 0) return [];

    // Extract the keys from the first object
    const keys = Object.keys(data[0]);
    // Create column definitions
    return keys.map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: 200,
      // valueFormatter: key.includes('At') ? ({ value }) => new Date(value).toLocaleDateString() : undefined
    }));
  };

  // Generate columns and format rows
  const columns = generateColumns(customers);
  const rows = customers.map((customer) => ({
    id: customer._id, // Ensure you provide a unique ID field
    ...customer, // Spread the user object to include all properties
  }));

  return (
    <MainComponent>
      <DataTable
        loading={loading}
        rows={rows}
        columns={columns}
        totalRecords={totalRecords}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </MainComponent>
  );
}
