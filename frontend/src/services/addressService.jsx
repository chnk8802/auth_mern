import api from "./api";

export const getAddresses = async (page, pageSize) => {
  try {
    const response = await api.get(
      `/addresses/all-addresses?page=${page}&pageSize=${pageSize}`
    );
    const result = {
      data: response.data.data,
      totalRecords: response.data.totalRecords,
    };
    return result;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response ? error.response.data : error.message
    );
  }
};
