import api from "./api";

export const getAllRecords = async (doctype, page, pageSize) => {
  try {
    const response = await api.get(`/${doctype?.toLowerCase()}s/all-${doctype?.toLowerCase()}s?page=${page}&pageSize=${pageSize}`);

    const result = {
      data: response.data.data,
      totalRecords: response.data.totalRecords,
    };
    return result;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
  }
};
