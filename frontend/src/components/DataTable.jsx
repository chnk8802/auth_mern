import * as React from "react";
import { Grid, Button, Typography, Divider, Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import useIsMobileView from "../hooks/useIsMobileView";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./AlertDialog";
import { setCurrentPageInfo } from "../app/features/currentPage/currentPageSlice";

export default function DataTable({
  loading,
  data,
  totalRecords,
  paginationModel,
  setPaginationModel,
}) {
  // <------------Toolbar component----------->
  const DataTableToolbar = () => {
    const isMobileView = useIsMobileView();
    const navigate = useNavigate();
    const { type, doctype, docname, pageHeading, path } = useSelector(
      (state) => state.currentPage
    );
    const addRecord = () => {
      navigate(`/${doctype?.toLowerCase()}s/add-${doctype.toLowerCase()}`);
    };
    const editRecord = () => {
      navigate(`${path}/update/${rowSelectionModel[0]}`);
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
    }, [rowSelectionModel.length]);
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
              <>
                <AlertDialog
                  doctype={doctype}
                  path={path}
                  id={rowSelectionModel}
                />
                <Button
                  variant="contained"
                  size="small"
                  disableElevation
                  onClick={editRecord}
                >
                  Edit {doctype}
                </Button>
              </>
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

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [isEditable, setIsEditable] = React.useState(false);

  const handleRowSelectionChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };
  // Row and Column Generators
  const generateColumns = (data) => {
    if (data.length === 0) return [];
    const dataObj = data[0];

    const createColumn = (dataObj) => {
      return Object.keys(dataObj).reduce((accumulator, key) => {
        accumulator.push(key);
        if (typeof dataObj[key] === "object" && dataObj[key] !== null) {
          accumulator.push(...createColumn(dataObj[key]));
        }
        console.log(accumulator)
        return accumulator;
      }, []);
    };
    createColumn(dataObj);
    // // console.log(k)
    const column = Object.keys(dataObj).map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      width: 200,
      // valueFormatter: key.includes('At') ? ({ value }) => new Date(value).toLocaleDateString() : undefined
    }));
    return column;
  };
  const generateRows = (data) => {
    return data.map((datum) => ({
      id: datum._id,
      ...datum,
    }));
  };
  const columns = generateColumns(data);
  const rows = generateRows(data);

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
