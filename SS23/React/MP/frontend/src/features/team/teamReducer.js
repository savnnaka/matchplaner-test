const initialState = {
  teamId: null,
  trainer: [], // Array with coachIds
  age: null, // label: string, value: number
  league: null, // label: string, value: number
  colors: null, // shirt: string, pants: string, socks: string
  rating: null, // grade: number, amount: number
  news: [], // Array with message objects
  favoriteMatches: [], // Array with matchIds
  level: null, // number
  link: null, // string
  fun: null, // number
  intensity: null, // number
  complexity: null, // number
  status: "idle", // string
  error: null, // error?
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TEAM_LOADING":
      return {
        ...state,
        status: "loading",
      };
    case "GET_TEAM_SUCCESS":
      return {
        teamId: action.payload._id,
        trainer: action.payload.trainer,
        age: action.payload.age,
        league: action.payload.league,
        colors: action.payload.colors,
        rating: action.payload.rating,
        news: action.payload.news,
        favoriteMatches: action.payload.favoriteMatches,
        level: action.payload.level,
        link: action.payload.link,
        fun: action.payload.fun,
        intensity: action.payload.intensity,
        complexity: action.payload.complexity,
        error: null,
        status: "finished",
      };
    case "GET_TEAM_ERROR":
      return {
        ...state,
        error: action.payload.error,
        status: "error",
      };
    case "MARK_FAVORITE_ERROR":
      return {
        ...state,
        error: action.payload.error,
        status: "error",
      };
    case "UNMARK_FAVORITE_ERROR":
      return {
        ...state,
        error: action.payload.error,
        status: "error",
      };
    default:
      return state;
  }
};

export default teamReducer;
