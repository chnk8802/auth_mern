const sendFormattedResponse = (
  res,
  data = null,
  message = "Success",
  meta = {}
) => {
  const { status = "success", code = 200, pagination = {} } = meta;

  const formatData = (item) => (item?.toJSON ? item.toJSON() : item);
  
  let formattedData = [];

  if (data != null) {
    if (Array.isArray(data)) {
      formattedData = data.map(formatData);
    } else {
      formattedData = [formatData(data)]; // wrap single object in array
    }
  }

  res.status(code).json({
    data: formattedData,
    dataCount: formattedData.length,
    message,
    meta: {
      status,
      code,
      pagination,
      timestamp: new Date().toISOString(),
    },
  });
};

export default sendFormattedResponse;