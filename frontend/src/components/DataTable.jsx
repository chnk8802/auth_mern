import * as React from "react";
import { Grid, Button, Typography, Divider, Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import useIsMobileView from "../hooks/useIsMobileView";
import { useNavigate } from "react-router-dom";

export default function DataTable({
  loading,
  rows,
  columns,
  totalRecords,
  paginationModel,
  setPaginationModel,
}) {
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [isEditable, setIsEditable] = React.useState(false);

  const handleRowSelectionChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    // console.log(rowSelectionModel)
  };
  // <------------Toolbar component----------->
  const DataTableToolbar = () => {
    const navigate = useNavigate();
    const { type, doctype, docname, pageHeading } = useSelector(
      (state) => state.currentPage
    );
    const isMobileView = useIsMobileView();
    const addRecord = () => {
      navigate(`/add-${doctype.toLowerCase()}`);
    };
    const editRecord = () => {
      navigate(`/${doctype.toLowerCase()}/update/${rowSelectionModel[0]}`);
    };
    React.useEffect(() => {
      if (rowSelectionModel.length === 1) {
        console.log({
          rowSelectionModel_length: rowSelectionModel.length,
          rowSelectionModel,
        });
        setIsEditable(true);
      } else {
        setIsEditable(false);
      }
    }, []);
    return (
      <>
        <GridToolbarContainer sx={{ pb: 0.5 }}>
          <Grid
            container
            direction={isMobileView ? "column" : "row"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h5">{pageHeading}</Typography>
            </Grid>
            {!isMobileView && <Box sx={{ flexGrow: 1 }} />}
            <GridToolbarFilterButton />
            {isEditable ? (
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={editRecord}
              >
                Edit {doctype}
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={addRecord}
              >
                Add {doctype}
              </Button>
            )}
          </Grid>
        </GridToolbarContainer>
        <Divider variant="fullWidth" orientation="horizontal" />
      </>
    );
  };
  // <------------Toolbar component----------->

  return (
    <Grid container>
      <Grid item xs={12} sx={{ height: "87vh" }}>
        <DataGrid
          checkboxSelection
          loading={loading}
          rows={rows}
          columns={columns}
          initialState={{
            density: "compact",
            pinnedColumns: {
              left: ["Name"],
            },
          }}
          slots={{ toolbar: DataTableToolbar }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          onRowSelectionModelChange={handleRowSelectionChange}
          rowSelectionModel={rowSelectionModel}
          editMode="row"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={totalRecords}
          paginationMode="server"
          pageSizeOptions={[10, 50, 100]}
        />
      </Grid>
    </Grid>
  );
}
