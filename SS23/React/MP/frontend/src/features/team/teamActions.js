export const loginSuccess = (teamData) => ({
  type: "LOGIN_SUCCESS",
  payload: { teamData },
});

export const markFavoriteError = (error) => ({
  type: "MARK_FAVORITE_ERROR",
  payload: { error },
});

export const unmarkFavoriteError = (error) => ({
  type: "UNMARK_FAVORITE_ERROR",
  payload: { error },
});

export const getTeamLoading = () => ({
  type: "GET_TEAM_LOADING",
});

export const getTeamSuccess = (teamData) => ({
  type: "GET_TEAM_SUCCESS",
  payload: { ...teamData },
});

export const getTeamError = (error) => ({
  type: "GET_TEAM_ERROR",
  payload: { error },
});
