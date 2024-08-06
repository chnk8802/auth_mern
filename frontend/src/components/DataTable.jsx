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
  return (
    <Grid container>
      <Grid item xs={12} sx={{ height: "500px" }}>
        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          slots={{ toolbar: DataTableToolbar }}
          checkboxSelection
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
