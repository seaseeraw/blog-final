export const generateResponse = ({
  status,
  message,
  data,
  meta,
  error = { code: 500, details: "Oops, something went wrong!" },
}) => {
  const respObj = {
    status: status ? "success" : "error",
    message,
  };

  if (status) {
    if (data) respObj.data = data;
    if (meta) respObj.meta = meta;
  } else {
    respObj.error = error;
  }

  return respObj;
};
