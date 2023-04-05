import axios from "axios";

// base url is set in frontend/package.json ("proxy") to http://localhost:5000
const API_URL = "/api/club/";

/**
 * This method gets the club by the team id
 * @route GET /api/club/team
 * @param {String} teamId String
 * @param {String} token String
 * @returns Club object
 */
export const getClubByTeam = async (teamId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      teamId: teamId,
    },
  };

  const response = await axios.get(API_URL + "team", config);

  return response.data;
};

/**
 * This methods creates a facility and stores it in the associated club
 * @route POST /api/club/facility
 * @param {Object} data Object : contains the clubId and the required facility data
 * @param {String} token String : user verification token
 * @returns facility Object
 */
export const createFacility = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "facility", data, config);

  return response.data;
};

/**
 * This methods updates a facility associated with the club id
 * @route PUT /api/club/facility
 * @param {Object} data Object : contains facilityId, clubId and the updated values
 * @param {String} token String : user verification token
 * @returns //response to be checked
 */
export const updateFacility = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      data: data,
    },
  };

  const response = await axios.put(API_URL + "faciliy", config);

  return response.data;
};

/**
 * This methods removes a facility from the the associated club
 * @route DELETE /api/club/facility
 * @param {String} clubId String : Id of club to be updated
 * @param {String} facilityId String : Id of facility to be removed
 * @param {String} token String : user verification token
 * @returns // response to be checked
 */
export const deleteFacility = async (clubId, facilityId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      clubId: clubId,
      facilityId: facilityId,
    },
  };

  const response = await axios.delete(API_URL + "facility", config);

  return response.data;
};
