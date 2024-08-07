import * as React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import DataTable from "../components/DataTable";
import MainComponent from "../components/MainComponent";
import { useDispatch } from "react-redux";
import { clearCurrentPageInfo, setCurrentPageInfo } from "../app/features/currentPage/currentPageSlice";

export default function Users() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 100,
    page: 0,
  });
  React.useEffect(()=>{
    dispatch(clearCurrentPageInfo())
    dispatch(setCurrentPageInfo({type: "report", doctype: "User", pageHeading: "All Users", isReport: true}))
  })

  const getUsers = async () => {
    try {
      const response = await api.get("/users/all-users");
      setUsers(response.data.data);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
      getUsers();
  }, [ paginationModel.page, paginationModel.pageSize]);

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
  const columns = generateColumns(users);
  const rows = users.map((user) => ({
    id: user._id, // Ensure you provide a unique ID field
    ...user, // Spread the user object to include all properties
  }));

  return (
    <MainComponent>
      <DataTable rows={rows} columns={columns} totalRecords={totalRecords} paginationModel={paginationModel} setPaginationModel={setPaginationModel}/>
    </MainComponent>
  );
}
