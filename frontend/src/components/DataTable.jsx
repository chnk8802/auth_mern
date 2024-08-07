import * as React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import DataTableToolbar from "../components/DataTableToolbar";
import { Grid } from "@mui/material";

export default function DataTable({
  loading,
  rows,
  columns,
  totalRecords,
  paginationModel,
  setPaginationModel,
}) {
  /*
  const [selectionModel, setSelectionModel] = React.useState([]);
  const handleSelectionChange = (newSelection) => {
    setSelectionModel(newSelection);
  };
  */

  return (
    <Grid container>
      <Grid item xs={12} sx={{ height: "85vh" }}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          slots={{ toolbar: DataTableToolbar }}
          checkboxSelection
          disableRowSelectionOnClick
          /*
          onSelectionModelChange={handleSelectionChange}
          selectionModel={selectionModel}
          */
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={totalRecords}
          paginationMode="server"
          pageSizeOptions={[10, 50, 100]}
          initialState={{
            density: "compact",
          }}
        />
      </Grid>
    </Grid>
  );
}
