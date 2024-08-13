import api from './api'

export const getUsers = async (page, pageSize) => {
    try {
      const response = await api.get(`/users/all-users?${page}&pageSize=${pageSize}`);
      const result = {
        data: response.data.data,
        totalRecords: response.data.totalRecords
      }
      return result
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  };