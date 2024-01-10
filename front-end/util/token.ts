const getToken = () => {
  const loggedInUser = sessionStorage.getItem("token");
  const token = loggedInUser ? JSON.parse(loggedInUser).value : "";
  return token;
};

export { getToken };
