export const sendFormattedResponse = ( res, data, message = "Success", totalRecords = 0 ) => {
  if (data !== null) {
    data = Array.isArray(data) ? data : [data];
  }
  res.status(200).json({
    status: "Success",
    code: 200,
    data,
    dataCount: Array.isArray(data) ? data.length : 1,
    totalRecords,
    message,
    timestamp: new Date().toISOString(),
  });
};
