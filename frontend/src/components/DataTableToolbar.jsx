import { Button } from "@mui/material";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
  } from "@mui/x-data-grid";

export default function DataTableToolbar({action}) {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "end" }}>
        <GridToolbarFilterButton />
        <Button variant="contained">{action}</Button>
      </GridToolbarContainer>
    );
  }