export const response = (data = {}, status = 200) => {
  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: status,
    body: JSON.stringify(data),
  }
}