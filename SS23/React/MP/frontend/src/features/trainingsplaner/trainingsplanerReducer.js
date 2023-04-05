const initialState = {
  error: null,
  status: "idle",
  unit: [],
  top10: [],
  allExercises: [],
  newTab: 0,
  unitInfo: null,
};

const trainingsplanerReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case "CREATE_TRAINING_LOADING":
      return {
        ...state,
        error: null,
        status: "loading",
      };
    case "CREATE_TRAINING_SUCCESS":
      return {
        ...state,
        top10: action.payload.top10,
        unit: action.payload.trainingseinheit,
        allExercises: action.payload.allExercises,
        error: null,
        status: "success",
      };
    case "CREATE_TRAINING_ERROR":
      return {
        ...state,
        top10: [],
        unit: [],
        allExercises: [],
        error: action.payload.error,
        status: "failed",
      };

    case "SET_UNIT":
      return {
        ...state,
        unit: action.payload.newUnit,
      };

    case "SET_TOP_10":
      return {
        ...state,
        top10: action.payload.newTop10,
      };

    case "SET_ALL_EXERCISES":
      return {
        ...state,
        allExercises: action.payload.newAllExercises,
      };

    case "CHANGE_EXERCISE":
      return {
        ...state,
        top10: state.top10.map((topArray, index) => {
          if (index !== action.payload.indexUnit) {
            return topArray;
          } else {
            topArray.map((ex, index) => {
              if (index !== action.payload.indexTop10) {
                return ex;
              } else {
                return action.payload.oldExercise;
              }
            });
            return topArray;
          }
        }),
        unit: [
          ...state.unit.slice(0, action.payload.indexUnit),
          action.payload.newExercise,
          ...state.unit.slice(action.payload.indexUnit + 1),
        ],
      };

    case "SET_TAB":
      return {
        ...state,
        newTab: action.payload.newTab,
      };

    case "SET_UNIT_INFO":
      return {
        ...state,
        error: null,
        unitInfo: action.payload.unitInfo,
      };
    // case "SET_UNIT":
    //   return {
    //     ...state,
    //     error: null,
    //     top10: [],
    //     unit: action.payload.editUnitExercises,
    //   };

    case "RESET_STATUS":
      return {
        ...state,
        error: null,
        status: "idle",
      };
    default:
      // if update User (for example set favorite) do not reset all the states of trainingsplaner
      if (action.type.startsWith("UPDATE") || action.type.startsWith("LOGIN")) {
        return { ...state };
      } else {
        return initialState;
      }
  }
};

export default trainingsplanerReducer;
