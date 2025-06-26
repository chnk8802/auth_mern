import * as React from "react";
import { getCustomers } from "../services/customerService";
import DataTable from "../components/DataTable";
import MainComponent from "../components/MainComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentPageInfo,
  setCurrentPageInfo,
} from "../app/features/currentPage/currentPageSlice";
import { showNotification } from "../app/features/notification/notificationSlice";

export default function Customers() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [customers, setCustomers] = React.useState([]);
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
        doctype: "Customer",
        pageHeading: "All Customers",
        isReport: true,
      })
    );
  }, [dispatch]);
  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await getCustomers(
          paginationModel.page,
          paginationModel.pageSize
        );
        setCustomers(response.data);
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
    fetchCustomers();
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    dispatch,
  ]);

  return (
    <MainComponent>
      <DataTable
        loading={loading}
        data={customers}
        totalRecords={totalRecords}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </MainComponent>
  );
}
