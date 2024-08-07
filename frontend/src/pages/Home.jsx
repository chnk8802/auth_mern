import * as React from "react";
import { Button, Grid } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";
import MainComponent from "../components/MainComponent";
import useIsMobileView from "../hooks/useIsMobileView";
import { useDispatch } from "react-redux";
import { clearCurrentPageInfo, setCurrentPageInfo } from "../app/features/currentPage/currentPageSlice";

export default function Home() {
  const isMobileView = useIsMobileView();
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(clearCurrentPageInfo())
  })
  return (
    <MainComponent>
      <Grid container spacing={1}>
        <Grid container item xs={isMobileView ? 12 : 4}>
          <Grid item xs={12}>
            <Link to="/all-users">
              <Button variant="primary">
                Users <ArrowOutwardIcon />
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/my-profile">
              <Button variant="primary">
                My Profile <ArrowOutwardIcon />
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={isMobileView ? 12 : 4}>
          <Grid item xs={12}>
            <Link to="/all-customers">
              <Button variant="primary">
                Customers <ArrowOutwardIcon />
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/add-customer">
              <Button variant="primary">
                Add Customers <ArrowOutwardIcon />
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={isMobileView ? 12 : 4}>
          <Grid item xs={12}>
            <Link to="/helllo">
              <Button variant="primary">
                helllo <ArrowOutwardIcon />
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </MainComponent>
  );
}
