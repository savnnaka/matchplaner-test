import axios from "axios";

// base url is set in frontend/package.json ("proxy") to http://localhost:5000
const API_URL = "/api/users/";

export const getFacts = async () => {
  const res = await axios.get(API_URL + "facts");
  return res.data;
};
export const setFacts = async (name, value) => {
  const res = await axios.post(API_URL + "facts", { name, value });
  return res.data;
};

export const login = async (userData) => {
  return await axios.post(API_URL + "login", userData);
};

// logout does not need to talk to the server

export const checkUser = async (user) => {
  const res = await axios.post(API_URL + "checkUser", user);
  return res.data;
};

export const checkToken = async (token) => {
  return await axios.post(API_URL + "checkToken", { token });
};

export const checkRegistrationCode = async (code) => {
  const response = await axios.post(API_URL + "register/checkCode", { code });

  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  return response;
};

export const resendEmail = async (email) => {
  const response = await axios.post(API_URL + "register/success/resend", email);

  return response.data;
};

// protected routes (send token for authorization)

export const addOneRandomCode = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "addCode", { user }, config);

  return response.data;
};

export const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "profile", userData, config);

  // response is all data of the user, so just set the item "user" again
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const resetPassword = async (email) => {
  const response = await axios.post(API_URL + "resetPassword", email);

  return response.data;
};

export const resetPasswordSetNew = async (userData) => {
  const response = await axios.post(API_URL + "resetPassword/new", userData);

  return response.data;
};

export const validateEmail = async (userData) => {
  const response = await axios.post(API_URL + "validate", userData);

  return response.data;
};

export const deleteUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // axios.delete(url[, config])
  const response = await axios.delete(API_URL + "profile", config);
  // .then(localStorage.removeItem("user"))
  // .catch((error) => {
  //   console.log(error);
  // });
};

// stripe payments
