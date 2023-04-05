import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  TextField,
  Button,
  IconButton,
  Popover,
  Grid,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Tooltip,
  Skeleton,
} from "@mui/material";
import {
  Cached as CachedIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  AccessTime,
  StarBorder,
  Star,
  Info,
  Fullscreen,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from "../features/user/userAPI";
import { updateSuccess, updateError } from "../features/user/userActions";
import {
  createTrainingSuccess,
  changeExerciseStore,
} from "../features/trainingsplaner/trainingsplanerActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// function ExerciseCard({ index, exercise, exercises, setExercises = null }) {
function ExerciseCard({ index, exercise, length, toggleFavorite }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  const [showImageFullscreen, setShowImageFullscreen] = useState(false);

  const [tab, setTab] = useState(0);

  // reset tab if focused exercises has changed
  useEffect(() => {
    setTab(0);
  }, [index]);

  const renderContent = (exercise) => {
    switch (tab) {
      case 0:
        return exercise.Beschreibung;
      // break;
      case 1:
        return exercise.Aufbau;
      // break;
      case 2:
        return exercise.Varianten;
      // break;
      case 3:
        return exercise.Coaching;
      // break;

      default:
        return exercise.Beschreibung;
      // break;
    }
  };

  // set titles of tabs
  const tabs = ["Ablauf", "Aufbau", "Varianten", "Tipps"];

  // set title/part of exercise
  let title;
  if (index === 0) {
    title = "Aufwärmen";
  }
  if (length === 3) {
    switch (index) {
      case 1:
        title = "Hauptteil";
        break;
      case 2:
        title = "Schluss";
        break;
    }
  }
  if (length === 4) {
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
  if (length === 5) {
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
  if (length === 6) {
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

  const CustomWideCard = ({ exercise }) => {
    return (
      <Card
        sx={{
          display: "flex",
          borderRadius: "5px",
        }}
      >
        <CardActionArea onClick={() => setShowImageFullscreen(true)}>
          <CardMedia
            component="img"
            image={process.env.PUBLIC_URL + `/images/${exercise.ID}.png`}
            alt={exercise.ID}
            sx={{ objectFit: "contain" }}
          />
        </CardActionArea>
        <Grid container direction="column" p={2}>
          <Grid item container alignItems="center">
            <Grid item xs={2}>
              {/* <Tooltip title="Favorit setzen"> */}
              <IconButton
                className="me-auto"
                onClick={() => {
                  toggleFavorite({ exercise });
                }}
              >
                {user.favorites.some((fav) => fav.ID === exercise.ID) ? (
                  <Star />
                ) : (
                  <StarBorder />
                )}
              </IconButton>
              {/* </Tooltip> */}
            </Grid>
            <Grid item xs={8}>
              <Typography variant="smallLight">{title}</Typography>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Grid item container alignItems="center">
            <Grid item xs={exercise.Gruppen > 1 ? 10 : 12}>
              <Typography fontWeight="bold">{exercise.Übungsname}</Typography>
            </Grid>
            {exercise.Gruppen > 1 && (
              <Grid item xs={2}>
                <Tooltip
                  title={"Die Übung " + exercise.Gruppen + "-mal aufbauen"}
                  arrow
                >
                  <Typography color="primary" variant="largeBold">
                    x{exercise.Gruppen}
                  </Typography>
                </Tooltip>
              </Grid>
            )}
          </Grid>
          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              {/* icons/actions */}
              <Box sx={{ width: "100%" }} mb={2}>
                <Tabs
                  value={tab}
                  onChange={(event, value) => {
                    setTab(value);
                  }}
                  textColor={"primary"}
                  sx={{
                    minWidth: 0,
                    minHeight: 0,
                  }}
                >
                  {tabs.map((t, index) => (
                    <Tab
                      value={index}
                      variant="smallText"
                      label={t}
                      key={index}
                    />
                  ))}
                </Tabs>
              </Box>
            </Box>
          </Grid>

          {/* content */}
          <Grid
            item
            sx={{
              textAlign: "start",
              lineHeight: 1,
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>
              {renderContent(exercise)}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    );
  };

  const CustomSmallCard = ({ exercise }) => {
    return (
      <Card>
        <CardHeader
          avatar={
            <IconButton
              onClick={() => {
                toggleFavorite({ exercise });
              }}
            >
              {user.favorites.some((fav) => fav.ID === exercise.ID) ? (
                <Star />
              ) : (
                <StarBorder />
              )}
            </IconButton>
          }
          title={title}
          titleTypographyProps={{ color: "white", fontSize: "12px" }}
        />
        <CardActionArea onClick={() => setShowImageFullscreen(true)}>
          <CardMedia
            component="img"
            image={process.env.PUBLIC_URL + `/images/${exercise.ID}.png`}
            alt={exercise.ID}
            sx={{ objectFit: "contain" }}
          />
        </CardActionArea>
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={exercise.Gruppen > 1 ? 10 : 12}>
              <Typography fontWeight="bold">{exercise.Übungsname}</Typography>
            </Grid>
            {exercise.Gruppen > 1 && (
              <Grid item xs={2}>
                <Tooltip
                  title={"Die Übung " + exercise.Gruppen + "-mal aufbauen"}
                  arrow
                >
                  <Typography color="primary" variant="largeBold">
                    x{exercise.Gruppen}
                  </Typography>
                </Tooltip>
              </Grid>
            )}
          </Grid>
          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              {/* icons/actions */}
              <Box sx={{ width: "100%" }} mb={2}>
                <Tabs
                  value={tab}
                  onChange={(event, value) => {
                    setTab(value);
                  }}
                  textColor={"primary"}
                  sx={{
                    minWidth: 0,
                    minHeight: 0,
                  }}
                >
                  {tabs.map((t, index) => (
                    <Tab
                      value={index}
                      variant="smallText"
                      label={t}
                      key={index}
                    />
                  ))}
                </Tabs>
              </Box>
            </Box>
          </Grid>

          {/* content */}
          <Grid
            item
            sx={{
              textAlign: "start",
              lineHeight: 1,
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>
              {renderContent(exercise)}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("tablet"));

  return (
    <>
      {isLarge ? (
        <CustomWideCard exercise={exercise} />
      ) : (
        <CustomSmallCard exercise={exercise} />
      )}

      {/*image in fullscreen */}
      <Modal
        open={showImageFullscreen}
        onClose={() => {
          setShowImageFullscreen(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + `/images/${exercise.ID}.png`}
            alt="Leider ist aktuell kein Bild für diese Übung vorhanden..."
            style={{
              maxWidth: "100vw",
              maxHeight: "100vh",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ExerciseCard;
