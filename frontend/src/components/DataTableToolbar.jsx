import { Button } from "@mui/material";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
  } from "@mui/x-data-grid";

export default function DataTableToolbar() {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "end" }}>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }