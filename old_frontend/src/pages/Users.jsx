import * as React from "react";
import { getUsers } from "../services/userService";
import DataTable from "../components/DataTable";
import MainComponent from "../components/MainComponent";
import { useDispatch } from "react-redux";
import {
  clearCurrentPageInfo,
  setCurrentPageInfo,
} from "../app/features/currentPage/currentPageSlice";
import { showNotification } from "../app/features/notification/notificationSlice";

export default function Users() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
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
        doctype: "User",
        pageHeading: "All Users",
        isReport: true,
      })
    );
  });

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers(
          paginationModel.page,
          paginationModel.pageSize
        );
        setUsers(response.data);
        setTotalRecords(response.totalRecords);
      } catch (error) {
        dispatch(
          showNotification({
            type: "error",
            open: true,
            message: "Unable to fecth users",
          })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [paginationModel.page, paginationModel.pageSize, dispatch]);

  return (
    <MainComponent>
      <DataTable
        data={users}
        loading={loading}
        totalRecords={totalRecords}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </MainComponent>
  );
}
