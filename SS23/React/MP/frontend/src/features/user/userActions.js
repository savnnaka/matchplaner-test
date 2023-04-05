export const loginLoading = () => ({
  type: "LOGIN_LOADING",
});
export const loginSuccess = (jwt, user) => ({
  type: "LOGIN_SUCCESS",
  payload: { jwt, user },
});
export const loginError = (error) => ({
  type: "LOGIN_ERROR",
  payload: { error },
});

export const logout = () => ({
  type: "LOGOUT",
});

export const registerLoading = () => ({
  type: "REGISTER_LOADING",
});
export const registerSuccess = () => ({
  type: "REGISTER_SUCCESS",
});
export const registerError = (error) => ({
  type: "REGISTER_ERROR",
  payload: { error },
});
export const registerCodeValidationLoading = () => ({
  type: "REGISTER_VALIDATION_LOADING",
});
export const registerCodeValidationSuccess = () => ({
  type: "REGISTER_VALIDATION_SUCCESS",
});
export const registerCodeValidationError = (error) => ({
  type: "REGISTER_VALIDATION_ERROR",
  payload: { error },
});

export const validateEmailLoading = () => ({
  type: "VALIDATE_EMAIL_LOADING",
});
export const validateEmailSuccess = () => ({
  type: "VALIDATE_EMAIL_SUCCESS",
});
export const validateEmailError = (error) => ({
  type: "VALIDATE_EMAIL_ERROR",
  payload: { error },
});

export const updateLoading = () => ({
  type: "UPDATE_LOADING",
});
export const updateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: { user },
});
export const updateError = (error) => ({
  type: "UPDATE_ERROR",
  payload: { error },
});

export const resetPasswordLoading = () => ({
  type: "RESET_PASSWORD_LOADING",
});
export const resetPasswordSuccess = () => ({
  type: "RESET_PASSWORD_SUCCESS",
});
export const resetPasswordError = (error) => ({
  type: "RESET_PASSWORD_ERROR",
  payload: { error },
});

export const setAgreementCounter = (counter) => ({
  type: "SET_AGREEMENT_COUNTER",
  payload: { counter },
});

export const resetStatus = () => ({
  type: "RESET_STATUS",
});
