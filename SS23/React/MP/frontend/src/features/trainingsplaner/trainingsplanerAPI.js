import axios from "axios";

// base url is set in frontend/package.json ("proxy") to http://localhost:5000
const API_URL = "/api/coach/";

export const createTraining = async (userData, token) => {
  // Token for protected routes
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // axios.post(URL, [Data, [Config]])
  const response = await axios.post(
    API_URL + "trainingsplaner",
    userData,
    config
  );

  return response.data;
};

export const changeSingleFocus = async (userData, token) => {
  // Token for protected routes
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("Hier backend anfragen");

  // axios.post(URL, [Data, [Config]])
  // const response = await axios.post(
  //   API_URL + "trainingsplaner",
  //   userData,
  //   config
  // );

  // return response.data;
};
