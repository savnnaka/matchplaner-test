export const getMatchesLoading = () => ({
  type: "GET_MATCHES_LOADING",
});
export const getMatchesSuccess = (matches) => ({
  type: "GET_MATCHES_SUCCESS",
  payload: { matches },
});
export const getMatchesError = (error) => ({
  type: "GET_MATCHES_ERROR",
  payload: { error },
});

export const createMatchLoading = () => ({
  type: "CREATE_MATCH_LOADING",
});
export const createMatchSuccess = () => ({
  type: "CREATE_MATCH_SUCCESS",
});
export const createMatchError = (error) => ({
  type: "CREATE_MATCH_ERROR",
  payload: { error },
});

export const updateMatchLoading = () => ({
  type: "UPDATE_MATCH_LOADING",
});
export const updateMatchSuccess = () => ({
  type: "UPDATE_MATCH_SUCCESS",
});
export const updateMatchError = (error) => ({
  type: "UPDATE_MATCH_ERROR",
  payload: { error },
});

export const deleteMatchLoading = () => ({
  type: "DELETE_MATCH_LOADING",
});
export const deleteMatchSuccess = () => ({
  type: "DELETE_MATCH_SUCCESS",
});
export const deleteMatchError = (error) => ({
  type: "DELETE_MATCH_ERROR",
  error,
});

export const resetStatus = () => ({
  type: "RESET_STATUS",
});

export const openAddMatchModal = () => ({
  type: "OPEN_MODAL",
});

export const closeAddMatchModal = () => ({
  type: "CLOSE_MODAL",
});

export const getFavoriteMatchesLoading = () => ({
  type: "GET_FAVORITE_MATCHES_LOADING",
});

export const getFavoriteMatchesSuccess = (favoriteMatches) => ({
  type: "GET_FAVORITE_MATCHES_SUCCESS",
  payload: { favoriteMatches },
});

export const getFavoriteMatchesError = (error) => ({
  type: "GET_FAVORITE_MATCHES_ERROR",
  payload: { error },
});
