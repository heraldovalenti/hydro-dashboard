const saveInterception = ({ path, response, status }) => {
  window.localStorage[path] = JSON.stringify({ response, status });
};

const getInterception = (path) => {
  return JSON.parse(window.localStorage.getItem(path));
};
export { saveInterception, getInterception };
