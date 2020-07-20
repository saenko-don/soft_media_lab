const BASE_URL = process.env.REACT_APP_SERVER_ADDRESS;

const request = async (url: String, options?: RequestInit) => {
  if (options && options.body) {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options
  });
  return {
    status: response.status,
    ...(response.status === 200 ? {data: await response.json()} : null)
  }
};

export default request;
