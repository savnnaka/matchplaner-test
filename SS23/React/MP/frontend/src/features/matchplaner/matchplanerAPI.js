import axios from "axios";

// base url is set in frontend/package.json ("proxy") to http://localhost:5000
const API_URL_COACH = "/api/coach/";
const API_URL_TEAM = "/api/team/";

export const getMatches = async (token) => {
  // Token for protected routes
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // axios.post(URL, [Data, [Config]])
  const response = await axios.get(API_URL_COACH + "matchplaner", config);

  return response.data;
};

export const createMatch = async (matchData, token) => {
  // Token for protected routes
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // axios.post(URL, [Data, [Config]])
  const response = await axios.post(
    API_URL_COACH + "matchplaner",
    matchData,
    config
  );

  return response.data;
};

export const updateMatch = async (userData, token) => {
  // Token for protected routes
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // axios.put(URL, [Data, [Config]])
  const response = await axios.put(
    API_URL_COACH + "matchplaner",
    userData,
    config
  );

  return response.data;
};

export const deleteMatch = async (userData, token) => {
  // Token for protected routes and userData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userData,
    },
  };

  // axios.delete(URL, [Config])
  const response = await axios.delete(API_URL_COACH + "matchplaner", config);

  return response.data;
};

/**
 * This method gets the favorite matches of a team.
 * @param {Array} data Array - favorite match ids
 * @param {String} token String
 * @returns Array containing the matches
 */
export const getFavoriteMatches = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      matchIds: data,
    },
  };

  const response = await axios.get(API_URL_TEAM + "favorite", config);

  return response.data;
};
