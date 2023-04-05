import axios from "axios";

// base url is set in frontend/package.json ("proxy")
const API_URL = "/api/team/";

/**
 * This method adds a match to the favorite matches of a team
 * @route PUT /api/team/favorite
 * @param {Object} data Object : contains the team information and the match id
 * @param {String} token String : user verification token
 * @returns {Object}
 */
export const markFavorite = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + "favorite", data, config);

  return response.data;
};

/**
 * This methods removes a match from the favorite matches of a team
 * @route DELETE /api/team/favorite
 * @param {Object} data Object : contains the team information and the match id
 * @param {String} token String : user verification token
 */
export const unmarkFavorite = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      matchId: data.matchId,
      teamId: data.teamId,
    },
  };
  const response = await axios.delete(API_URL + "favorite", config);

  return response.data;
};

/**
 * This method gets the team object by the user ID
 * @route GET /api/team/coach
 * @param {String} token String - user verification token
 * @returns team object
 */
export const getTeamByCoach = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "coach", config);
  // console.log(response);
  // KM_TODO: response checken!
  return response.data;
};
