import {
  Grid,
  Box,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Skeleton,
  Icon,
  LinearProgress,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetStatus,
  setUnit,
  setTop10,
  setAllExercises,
  changeExerciseStore,
} from "../features/trainingsplaner/trainingsplanerActions";
import { updateUser } from "../features/user/userAPI";
import { updateSuccess, updateError } from "../features/user/userActions";
import {
  AccessTime,
  Star,
  StarBorder,
  Cached as CachedIcon,
  East,
  West,
  NavigateBefore,
  NavigateNext,
  Fullscreen,
  Add,
  Shuffle,
  Widgets,
  Edit,
  AddCircleOutline,
  Close as CloseIcon,
  ChangeCircle,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExerciseCard from "./ExerciseCard";
import EditTrainingToolbar from "./EditTrainingToolbar";

function EditModeTrainingsplaner() {
  const { user, token } = useSelector((state) => state.user);
  const { status, error, unit, unitInfo, top10, allExercises } = useSelector(
    (state) => state.trainingsplaner
  );

  const [singleFocus, setSingleFocus] = useState([]);
  useEffect(() => {
    let tempArray = [];
    for (let index = 0; index < unit.length; index++) {
      tempArray.push(unitInfo.focus);
    }
    setSingleFocus(tempArray);
  }, [unit]);

  const dispatch = useDispatch();

  const [progress, setProgress] = useState(1);

  // calculate if horizontal scrolling reached end
  const [selectLast, setSelectLast] = useState(false);
  const [selectFirst, setSelectFirst] = useState(true);

  // set first/last selected value -> disable/enable next/prev buttons
  useEffect(() => {
    if (progress === 1) {
      setSelectFirst(true);
    } else {
      setSelectFirst(false);
    }

    if (unit) {
      if (progress === unit.length) {
        setSelectLast(true);
      } else {
        setSelectLast(false);
      }
    }
  }, [progress]);

  // reset progress for every new unit
  useEffect(() => {
    setProgress(1);
  }, [unit]);

  // content of unit/exercises
  // const [exercises, setExercises] = useState(unit);
  // useEffect(() => {
  //   setExercises(unit);
  // }, [unit]);

  useEffect(() => {
    if (status === "failed" || error) {
      toast.error(error);
    }

    if (status !== "loading") {
      dispatch(resetStatus()); // reset status and error
    }
  }, [status, error]);

  function LinearProgressWithLabel(props) {
    // calc time/duration
    let time;
    switch (unitInfo ? unitInfo.duration : -1) {
      case 0:
        time = "45 min";
        break;
      case 1:
        time = "60 min";
        break;
      case 2:
        time = "90 min";
        break;
      case 3:
        time = "120 min";
        break;

      default:
        time = "90 min";
        break;
    }
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ minWidth: 40 }}>
          <Typography sx={{ fontSize: "12px" }} color="text.secondary">
            0 min
          </Typography>
        </Box>
        <Box sx={{ width: "100%", mx: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 50 }}>
          <Typography sx={{ fontSize: "12px" }} color="text.secondary">
            {time}
          </Typography>
        </Box>
      </Box>
    );
  }

  const [changeIndex, setChangeIndex] = useState(0);
  // reset changeIndex for every new unit
  useEffect(() => {
    setChangeIndex(0);
  }, [unit]);

  const [openDialogChangeSingleFocus, setOpenDialogChangeSingleFocus] =
    useState(false);

  const optionsFocus = [
    { name: "Zufällig", value: "Zufällig" },
    {
      name: "Freilaufverhalten",
      value: "Freilaufverhalten",
    },
    {
      name: "Ballzirkulation",
      value: "Ballzirkulation",
    },
    {
      name: "Abschlüsse",
      value: "Abschlüsse",
    },
    {
      name: "Umschaltspiel",
      value: "Umschaltspiel",
    },
    // {
    //   name: "Pressing",
    //   value: "Pressing",
    // },
    {
      name: "Technik",
      value: "Technik",
    },
    {
      name: "Kondition",
      value: "Kondition",
    },
    {
      name: "Koordination",
      value: "Koordination",
    },
  ];

  const changeSingleFocus = (focus) => {
    console.log("neue Übung inkl. top 10 holen");
    // mit focus.value (kann glaub array sein)
    let tempArray = singleFocus.map((f, i) => {
      if (i === changeIndex) {
        return focus.name;
      } else {
        return f;
      }
    });
    setSingleFocus(tempArray);
  };

  const changeExerciseRandom = (index) => {
    let oldExercise = unit[index];
    let randomIndex = Math.floor(Math.random() * allExercises[index].length);
    let newExercise = allExercises[index][randomIndex];
    let newUnit = unit.map((ex, i) => {
      if (i === index) {
        return newExercise;
      } else {
        return ex;
      }
    });
    let newAllExercisesIndex = allExercises[index].map((ex, i) => {
      if (i === randomIndex) {
        return oldExercise;
      } else {
        return ex;
      }
    });
    let newAllExercises = allExercises.map((arr, i) => {
      if (i === index) {
        return newAllExercisesIndex;
      } else {
        return arr;
      }
    });
    // dispatch new info
    dispatch(setUnit(newUnit));
    dispatch(setAllExercises(newAllExercises));
  };

  const [openDialogChangeExerciseChoice, setOpenDialogChangeExerciseChoice] =
    useState(false);
  const [
    openDialogChangeExerciseFavorite,
    setOpenDialogChangeExerciseFavorite,
  ] = useState(false);
  const [openDialogChangeExerciseCustom, setOpenDialogChangeExerciseCustom] =
    useState(false);

  const changeExerciseChoice = (newIndex) => {
    let oldExercise = unit[changeIndex];
    let newExercise = top10[changeIndex][newIndex];
    let newUnit = unit.map((ex, i) => {
      if (i === changeIndex) {
        return newExercise;
      } else {
        return ex;
      }
    });
    let newTop10Index = top10[changeIndex].map((ex, i) => {
      if (i === newIndex) {
        return oldExercise;
      } else {
        return ex;
      }
    });
    let newTop10 = top10.map((arr, i) => {
      if (i === changeIndex) {
        return newTop10Index;
      } else {
        return arr;
      }
    });
    // dispatch new info
    dispatch(setUnit(newUnit));
    dispatch(setTop10(newTop10));
    // close dialog
    setOpenDialogChangeExerciseChoice(false);
  };

  const changeExerciseCustom = () => {
    console.log("Under construction...");
  };

  const changeExerciseFavorite = (newIndex) => {
    let oldExercise = unit[changeIndex];
    let newExercise = user.favorites[newIndex];
    let newUnit = unit.map((ex, i) => {
      if (i === changeIndex) {
        return newExercise;
      } else {
        return ex;
      }
    });
    // dispatch new info
    dispatch(setUnit(newUnit));
    // close dialog
    setOpenDialogChangeExerciseFavorite(false);
  };

  const ImageOverview = () => {
    let title;
    if (unit.length > 0) {
      return (
        <>
          <ImageList
            sx={{ width: "100%" }}
            cols={unit.length}
            rowHeight={"auto"}
          >
            {unit.map((ex, index) => {
              if (index === 0) {
                title = "Aufwärmen";
              }
              if (unit.length === 3) {
                switch (index) {
                  case 1:
                    title = "Hauptteil";
                    break;
                  case 2:
                    title = "Schluss";
                    break;
                }
              }
              if (unit.length === 4) {
                switch (index) {
                  case 1:
                    title = "Spezielles Aufwärmen";
                    break;
                  case 2:
                    title = "Hauptteil";
                    break;
                  case 3:
                    title = "Schluss";
                    break;
                }
              }
              if (unit.length === 5) {
                switch (index) {
                  case 1:
                    title = "Spezielles Aufwärmen";
                    break;
                  case 2:
                    title = "Hauptteil";
                    break;
                  case 3:
                    title = "Spezieller Hauptteil";
                    break;
                  case 4:
                    title = "Schluss";
                    break;
                }
              }
              if (unit.length === 6) {
                switch (index) {
                  case 1:
                    title = "Spezielles Aufwärmen";
                    break;
                  case 2:
                    title = "Hauptteil";
                    break;
                  case 3:
                    title = "Spezieller Hauptteil";
                    break;
                  case 4:
                    title = "Schluss";
                    break;
                  case 5:
                    title = "Spezieller Schluss";
                    break;
                }
              }
              return (
                <ImageListItem
                  key={index}
                  sx={{
                    borderRadius: "5px",
                    borderStyle: "solid",
                    borderWidth: "3px",
                    borderColor:
                      index === progress - 1
                        ? "var(--lightgreen)"
                        : "rgba(0,0,0,0)",
                  }}
                >
                  <img
                    style={{ borderRadius: "5px" }}
                    src={process.env.PUBLIC_URL + `/images/${ex.ID}.png`}
                    alt={ex.ID}
                    onClick={() => setProgress(index + 1)}
                  />
                  {/* part/title */}
                  <Tooltip title={title} sx={{ cursor: "default" }}>
                    <ImageListItemBar subtitle={title} position="top" />
                  </Tooltip>
                  {/* actions/change */}
                  <ImageListItemBar
                    actionIcon={
                      <>
                        <Tooltip title="Zufällig tauschen">
                          <IconButton
                            onClick={() => changeExerciseRandom(index)}
                          >
                            <Shuffle fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Andere Übung auswählen">
                          <IconButton
                            onClick={() => {
                              setChangeIndex(index);
                              setOpenDialogChangeExerciseChoice(true);
                            }}
                          >
                            <Widgets fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Mit Favorit austauschen">
                          <IconButton
                            onClick={() => {
                              setChangeIndex(index);
                              setOpenDialogChangeExerciseFavorite(true);
                            }}
                          >
                            <Star fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eigene Übung hinzufügen">
                          <IconButton
                            onClick={() => {
                              setChangeIndex(index);
                              setOpenDialogChangeExerciseCustom(true);
                            }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    }
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    position="bottom"
                  />
                </ImageListItem>
              );
            })}
          </ImageList>

          <Grid container sx={{ marginTop: 1 }}>
            {unit.map((ex, i) => {
              if (i === 0) {
                return (
                  <Grid item key={"Index" + i} xs={12 / unit.length}>
                    <Tooltip title="Aufwärmen findet ohne Schwerpunkt statt">
                      <span>
                        <Button
                          size="small"
                          endIcon={<Edit />}
                          onClick={() => {
                            setChangeIndex(i);
                            setOpenDialogChangeSingleFocus(true);
                          }}
                          disabled
                        >
                          Aufwärmen
                        </Button>
                      </span>
                    </Tooltip>
                  </Grid>
                );
              } else {
                return (
                  <Grid item key={"Index" + i} xs={12 / unit.length}>
                    <Tooltip title="Schwerpunkt für diese Übung ändern">
                      <Button
                        size="small"
                        endIcon={<Edit />}
                        onClick={() => {
                          setChangeIndex(i);
                          setOpenDialogChangeSingleFocus(true);
                        }}
                      >
                        {singleFocus[i]}
                      </Button>
                    </Tooltip>
                  </Grid>
                );
              }
            })}
          </Grid>
        </>
      );
    } else {
      return (
        <ImageList sx={{ width: "100%" }} cols={5} rowHeight={"auto"}>
          <ImageListItem
            sx={{
              borderRadius: "5px",
              border: "1px solid var(--lightgreen)",
            }}
          >
            <img
              style={{ borderRadius: "5px" }}
              src={process.env.PUBLIC_URL + `/images/AS0012.png`}
            />
            <ImageListItemBar subtitle="Aufwärmen" position="bottom" />
          </ImageListItem>
          <ImageListItem
            sx={{
              borderRadius: "5px",
            }}
          >
            <img
              style={{ borderRadius: "5px" }}
              src={process.env.PUBLIC_URL + `/images/BZ0045.png`}
            />
            <ImageListItemBar
              subtitle="Spezielles Aufwärmen"
              position="bottom"
            />
          </ImageListItem>
          <ImageListItem
            sx={{
              borderRadius: "5px",
            }}
          >
            <img
              style={{ borderRadius: "5px" }}
              src={process.env.PUBLIC_URL + `/images/DR0029.png`}
            />
            <ImageListItemBar subtitle="Hauptteil" position="bottom" />
          </ImageListItem>
          <ImageListItem
            sx={{
              borderRadius: "5px",
            }}
          >
            <img
              style={{ borderRadius: "5px" }}
              src={process.env.PUBLIC_URL + `/images/FV0018.png`}
            />
            <ImageListItemBar
              subtitle="Spezieller Hauptteil"
              position="bottom"
            />
          </ImageListItem>
          <ImageListItem
            sx={{
              borderRadius: "5px",
            }}
          >
            <img
              style={{ borderRadius: "5px" }}
              src={process.env.PUBLIC_URL + `/images/TS0084.png`}
            />
            <ImageListItemBar subtitle="Schluss" position="bottom" />
          </ImageListItem>
        </ImageList>
      );
    }
  };

  const toggleFavorite = async ({ exercise }) => {
    let favoriteData = { emailUser: user.email, exercise: exercise };
    try {
      // make API call to server to update user
      const newUser = await updateUser(favoriteData, token);
      // update successful, dispatch action to store
      dispatch(updateSuccess(newUser));
    } catch (error) {
      // update failed, show error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(updateError(message));
    }
  };

  return (
    <>
      {/* show toolbar with input and actions */}
      {/* <EditTrainingToolbar exercises={exercises} /> */}
      <EditTrainingToolbar />
      {/* show progress in time */}
      <Box sx={{ width: "100%", mt: 2 }}>
        <LinearProgressWithLabel
          value={unit ? progress * (100 / unit.length) : 50}
        />
      </Box>
      {/* show all exercises in small images */}
      <Box sx={{ width: "100%" }}>
        <ImageOverview />
      </Box>

      {unit.length > 0 && (
        <>
          {/* arrow to navigate between exercises */}
          <Grid
            item
            container
            xs={1}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              disabled={selectFirst || unit.length === 0}
              onClick={() => {
                setProgress((prev) => prev - 1);
              }}
            >
              <NavigateBefore fontSize="large" />
            </IconButton>
          </Grid>

          {/* Container for the drills */}
          <Grid
            item
            xs={10}
            container
            justifyContent="center"
            id="exercisesWrapper"
            my={2}
          >
            <ExerciseCard
              index={progress - 1}
              exercise={unit[progress - 1]}
              length={unit.length}
              toggleFavorite={toggleFavorite}
            />
          </Grid>

          {/* arrow to navigate between exercises */}
          <Grid
            item
            container
            xs={1}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              disabled={selectLast || unit.length === 0}
              onClick={() => {
                setProgress((prev) => prev + 1);
              }}
            >
              <NavigateNext fontSize="large" />
            </IconButton>
          </Grid>

          {/* dialog choose new exercise */}
          <Dialog
            open={openDialogChangeExerciseChoice}
            onClose={() => setOpenDialogChangeExerciseChoice(false)}
          >
            <DialogTitle>
              Übung austauschen
              <IconButton
                aria-label="close"
                onClick={() => setOpenDialogChangeExerciseChoice(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <ImageList
                // sx={{ width: "100%" }}
                cols={2}
                rowHeight={"auto"}
              >
                {top10[changeIndex].map((exercise, index) => (
                  <ImageListItem key={index}>
                    <img
                      style={{ borderRadius: "5px" }}
                      src={
                        process.env.PUBLIC_URL + `/images/${exercise.ID}.png`
                      }
                      alt={exercise.ID}
                    />
                    <ImageListItemBar
                      subtitle={exercise.Übungsname}
                      position="top"
                    />
                    <ImageListItemBar
                      actionIcon={
                        <IconButton onClick={() => changeExerciseChoice(index)}>
                          <ChangeCircle />
                        </IconButton>
                      }
                      position="bottom"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </DialogContent>
          </Dialog>
          {/* dialog choose new exercise out of favorites */}
          <Dialog
            open={openDialogChangeExerciseFavorite}
            onClose={() => setOpenDialogChangeExerciseFavorite(false)}
          >
            <DialogTitle>
              Übung austauschen
              <IconButton
                aria-label="close"
                onClick={() => setOpenDialogChangeExerciseFavorite(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              {user.favorites.length === 0 ? (
                <Typography>
                  Es scheint, als ob Du noch keine Favoriten ausgewählt hast.
                </Typography>
              ) : (
                <ImageList
                  // sx={{ width: "100%" }}
                  cols={2}
                  rowHeight={"auto"}
                >
                  {user.favorites.map((exercise, index) => (
                    <ImageListItem key={index}>
                      <img
                        style={{ borderRadius: "5px" }}
                        src={
                          process.env.PUBLIC_URL + `/images/${exercise.ID}.png`
                        }
                        alt={exercise.ID}
                      />
                      <ImageListItemBar
                        subtitle={exercise.Übungsname}
                        position="top"
                      />
                      <ImageListItemBar
                        actionIcon={
                          <>
                            {/* toggle favorite */}
                            <IconButton
                              onClick={() => {
                                toggleFavorite({ exercise });
                              }}
                            >
                              {user.favorites.some(
                                (fav) => fav.ID === exercise.ID
                              ) ? (
                                <Star />
                              ) : (
                                <StarBorder />
                              )}
                            </IconButton>
                            {/* change exercise */}
                            <IconButton
                              onClick={() => changeExerciseFavorite(index)}
                            >
                              <ChangeCircle />
                            </IconButton>
                          </>
                        }
                        position="bottom"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </DialogContent>
          </Dialog>
          {/* dialog create/upload new exercise */}
          <Dialog
            open={openDialogChangeExerciseCustom}
            onClose={() => setOpenDialogChangeExerciseCustom(false)}
          >
            <DialogTitle>
              Übung austauschen
              <IconButton
                aria-label="close"
                onClick={() => setOpenDialogChangeExerciseCustom(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container direction="column">
                <Typography>
                  Diese Funktion befindet sich aktuell in der Entwicklung.
                </Typography>

                {/* <Grid item container>
                  <Typography>Neue Übung erstellen</Typography>
                </Grid> */}
              </Grid>
            </DialogContent>
          </Dialog>
          {/* dialog change single focus */}
          <Dialog
            open={openDialogChangeSingleFocus}
            onClose={() => setOpenDialogChangeSingleFocus(false)}
          >
            <DialogTitle>
              Schwerpunkt auswählen
              <IconButton
                aria-label="close"
                onClick={() => setOpenDialogChangeSingleFocus(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container direction="column">
                <Typography>
                  Diese Funktion befindet sich aktuell in der Entwicklung.
                </Typography>

                {/* {optionsFocus.map((focus, index) => (
                  <Grid key={index} item container>
                    <Typography>{focus.name}</Typography>
                    <Button
                      variant="small"
                      onClick={() => changeSingleFocus(focus)}
                    >
                      Auswählen
                    </Button>
                  </Grid>
                ))} */}
              </Grid>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

export default EditModeTrainingsplaner;
