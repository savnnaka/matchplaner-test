const initialState = {
  clubId: null,
  clubName: null,
  logo: null,
  country: null,
  association: null,
  facilities: [],
  teams: [],
  manager: [],
  status: "idle", // string
  error: null, // error?
};

const clubReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CLUB_LOADING":
      return {
        ...state,
        status: "loading",
      };
    case "GET_CLUB_SUCCESS":
      return {
        clubId: action.payload._id,
        clubName: action.payload.clubName,
        logo: action.payload.logo,
        country: action.payload.country,
        association: action.payload.association,
        facilities: action.payload.facilities,
        teams: action.payload.teams,
        manager: action.payload.manager,
        status: "finished",
        error: null,
      };
    case "GET_CLUB_ERROR":
      return {
        ...state,
        error: action.payload.error,
        status: "error",
      };
    default:
      return state;
  }
};

export default clubReducer;
