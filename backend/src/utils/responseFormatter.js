export const sendFormattedResponse = (
  res,
  data = null,
  message = "Success",
  options = {}
) => {
  const {status = "Success", code = 200, pagination = null} = options;
  const formatData = (item) =>
    item?.toJSON ? item.toJSON() : item;

  let formattedData = null;
  if (data !== null && data !== undefined) {
    formattedData = Array.isArray(data) ? data.map(formatData) : formatData(data);
  }

  res.status(code).json({
    status,
    code,
    message,
    data: formattedData,
    dataCount: Array.isArray(formattedData) ? formattedData.length : (formattedData ? 1 : 0),
    pagination,
    timestamp: new Date().toISOString(),
  });
};
