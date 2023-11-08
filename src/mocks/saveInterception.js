const saveInterception = ({
  url,
  response,
  status,
  // params
}) => {
  const { pathname } = new URL(url);
  window.localStorage[pathname] = JSON.stringify({ response, status });
};

const getInterception = ({
  url,
  // params
}) => {
  const { pathname } = new URL(url);
  return JSON.parse(window.localStorage.getItem(pathname));
};
export { saveInterception, getInterception };
