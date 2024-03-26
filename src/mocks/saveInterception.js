const requestKey = (url, params) => {
  const { pathname } = new URL(url);
  const queryString = new URLSearchParams(params);
  return `${pathname}?${queryString.toString()}`;
};
const saveInterception = ({ url, response, status, params }) => {
  const key = requestKey(url, params);
  window.localStorage[key] = JSON.stringify({ response, status });
};

const getInterception = ({ url, params }) => {
  const key = requestKey(url, params);
  const payload = window.localStorage.getItem(key);
  return payload !== null ? JSON.parse(payload) : undefined;
};

export { saveInterception, getInterception };
