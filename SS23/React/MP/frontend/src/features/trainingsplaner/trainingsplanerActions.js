export const createTrainingLoading = () => ({
  type: "CREATE_TRAINING_LOADING",
});
export const createTrainingSuccess = ({
  top10,
  trainingseinheit,
  allExercises,
}) => ({
  type: "CREATE_TRAINING_SUCCESS",
  payload: {
    top10,
    trainingseinheit,
    allExercises,
  },
});
export const createTrainingError = (error) => ({
  type: "CREATE_TRAINING_ERROR",
  payload: { error },
});

export const setUnit = (newUnit) => ({
  type: "SET_UNIT",
  payload: { newUnit },
});

export const setTop10 = (newTop10) => ({
  type: "SET_TOP_10",
  payload: { newTop10 },
});

export const setAllExercises = (newAllExercises) => ({
  type: "SET_ALL_EXERCISES",
  payload: { newAllExercises },
});

export const changeExerciseStore = ({
  oldUnit,
  oldTop10,
  indexTop10,
  index,
  newExercise,
  oldExercise,
}) => ({
  type: "CHANGE_EXERCISE",
  payload: {
    oldUnit,
    oldTop10,
    indexTop10,
    indexUnit: index,
    newExercise,
    oldExercise,
  },
});

export const setNewTab = (newTab) => ({
  type: "SET_TAB",
  payload: { newTab },
});

export const setNewUnitInfo = ({ unitInfo }) => ({
  type: "SET_UNIT_INFO",
  payload: { unitInfo },
});
export const setNewUnit = ({ editUnitExercises }) => ({
  type: "SET_UNIT",
  payload: { editUnitExercises },
});

export const resetStatus = () => ({
  type: "RESET_STATUS",
});
