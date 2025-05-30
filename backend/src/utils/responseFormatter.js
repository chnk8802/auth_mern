export const sendFormattedResponse = ( res, data, message = "Success", totalRecords = 0 ) => {
  if (data !== null) {
    totalRecords = totalRecords || (Array.isArray(data) ? data.length : 1);
    data = Array.isArray(data) ? data : [data];
  }
  res.status(200).json({
    status: "Success",
    data,
    totalRecords,
    message,
    timestamp: new Date().toISOString(),
  });
};
