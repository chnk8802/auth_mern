export const sendFormattedResponse = (
  res,
  data,
  message = "Success",
  totalRecords = 0
) => {
  const formatData = (item) =>
    item?.toJSON ? item.toJSON() : item;

  if (data !== null) {
    data = Array.isArray(data) ? data.map(formatData) : formatData(data);
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
