import * as React from "react";
import { getAddresses } from "../services/addressService";
import DataTable from "../components/DataTable";
import MainComponent from "../components/MainComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentPageInfo,
  setCurrentPageInfo,
} from "../app/features/currentPage/currentPageSlice";
import { showNotification } from "../app/features/notification/notificationSlice";

export default function Addresses() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [addresses, setAddresses] = React.useState([]);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 100,
    page: 0,
  });

  React.useEffect(() => {
    dispatch(clearCurrentPageInfo());
    dispatch(
      setCurrentPageInfo({
        type: "report",
        doctype: "Address",
        pageHeading: "All Addresses",
        isReport: true,
      })
    );
  }, [dispatch]);
  React.useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const response = await getAddresses(
          paginationModel.page,
          paginationModel.pageSize
        );
        setAddresses(response.data);
        setTotalRecords(response.totalRecords);
      } catch (error) {
        dispatch(
          showNotification({
            open: true,
            message: "Unable to fetch data",
            type: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    dispatch,
  ]);

  return (
    <MainComponent>
      <DataTable
        loading={loading}
        data={addresses}
        totalRecords={totalRecords}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </MainComponent>
  );
}
