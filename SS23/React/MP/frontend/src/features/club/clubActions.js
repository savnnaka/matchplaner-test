export const getClubLoading = () => ({
  type: "GET_CLUB_LOADING",
});

export const getClubSuccess = (clubData) => ({
  type: "GET_CLUB_SUCCESS",
  payload: { ...clubData },
});

export const getClubError = (error) => ({
  type: "GET_CLUB_ERROR",
  payload: { error },
});
