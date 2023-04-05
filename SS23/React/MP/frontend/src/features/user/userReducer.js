const initialState = {
  token: null,
  user: null,
  error: null,
  status: "idle",
  agreementCounter: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_LOADING":
      return {
        ...state,
        status: "loading",
      };
    case "LOGIN_SUCCESS":
      return {
        token: action.payload.jwt,
        user: action.payload.user,
        error: null,
        status: "success",
      };
    case "LOGIN_ERROR":
      return {
        token: null,
        user: null,
        error: action.payload.error,
        status: "failed",
      };

    case "LOGOUT":
      return {
        token: null,
        user: null,
        error: null,
        status: "idle",
      };

    case "REGISTER_LOADING":
      return {
        status: "loading",
      };
    case "REGISTER_SUCCESS":
      return {
        error: null,
        status: "success",
      };
    case "REGISTER_ERROR":
      return {
        error: action.payload.error,
        status: "failed",
      };
    case "REGISTER_VALIDATION_LOADING":
      return {
        status: "loading",
      };
    case "REGISTER_VALIDATION_SUCCESS":
      return {
        error: null,
        status: "success",
      };
    case "REGISTER_VALIDATION_ERROR":
      return {
        error: action.payload.error,
        status: "failed",
      };

    case "VALIDATE_EMAIL_LOADING":
      return {
        status: "loading",
      };
    case "VALIDATE_EMAIL_SUCCESS":
      return {
        error: null,
        status: "success",
      };
    case "VALIDATE_EMAIL_ERROR":
      return {
        error: action.payload.error,
        status: "failed",
      };

    case "UPDATE_LOADING":
      return {
        ...state,
        status: "loading",
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        error: null,
        status: "success",
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        error: action.payload.error,
        status: "failed",
      };

    case "RESET_PASSWORD_LOADING":
      return {
        ...state,
        status: "loading",
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        error: null,
        status: "success_reset_pw",
      };
    case "RESET_PASSWORD_ERROR":
      return {
        ...state,
        error: action.payload.error,
        status: "failed",
      };

    case "SET_AGREEMENT_COUNTER":
      return {
        ...state,
        agreementCounter: action.payload.counter,
      };

    case "RESET_STATUS":
      return {
        ...state,
        status: "idle",
      };
    default:
      return state;
  }
};

export default userReducer;
