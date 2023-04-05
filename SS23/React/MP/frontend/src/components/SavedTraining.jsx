import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AccessTime,
  Bookmark,
  StarBorder,
  Star,
  Edit,
  Delete,
  Close as CloseIcon,
  ExpandMore,
  West,
  East,
} from "@mui/icons-material";
import {
  updateLoading,
  updateSuccess,
  updateError,
} from "../features/user/userActions";
import { updateUser } from "../features/user/userAPI";
import {
  setNewUnit,
  setNewUnitInfo,
  setNewTab,
} from "../features/trainingsplaner/trainingsplanerActions";
import ExerciseCard from "./ExerciseCard";

function SavedModeTrainingsplaner() {
  // set custom title (for google analytics)
  // useEffect(() => {
  //   document.title = "Trainingsplaner - Bibliothek";
  // }, []);

  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.user);

  const [tab, setTab] = useState(0);
  const [tabCard, setTabCard] = useState(0);

  const [index, setIndex] = useState(0);
  const [indexExercise, setIndexExercise] = useState(0);

  // placeholder für gespeicherte Übungen und vorgeschlagene Übungen
  const recommendedTrainings = [
    {
      id: 0,
      title: "Schnelligkeit",
      date: "7.09.2023",
      time: 60,
      duration: 2,
      player: 10,
      goalkeeper: 2,
      focus: "Umschaltspiel",
      unit: [
        { id: 0, title: "22 gegen 2" },
        { id: 1, title: "Sprints" },
        { id: 2, title: "Dribbeln" },
        { id: 3, title: "Torschuss" },
        { id: 4, title: "Spiel" },
      ],
    },
    {
      id: 1,
      title: "Fokus",
      date: "8.09.2023",
      time: 60,
      duration: 2,
      player: 11,
      goalkeeper: 1,
      focus: "Umschaltspiel",
      unit: [
        { id: 0, title: "4 gegen 20" },
        { id: 1, title: "Passen" },
        { id: 2, title: "Ausdauerlauf" },
        { id: 3, title: "Torschuss" },
        { id: 4, title: "Spiel" },
      ],
    },
    {
      id: 2,
      title: "Ballbehandlung",
      date: "9.09.2023",
      time: 70,
      duration: 3,
      player: 12,
      goalkeeper: 0,
      focus: "Umschaltspiel",
      unit: [
        { id: 0, title: "2 gegen 2" },
        { id: 1, title: "Passen" },
        { id: 2, title: "Dribbeln" },
        { id: 3, title: "Biathlon" },
        { id: 4, title: "Spiel" },
      ],
    },
    {
      id: 3,
      title: "Schuss",
      date: "2.10.2023",
      time: 70,
      duration: 1,
      player: 13,
      goalkeeper: 2,
      focus: "Umschaltspiel",
      unit: [
        { id: 0, title: "40 gegen 200" },
        { id: 1, title: "ABC-Lauf" },
        { id: 2, title: "Dribbeln" },
        { id: 3, title: "Torschuss" },
        { id: 4, title: "Spiel" },
      ],
    },
  ];

  // saved unit: exercises [Array], player [Number], goalkeeper [Number], date [String], time [String], focus [String]

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const toggleFavorite = async (favoriteData) => {
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

  const removeSavedUnit = async (id) => {
    let updateData = { emailUser: user.email, unitToRemove: id };
    try {
      dispatch(updateLoading());
      // make API call to server to update user
      const newUser = await updateUser(updateData, token);
      // update successful, dispatch action to store
      dispatch(updateSuccess(newUser));
      // close popup
      setOpenDeleteDialog(false);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(updateError(message));
    }
  };

  const renderContent = (exercise) => {
    switch (tabCard) {
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

  // calculate if horizontal scrolling reached end
  const [indexAccordion, setIndexAccordion] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [scrollStart, setScrollStart] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const wrapper = document.getElementById(
      "exercisesWrapper" + indexAccordion
    );
    if (wrapper) {
      wrapper.addEventListener("scroll", () => handleScroll(wrapper), {
        passive: true,
      });
      return wrapper.removeEventListener(
        "scroll",
        () => handleScroll(wrapper),
        {
          passive: true,
        }
      );
    }
  }, [scrollPosition, indexAccordion]);
  const handleScroll = (wrapper) => {
    const position = wrapper.offsetLeft;
    setScrollPosition(position);
    let diff = wrapper.scrollWidth - wrapper.clientWidth;
    let pos = Math.abs(wrapper.scrollLeft);
    let onEnd = pos === diff;
    setScrollStart(pos === 0);
    setScrollEnd(onEnd);
  };

  // control open accordions
  const [expanded, setExpanded] = useState(false);
  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false);
    setExpanded(isExpanded && panel);
  };

  return (
    <>
      <Grid item xs={12} container>
        {user.savedUnits.length === 0 ? (
          <Typography>
            Hier kannst Du gespeicherte Einheiten anschauen
          </Typography>
        ) : (
          <>
            {user.savedUnits.map((unit, i) => {
              const title = (
                <Grid container columns={24} alignItems="center">
                  <Grid item xs={4} md={4}>
                    <Tooltip
                      title="Du kannst diese Trainingseinheit komplett löschen"
                      arrow
                    >
                      <IconButton
                        onClick={() => {
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <Delete sx={{ color: "red" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Hier kannst Du die Einheit zurück in den Planungsmodus schieben, um weitere Anpassungen vorzunehmen"
                      arrow
                    >
                      <IconButton
                        onClick={() => {
                          setOpenEditDialog(true);
                        }}
                      >
                        <Edit sx={{ color: "var(--lightgreen)" }} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={5} md={4}>
                    <Typography sx={{ textTransform: "uppercase" }}>
                      {unit.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={4}>
                    <Typography>
                      {unit.date.split("-")[2] +
                        "." +
                        unit.date.split("-")[1] +
                        "." +
                        unit.date.split("-")[0] +
                        ", "}
                      {unit.time + " Uhr"}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    sx={{ display: { xs: "none", md: "block" } }}
                  >
                    <Typography>
                      {unit.duration === 0 && "<60 min"}
                      {unit.duration === 1 && "60-80 min"}
                      {unit.duration === 2 && "80-100 min"}
                      {unit.duration === 3 && ">100 min"}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={4}>
                    <Typography>
                      {"TW: " + unit.goalkeeper + ", SP: " + unit.player}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} md={4}>
                    <Typography>{unit.focus}</Typography>
                  </Grid>
                </Grid>
              );

              const content = (
                <Grid
                  item
                  xs={12}
                  container
                  wrap="nowrap"
                  sx={{
                    position: "relative",
                    overflowX: "scroll",
                  }}
                  id={"exercisesWrapper" + i}
                >
                  {/* arrow to show there is more (scroll x) */}
                  <IconButton
                    sx={{
                      visibility: scrollStart && "hidden",
                      position: "sticky",
                      width: "40px",
                      height: "40px",
                      top: "50%",
                      left: "60px", // 20px (distance to edge) + 40px (element width)
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                      backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                    // onClick={() => {
                    //   document.getElementById(
                    //     "exercisesWrapper"
                    //   ).scrollLeft -= 200;
                    // }}
                  >
                    <West fontSize="large" />
                  </IconButton>
                  {unit.exercises.map((ex, idx) => (
                    <Grid
                      item
                      key={idx}
                      display="flex"
                      alignContent="stretch"
                      flexShrink={0}
                      xs={10}
                      tiny={6}
                      lg={4}
                    >
                      <ExerciseCard
                        index={idx}
                        exercise={ex}
                        length={unit.exercises.length}
                        changeOptions={false}
                      />
                    </Grid>
                  ))}
                  {/* arrow to show there is more (scroll x) */}
                  <IconButton
                    sx={{
                      visibility: scrollEnd && "hidden",
                      position: "sticky",
                      width: "40px",
                      height: "40px",
                      top: "50%",
                      right: "20px",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                      backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                    // onClick={() => {
                    //   document.getElementById(
                    //     "exercisesWrapper"
                    //   ).scrollLeft += 200;
                    // }}
                  >
                    <East fontSize="large" />
                  </IconButton>
                </Grid>
              );

              return (
                <Grid item key={i} xs={12}>
                  <Accordion
                    expanded={expanded === "panel" + i}
                    onChange={handleOpenAccordion("panel" + i)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore color="primary" />}
                      onClick={() => {
                        // reset scroll start - hide west arrow
                        setScrollStart(true);
                        // set index to opened accordion for scroll event listener
                        setIndexAccordion(i);
                      }}
                    >
                      {title}
                    </AccordionSummary>
                    <AccordionDetails>{content}</AccordionDetails>
                  </Accordion>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>

      {/* edit unit dialog */}
      {user.savedUnits.length > 0 && (
        <>
          <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
          >
            <DialogTitle>
              Einheit bearbeiten
              <IconButton
                aria-label="close"
                onClick={() => setOpenEditDialog(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              Wollen Sie die folgende Einheit wirklich bearbeiten?
              <Typography>
                {user.savedUnits[index].date} <br />
                {user.savedUnits[index].time} <br />
                {user.savedUnits[index].title} <br />
                {user.savedUnits[index].player} <br />
                {user.savedUnits[index].goalkeeper} <br />
                {user.savedUnits[index].focus}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  //set new unit
                  let unitInfo;
                  let editUnitExercises;
                  unitInfo = {
                    player: user.savedUnits[index].player,
                    goalkeeper: user.savedUnits[index].goalkeeper,
                    duration: user.savedUnits[index].duration,
                    focus: user.savedUnits[index].focus,
                  };
                  editUnitExercises = user.savedUnits[index].exercises;
                  // } else if (tab === 2) {
                  //   unitInfo = {
                  //     player: recommendedTrainings[index].player,
                  //     goalkeeper: recommendedTrainings[index].goalkeeper,
                  //     duration: recommendedTrainings[index].duration,
                  //     focus: recommendedTrainings[index].focus,
                  //   };
                  //   editUnitExercises = recommendedTrainings[index].unit;
                  // }
                  dispatch(setNewUnit({ editUnitExercises }));
                  dispatch(setNewUnitInfo({ unitInfo }));
                  // go to edit mode
                  dispatch(setNewTab(0));
                }}
              >
                Bearbeiten
              </Button>
              <Button onClick={() => setOpenEditDialog(false)}>
                Abbrechen
              </Button>
            </DialogActions>
          </Dialog>
          {/* delete unit dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle>
              Einheit löschen
              <IconButton
                aria-label="close"
                onClick={() => setOpenDeleteDialog(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              Wollen Sie die folgende Einheit wirklich löschen?
              <Typography>
                {user.savedUnits[index].date} <br />
                {user.savedUnits[index].time} <br />
                {user.savedUnits[index].title} <br />
                {user.savedUnits[index].player} <br />
                {user.savedUnits[index].goalkeeper} <br />
                {user.savedUnits[index].focus}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => removeSavedUnit(user.savedUnits[index].id)}
              >
                Löschen
              </Button>
              <Button onClick={() => setOpenDeleteDialog(false)}>
                Abbrechen
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     <Grid
  //       container
  //       sx={{
  //         position: "relative",
  //         overflowX: "scroll",
  //       }}
  //     >
  //       {/* first card */}
  //       <Tooltip
  //         title="Hier siehst Du alle Deine gespeicherten Trainingseinheiten"
  //         arrow
  //       >
  //         <Grid item xs={12} md={4}>
  //           {/* <Grid item sx={{ minWidth: "280px" }}> */}
  //           <Box
  //             sx={{
  //               height: { xs: "auto", md: "500px", xxl: "700px" },
  //               backgroundColor: "#212121",
  //               overflowY: "scroll",
  //               padding: "6px",
  //               margin: "10px",
  //               borderRadius: "5px",
  //             }}
  //           >
  //             <Grid container justifyContent="space-around">
  //               {/* tab navigation */}
  //               {/* <Grid item>
  //               <Box>
  //                 <Tabs
  //                   value={tab}
  //                   onChange={(event, newTab) => {
  //                     setIndex(0);
  //                     setIndexExercise(0);
  //                     setTab(newTab);
  //                   }}
  //                   textColor={"primary"}
  //                 >
  //                   <Tab value={0} label="GESPEICHERT" />
  //                   <Tab value={1} label="VORGESCHLAGEN" />
  //                 </Tabs>
  //               </Box>
  //             </Grid> */}
  //               {/* trainings */}
  //               <Grid
  //                 container
  //                 direction="row"
  //                 rowSpacing={{ xs: 0, md: 1 }}
  //                 mt={{ xs: 0, md: 1 }}
  //                 justifyContent="center"
  //                 alignContent="center"
  //                 sx={{ overflowY: "scroll" }}
  //               >
  //                 {/* saved units */}
  //                 {tab === 0 &&
  //                   (user.savedUnits.length === 0 ? (
  //                     <Grid item>
  //                       <Typography>
  //                         Du hast noch kein Training gespeichert.
  //                       </Typography>
  //                       <Typography mt={2}>
  //                         Gehe in den Planungsmodus und lass dir ein Training
  //                         erstellen. Wenn Dir das Training gefällt kannst du das
  //                         Training abspeichern und findest es dann hier.
  //                       </Typography>
  //                     </Grid>
  //                   ) : (
  //                     user.savedUnits.map((unit, i) => (
  //                       <Grid
  //                         key={i}
  //                         item
  //                         xs={11}
  //                         onClick={() => {
  //                           setIndexExercise(0);
  //                           setIndex(i);
  //                         }}
  //                         className="pointer"
  //                       >
  //                         <Box
  //                           p={1}
  //                           sx={{
  //                             backgroundColor:
  //                               index === i
  //                                 ? "var(--lightgreen)"
  //                                 : "var(--darkgray)",
  //                             borderRadius: "5px",
  //                           }}
  //                         >
  //                           <Grid container>
  //                             <Grid item xs={2}>
  //                               <Bookmark
  //                                 sx={{
  //                                   color: index === i ? "black" : "white",
  //                                 }}
  //                               />
  //                             </Grid>
  //                             <Grid
  //                               item
  //                               xs={10}
  //                               container
  //                               direction="row"
  //                               justifyContent="space-around"
  //                             >
  //                               <Grid item xs={12}>
  //                                 <Typography
  //                                   color={index === i ? "black" : "white"}
  //                                 >
  //                                   {unit.title && unit.title},
  //                                   {unit.date
  //                                     ? unit.date.split("-")[2] +
  //                                       "." +
  //                                       unit.date.split("-")[1] +
  //                                       "." +
  //                                       unit.date.split("-")[0]
  //                                     : "Datum"}
  //                                   ,{" "}
  //                                   {unit.time ? unit.time + " Uhr" : "Uhrzeit"}
  //                                 </Typography>
  //                               </Grid>
  //                               <Grid item xs={12}>
  //                                 <Typography
  //                                   color={index === i ? "black" : "white"}
  //                                   sx={{ fontSize: "9px" }}
  //                                 >
  //                                   {unit.duration === 0 && "< 60 min"}
  //                                   {unit.duration === 1 && "60 - 80 min"}
  //                                   {unit.duration === 2 && "80 - 100 min"}
  //                                   {unit.duration === 3 && "> 100 min"}
  //                                   {!unit.duration && "Dauer"},
  //                                   {unit.player ? unit.player : "Anzahl"}{" "}
  //                                   Spieler,
  //                                   {unit.goalkeeper
  //                                     ? unit.goalkeeper
  //                                     : "Anzahl"}{" "}
  //                                   Torspieler,{" "}
  //                                   {unit.focus
  //                                     ? unit.focus
  //                                     : "Ohne Schwerpunkt"}
  //                                 </Typography>
  //                               </Grid>
  //                             </Grid>
  //                           </Grid>
  //                         </Box>
  //                       </Grid>
  //                     ))
  //                   ))}
  //                 {/* recommended units */}
  //                 {/* {tab === 1 &&
  //                 recommendedTrainings.map((ex, i) => {
  //                   return (
  //                     <Grid
  //                       key={i}
  //                       item
  //                       xs={11}
  //                       onClick={() => {
  //                         setIndexExercise(0);
  //                         setIndex(i);
  //                       }}
  //                       className="pointer"
  //                     >
  //                       <Box
  //                         p={1}
  //                         sx={{
  //                           backgroundColor:
  //                             index === i
  //                               ? "var(--lightgreen)"
  //                               : "var(--darkgray)",
  //                           borderRadius: "5px",
  //                         }}
  //                       >
  //                         <Grid container>
  //                           <Grid item xs={2}>
  //                             <Bookmark
  //                               sx={{ color: index === i ? "black" : "white" }}
  //                             />
  //                           </Grid>
  //                           <Grid
  //                             item
  //                             xs={10}
  //                             container
  //                             direction="row"
  //                             justifyContent="space-around"
  //                           >
  //                             <Grid item xs={12}>
  //                               <Typography
  //                                 color={index === i ? "black" : "white"}
  //                               >
  //                                 {ex.title}
  //                               </Typography>
  //                             </Grid>
  //                             <Grid item xs={12}>
  //                               <Typography
  //                                 color={index === i ? "black" : "white"}
  //                                 sx={{ fontSize: "9px" }}
  //                               >
  //                                 {ex.time} min, {ex.player} Spieler,{" "}
  //                                 {ex.goalkeeper} Torspieler, {ex.focus}
  //                               </Typography>
  //                             </Grid>
  //                           </Grid>
  //                         </Grid>
  //                       </Box>
  //                     </Grid>
  //                   );
  //                 })} */}
  //               </Grid>
  //             </Grid>
  //           </Box>
  //         </Grid>
  //       </Tooltip>
  //       {/* second card */}
  //       <Tooltip
  //         title="Die Liste zeigt Dir die einzelnen Übungen der ausgwählten Trainingseinheit an"
  //         arrow
  //       >
  //         <Grid item xs={12} md={4}>
  //           {/* <Grid item sx={{ minWidth: "280px" }}> */}
  //           <Box
  //             sx={{
  //               height: { xs: "auto", md: "500px", xxl: "700px" },
  //               backgroundColor: "#212121",
  //               overflowY: "scroll",
  //               padding: "6px",
  //               margin: "10px",
  //               borderRadius: "5px",
  //             }}
  //           >
  //             <Grid
  //               container
  //               direction="row"
  //               rowSpacing={{ xs: 0, md: 1 }}
  //               mt={{ xs: 0, md: 2 }}
  //               justifyContent="space-around"
  //             >
  //               {/* title */}
  //               <Grid
  //                 item
  //                 xs={11}
  //                 sx={{
  //                   backgroundColor: "var(--darkgray)",
  //                   borderRadius: "5px",
  //                 }}
  //                 alignContent="center"
  //                 pb={1}
  //               >
  //                 <Typography>
  //                   {tab === 0 &&
  //                     (user.savedUnits.length > 0
  //                       ? user.savedUnits[index].date.split("-")[2] +
  //                         "." +
  //                         user.savedUnits[index].date.split("-")[1] +
  //                         "." +
  //                         user.savedUnits[index].date.split("-")[0] +
  //                         " - " +
  //                         user.savedUnits[index].title
  //                       : "Titel der Einheit")}

  //                   {tab === 1 && recommendedTrainings[index].title}
  //                 </Typography>
  //               </Grid>
  //               {/* actions (delete and edit) */}
  //               {user.savedUnits.length > 0 && (
  //                 <Grid item xs={12} container>
  //                   <Grid item xs={4}></Grid>
  //                   {tab === 0 && (
  //                     <Grid item xs={2}>
  //                       <Tooltip
  //                         title="Du kannst diese Trainingseinheit komplett löschen"
  //                         arrow
  //                       >
  //                         <IconButton onClick={() => setOpenDeleteDialog(true)}>
  //                           <Delete sx={{ color: "red" }} />
  //                         </IconButton>
  //                       </Tooltip>
  //                     </Grid>
  //                   )}
  //                   <Grid item xs>
  //                     <Tooltip
  //                       title="Hier kannst Du die Einheit zurück in den Planungsmodus schieben, um weitere Anpassungen vorzunehmen"
  //                       arrow
  //                     >
  //                       <IconButton onClick={() => setOpenEditDialog(true)}>
  //                         <Edit sx={{ color: "var(--lightgreen)" }} />
  //                       </IconButton>
  //                     </Tooltip>
  //                   </Grid>
  //                   <Grid item xs={4}></Grid>
  //                 </Grid>
  //               )}
  //               {/* saved units */}
  //               {tab === 0 && user.savedUnits.length > 0 ? (
  //                 user.savedUnits[index].exercises.map((ex, i) => {
  //                   return (
  //                     <Grid
  //                       key={i}
  //                       item
  //                       xs={11}
  //                       onClick={() => setIndexExercise(i)}
  //                       className="pointer"
  //                     >
  //                       <Box
  //                         sx={{
  //                           backgroundColor: "var(--darkgray)",
  //                           border:
  //                             indexExercise === i
  //                               ? "2px solid var(--lightgreen)"
  //                               : "none",
  //                           borderRadius: "5px",
  //                         }}
  //                         pb={1}
  //                         m={indexExercise === i ? "0px" : "2px"}
  //                       >
  //                         <Grid container>
  //                           <Grid
  //                             item
  //                             xs={12}
  //                             container
  //                             justifyContent="center"
  //                             sx={{
  //                               backgroundColor: "var(--lightblack)",
  //                               borderRadius: "5px 5px 0px 0px",
  //                             }}
  //                           >
  //                             <Grid
  //                               item
  //                               xs={4}
  //                               container
  //                               justifyContent="flex-start"
  //                               pl={1}
  //                             >
  //                               {/* <IconButton
  //                               sx={{ p: 0 }}
  //                               onClick={() => {
  //                                 let favoriteData = {
  //                                   emailUser: user.email,
  //                                   exercise: ex,
  //                                 };
  //                                 toggleFavorite(favoriteData);
  //                               }}
  //                             >
  //                               {user.favorites.some(
  //                                 (fav) => fav.Übungsname === ex.Übungsname
  //                               ) ? (
  //                                 <Star />
  //                               ) : (
  //                                 <StarBorder />
  //                               )}
  //                             </IconButton> */}
  //                             </Grid>
  //                             <Grid item xs={4}>
  //                               <Typography>
  //                                 {i + 1}/
  //                                 {user.savedUnits[index].exercises.length}
  //                               </Typography>
  //                             </Grid>
  //                             <Grid item xs={4}></Grid>
  //                           </Grid>
  //                           <Grid
  //                             item
  //                             xs={12}
  //                             container
  //                             justifyContent="space-around"
  //                           >
  //                             <Grid item xs={12}>
  //                               <Typography color="var(--lightgreen)">
  //                                 {ex.Übungsname ? ex.Übungsname : "Titel"}
  //                               </Typography>
  //                             </Grid>
  //                             {/* <Grid item xs={12}>
  //                             <Typography
  //                               color="white"
  //                               sx={{ fontSize: "9px" }}
  //                             >
  //                               Übungsdauer: 15-20 Minuten
  //                             </Typography>
  //                           </Grid> */}
  //                           </Grid>
  //                         </Grid>
  //                       </Box>
  //                     </Grid>
  //                   );
  //                 })
  //               ) : (
  //                 <Grid item xs={12}>
  //                   <Typography>
  //                     Hier werden die einzelnen Übungen deiner gespeicherten
  //                     Trainingseinheit angezeigt.
  //                   </Typography>
  //                 </Grid>
  //               )}
  //               {/* recommended units */}
  //               {tab === 1 &&
  //                 recommendedTrainings[index].unit.map((ex, i) => {
  //                   return (
  //                     <Grid
  //                       key={i}
  //                       item
  //                       xs={11}
  //                       onClick={() => setIndexExercise(i)}
  //                       className="pointer"
  //                     >
  //                       <Box
  //                         sx={{
  //                           backgroundColor: "var(--darkgray)",
  //                           border:
  //                             indexExercise === i
  //                               ? "2px solid var(--lightgreen)"
  //                               : "none",
  //                           borderRadius: "5px",
  //                         }}
  //                         pb={1}
  //                         m={indexExercise === i ? "0px" : "2px"}
  //                       >
  //                         <Grid container>
  //                           <Grid
  //                             item
  //                             xs={12}
  //                             container
  //                             justifyContent="center"
  //                             sx={{
  //                               backgroundColor: "var(--lightblack)",
  //                               borderRadius: "5px 5px 0px 0px",
  //                             }}
  //                           >
  //                             <Grid
  //                               item
  //                               xs={4}
  //                               container
  //                               justifyContent="flex-start"
  //                               pl={1}
  //                             >
  //                               {/* <IconButton
  //                               sx={{ p: 0 }}
  //                               onClick={() => {
  //                                 let favoriteData = {
  //                                   emailUser: user.email,
  //                                   exercise: ex,
  //                                 };
  //                                 toggleFavorite(favoriteData);
  //                               }}
  //                             >
  //                               {user.favorites.some(
  //                                 (fav) => fav.title === ex.title
  //                               ) ? (
  //                                 <Star />
  //                               ) : (
  //                                 <StarBorder />
  //                               )}
  //                             </IconButton> */}
  //                             </Grid>
  //                             <Grid item xs={4}>
  //                               <Typography>
  //                                 {i + 1}/
  //                                 {recommendedTrainings[index].unit.length}
  //                               </Typography>
  //                             </Grid>
  //                             <Grid item xs={4}></Grid>
  //                           </Grid>
  //                           <Grid
  //                             item
  //                             xs={12}
  //                             container
  //                             justifyContent="space-around"
  //                           >
  //                             <Grid item xs={12}>
  //                               <Typography color="var(--lightgreen)">
  //                                 {ex.title ? ex.title : "Titel"}
  //                               </Typography>
  //                             </Grid>
  //                             <Grid item xs={12}>
  //                               <Typography
  //                                 color="white"
  //                                 sx={{ fontSize: "9px" }}
  //                               >
  //                                 Übungsdauer: 15-20 Minuten
  //                               </Typography>
  //                             </Grid>
  //                           </Grid>
  //                         </Grid>
  //                       </Box>
  //                     </Grid>
  //                   );
  //                 })}
  //             </Grid>
  //           </Box>
  //         </Grid>
  //       </Tooltip>
  //       {/* third card */}
  //       <Tooltip
  //         title="Hier hast Du alle Details zu der entsprechenden Übung"
  //         arrow
  //       >
  //         <Grid item xs={12} md={4}>
  //           {/* <Grid item sx={{ minWidth: "280px" }}> */}
  //           <Box
  //             sx={{
  //               height: { xs: "auto", md: "500px", xxl: "700px" },
  //               backgroundColor: "#212121",
  //               overflowY: "scroll",
  //               padding: "6px",
  //               margin: "10px",
  //               borderRadius: "5px",
  //             }}
  //           >
  //             <Grid
  //               container
  //               direction="row"
  //               // rowSpacing={1}
  //               // mt={2}
  //               justifyContent="space-around"
  //             >
  //               {tab === 0 &&
  //                 (user.savedUnits.length > 0 ? (
  //                   <ExerciseCard
  //                     index={indexExercise}
  //                     exercise={user.savedUnits[index].exercises[indexExercise]}
  //                     // exercises={user.savedUnits[index].exercises}
  //                     changeOptions={false}
  //                   />
  //                 ) : (
  //                   <Typography>
  //                     Ausgwählte Übungen einer gespeicherten Trainingseinheit
  //                     kannst Du hier im Detail anschauen.
  //                   </Typography>
  //                 ))}

  //               {tab === 1 && (
  //                 <ExerciseCard
  //                   index={indexExercise}
  //                   exercise={
  //                     recommendedTrainings[index].exercises[indexExercise]
  //                   }
  //                   // exercises={recommendedTrainings[index].exercises}
  //                   changeOptions={false}
  //                 />
  //               )}
  //             </Grid>
  //           </Box>

  //           {/* <Box
  //           minHeight={{ xs: "400px", xl: "500px" }}
  //           height="calc(100% - 16px)" // 100% height but minus two times the 8px margin
  //           sx={{
  //             backgroundColor: "var(--lightgray)",
  //             borderRadius: "5px",
  //             m: 1,
  //             overflowY: "scroll",
  //           }}
  //         >
  //           {tab === 0 && user.savedUnits.length > 0 && (
  //             <Card
  //               sx={{
  //                 height: { xs: "500px", xxl: "700px" },
  //                 backgroundColor: "#212121",
  //                 overflowY: "scroll",
  //               }}
  //             >
  //               <CardHeader
  //                 // avatar={
  //                 //   <IconButton
  //                 //     onClick={() => {
  //                 //       let favoriteData = {
  //                 //         emailUser: user.email,
  //                 //         exercise:
  //                 //           user.savedUnits[index].exercises[indexExercise],
  //                 //       };
  //                 //       toggleFavorite(favoriteData);
  //                 //     }}
  //                 //   >
  //                 //     {user.favorites.some(
  //                 //       (fav) =>
  //                 //         fav.Übungsname ===
  //                 //         user.savedUnits[index].exercises[indexExercise]
  //                 //           .Übungsname
  //                 //     ) ? (
  //                 //       <Star />
  //                 //     ) : (
  //                 //       <StarBorder />
  //                 //     )}
  //                 //   </IconButton>
  //                 // }
  //                 title={
  //                   user.savedUnits[index].exercises[indexExercise].Übungsname
  //                 }
  //                 titleTypographyProps={{ color: "white" }}
  //               />
  //               <CardMedia
  //                 component="img"
  //                 src={
  //                   process.env.PUBLIC_URL +
  //                   `/images/${user.savedUnits[index].exercises[indexExercise].ID}.png`
  //                 }
  //                 alt="Bild Übung"
  //                 sx={{ maxWidth: "100%", height: "auto" }}
  //               />
  //               <CardContent>
  //                 <Grid container>
  //                   <Grid
  //                     item
  //                     xs={3}
  //                     container
  //                     justifyContent="flex-start"
  //                     alignItems="center"
  //                     pl={1}
  //                   >
  //                     <AccessTime fontSize="10px" />
  //                     <Typography sx={{ fontSize: "10px" }}>15-20</Typography>
  //                   </Grid>
  //                   <Grid item xs={6}>
  //                     <Typography variant="h2green" sx={{ fontSize: "70%" }}>
  //                       {
  //                         user.savedUnits[index].exercises[indexExercise]
  //                           .Übungsname
  //                       }
  //                     </Typography>
  //                   </Grid>
  //                   <Grid item xs={2}></Grid>
  //                 </Grid>
  //                 <Box sx={{ width: "100%" }} mb={2}>
  //                   <Tabs
  //                     value={tabCard}
  //                     onChange={(event, value) => {
  //                       setTabCard(value);
  //                     }}
  //                     textColor={"primary"}
  //                     centered
  //                   >
  //                     <Tab
  //                       sx={{ fontSize: "11px", minWidth: 0, p: "4px" }}
  //                       value={0}
  //                       label="Ablauf"
  //                     />
  //                     <Tab
  //                       sx={{ fontSize: "11px", minWidth: 0, p: "4px" }}
  //                       value={1}
  //                       label="Aufbau"
  //                     />
  //                     <Tab
  //                       sx={{ fontSize: "11px", minWidth: 0, p: "4px" }}
  //                       value={2}
  //                       label="Varianten"
  //                     />
  //                     <Tab
  //                       sx={{ fontSize: "11px", minWidth: 0, p: "4px" }}
  //                       value={3}
  //                       label="Tipps"
  //                     />
  //                   </Tabs>
  //                 </Box>
  //                 <Grid container>
  //                   <Grid item>
  //                     <Typography
  //                       sx={{
  //                         textAlign: "justify",
  //                         fontSize: "80%",
  //                         lineHeight: "1.2",
  //                       }}
  //                     >
  //                       {renderContent(
  //                         user.savedUnits[index].exercises[indexExercise]
  //                       )}
  //                     </Typography>
  //                   </Grid>
  //                 </Grid>
  //               </CardContent>
  //             </Card>
  //           )}
  //           {tab === 1 && recommendedTrainings[index].unit[indexExercise].title}
  //         </Box> */}
  //         </Grid>
  //       </Tooltip>
  //     </Grid>

  //     {/* edit unit dialog */}
  //     <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
  //       <DialogTitle>
  //         Einheit bearbeiten
  //         <IconButton
  //           aria-label="close"
  //           onClick={() => setOpenEditDialog(false)}
  //           sx={{ position: "absolute", right: 8, top: 8 }}
  //         >
  //           <CloseIcon />
  //         </IconButton>
  //       </DialogTitle>
  //       <DialogContent>
  //         Wollen Sie die folgende Einheit wirklich bearbeiten?
  //         {tab === 0 &&
  //           (user.savedUnits.length > 0 ? (
  //             <Typography>
  //               {user.savedUnits[index].date} <br />
  //               {user.savedUnits[index].time} <br />
  //               {user.savedUnits[index].title} <br />
  //               {user.savedUnits[index].player} <br />
  //               {user.savedUnits[index].goalkeeper} <br />
  //               {user.savedUnits[index].focus
  //                 ? user.savedUnits[index].focus
  //                 : "Ohne Schwerpunkt"}
  //             </Typography>
  //           ) : (
  //             <Typography>Keine Übung vorhanden</Typography>
  //           ))}
  //         {tab === 1 && (
  //           <Typography>
  //             {recommendedTrainings[index].date} <br />
  //             {recommendedTrainings[index].time} <br />
  //             {recommendedTrainings[index].title} <br />
  //             {recommendedTrainings[index].player} <br />
  //             {recommendedTrainings[index].goalkeeper} <br />
  //             {recommendedTrainings[index].focus}
  //           </Typography>
  //         )}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button
  //           onClick={() => {
  //             // set new unit
  //             let unitInfo;
  //             let editUnitExercises;
  //             if (tab === 0) {
  //               unitInfo = {
  //                 player: user.savedUnits[index].player,
  //                 goalkeeper: user.savedUnits[index].goalkeeper,
  //                 duration: user.savedUnits[index].duration,
  //                 focus: user.savedUnits[index].focus,
  //               };
  //               editUnitExercises = user.savedUnits[index].exercises;
  //             } else if (tab === 2) {
  //               unitInfo = {
  //                 player: recommendedTrainings[index].player,
  //                 goalkeeper: recommendedTrainings[index].goalkeeper,
  //                 duration: recommendedTrainings[index].duration,
  //                 focus: recommendedTrainings[index].focus,
  //               };
  //               editUnitExercises = recommendedTrainings[index].unit;
  //             }
  //             dispatch(setNewUnit({ editUnitExercises }));
  //             dispatch(setNewUnitInfo({ unitInfo }));
  //             // go to edit mode
  //             dispatch(setNewTab(0));
  //           }}
  //         >
  //           Bearbeiten
  //         </Button>
  //         <Button onClick={() => setOpenEditDialog(false)}>Abbrechen</Button>
  //       </DialogActions>
  //     </Dialog>
  //     {/* delete unit dialog */}
  //     <Dialog
  //       open={openDeleteDialog}
  //       onClose={() => setOpenDeleteDialog(false)}
  //     >
  //       <DialogTitle>
  //         Einheit löschen
  //         <IconButton
  //           aria-label="close"
  //           onClick={() => setOpenDeleteDialog(false)}
  //           sx={{ position: "absolute", right: 8, top: 8 }}
  //         >
  //           <CloseIcon />
  //         </IconButton>
  //       </DialogTitle>
  //       <DialogContent>
  //         Wollen Sie die folgende Einheit wirklich löschen?
  //         {user.savedUnits.length > 0 ? (
  //           <Typography>
  //             {user.savedUnits[index].date} <br />
  //             {user.savedUnits[index].time} <br />
  //             {user.savedUnits[index].title} <br />
  //             {user.savedUnits[index].player} <br />
  //             {user.savedUnits[index].goalkeeper} <br />
  //             {user.savedUnits[index].focus
  //               ? user.savedUnits[index].focus
  //               : "Ohne Schwerpunkt"}
  //           </Typography>
  //         ) : (
  //           <Typography>Keine Übung vorhanden</Typography>
  //         )}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => removeSavedUnit(user.savedUnits[index].id)}>
  //           Löschen
  //         </Button>
  //         <Button onClick={() => setOpenDeleteDialog(false)}>Abbrechen</Button>
  //       </DialogActions>
  //     </Dialog>
  //   </>
  // );
}

export default SavedModeTrainingsplaner;
