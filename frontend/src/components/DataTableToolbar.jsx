import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
  } from "@mui/x-data-grid";

export default function DataTableToolbar() {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "end" }}>
        <GridToolbarFilterButton />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: "Export data" },
            button: { variant: "contained" },
          }}
        />
      </GridToolbarContainer>
    );
  }