import {
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  Check as CheckIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ModeEdit as ModeEditIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createMatch,
  updateMatch,
  getMatches,
  deleteMatch,
} from "../features/matchplaner/matchplanerAPI";
import {
  getMatchesLoading,
  getMatchesSuccess,
  getMatchesError,
  createMatchLoading,
  createMatchSuccess,
  createMatchError,
  updateMatchLoading,
  updateMatchSuccess,
  updateMatchError,
  deleteMatchLoading,
  deleteMatchSuccess,
  deleteMatchError,
  resetStatus,
} from "../features/matchplaner/matchplanerActions";
import SpinnerLogo from "../components/SpinnerLogo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function Matchplaner() {
  // siehe folder matchplaner
  // set custom title (for google analytics)
  // useEffect(() => {
  //   document.title = "MatchPlaner | Matchplaner";
  // }, []);

  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.user);

  const {
    matchesAvailable,
    matchesCreated,
    matchesFixed,
    matchesApplied,
    error,
    status,
  } = useSelector((state) => state.matchplaner);

  const loadMatches = async () => {
    try {
      // init loading
      dispatch(getMatchesLoading());
      // api call
      const response = await getMatches(token);
      dispatch(getMatchesSuccess(response));
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(getMatchesError(message));
    }
  };

  // get all matches of the current user at first render
  useEffect(() => {
    loadMatches();
  }, []);

  // after any action show error message and reset status
  useEffect(() => {
    if (error || status === "failed") {
      toast.error(error);
    }

    if (status === "success") {
      loadMatches();
    }

    if (status !== "loading") {
      dispatch(resetStatus());
    }
  }, [status, error]);

  // CREATE A NEW MATCH
  // init values
  const [newMatchDate, setNewMatchDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [newMatchTime, setNewMatchTime] = useState("19:00");
  const [newMatchDestination, setNewMatchDestination] = useState("H");
  // reset function
  const resetNewMatchData = () => {
    setNewMatchDate(moment(new Date()).format("YYYY-MM-DD"));
    setNewMatchTime("19:00");
    setNewMatchDestination("H");
  };
  // handle change of input
  const onNewMatchDateChanged = (e) => setNewMatchDate(e.target.value);
  const onNewMatchTimeChanged = (e) => setNewMatchTime(e.target.value);
  const onNewMatchDestinationChanged = (e) =>
    setNewMatchDestination(e.target.value);
  // init dialog
  const [openNewMatchDialog, setOpenNewMatchDialog] = useState(false);

  // UPDATE OWN MATCH
  // init values
  const [updateMatchId, setUpdateMatchId] = useState("");
  const [updateMatchDate, setUpdateMatchDate] = useState("");
  const [updateMatchTime, setUpdateMatchTime] = useState("");
  const [updateMatchDestination, setUpdateMatchDestination] = useState("");
  // reset function
  const resetUpdateMatchData = () => {
    setUpdateMatchId("");
    setUpdateMatchDate("");
    setUpdateMatchTime("");
    setUpdateMatchDestination("");
  };
  // handle change of input
  const onUpdateMatchDateChanged = (e) => setUpdateMatchDate(e.target.value);
  const onUpdateMatchTimeChanged = (e) => setUpdateMatchTime(e.target.value);
  const onUpdateMatchDestinationChanged = (e) =>
    setUpdateMatchDestination(e.target.value);
  // init and handle dialog
  const [openUpdateMatchDialog, setOpenUpdateMatchDialog] = useState(false);

  // SHOW APPLICANTS
  // Create object with data of match
  // set applicants to an empty array, so the dialog wont throw an error
  // with calling the dialog the matchData gets filled with the right data
  const [matchData, setMatchData] = useState({
    applicants: [],
  });
  // init and handle dialog
  const [openShowApplicantsDialog, setOpenShowApplicantsDialog] =
    useState(false);
  // show applicants of match
  const handleOpenApplicants = (match) => {
    setMatchData(match);
    setOpenShowApplicantsDialog(true);
  };
  // close applicants of match
  const handleCloseApplicants = () => {
    setMatchData({
      applicants: [],
    });
    setOpenShowApplicantsDialog(false);
  };

  // DELETE OWN MATCH
  // init dialog
  const [openDeleteMatchDialog, setOpenDeleteMatchDialog] = useState(false);
  const [deleteData, setDeleteData] = useState({}); // empty object - placeholder for match data

  // TODO: show more/all details of the current match
  const openDetails = (e) => {
    console.log("Hier dann die restlichen Details zeigen.");
  };

  // TODO: close the additional information of the match
  const closeDetails = (e) => {
    console.log("Details schließen");
  };

  // check for matches at same day
  const [openWarningMatchSameDay, setOpenWarningMatchSameDay] = useState(false);
  const [openAskMatch, setOpenAskMatch] = useState(false);
  const [askMatchData, setAskMatchData] = useState({});
  let askMatchSameDay = false;

  // first step ask for match
  // m = match
  const askMatch = (e, m) => {
    setAskMatchData(m);
    setOpenAskMatch(true);
  };

  // submit ask for match
  const submitAskMatch = async (e) => {
    setOpenAskMatch(false);

    // return true, if there is one match with the same date, else false
    askMatchSameDay = matchesFixed.some((match) => {
      return (
        moment(new Date(match.date)).format("YYYY-MM-DD") ===
        moment(new Date(askMatchData.date)).format("YYYY-MM-DD")
      );
    });

    // close warning that there is already a match at that day, when user submits with info of this warning
    if (e.target.id === "submitAskSameDay") {
      askMatchSameDay = false;
      setOpenWarningMatchSameDay(false);
    }

    if (askMatchSameDay) {
      setOpenWarningMatchSameDay(askMatchSameDay);
    } else {
      const userData = [user, askMatchData, "ask"];
      dispatch(updateMatchLoading());
      try {
        const response = await updateMatch(userData, token);
        // dispatch(updateMatchSuccess(response.data));
        dispatch(updateMatchSuccess());
        resetUpdateMatchData();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        updateMatchError(message);
      }
    }
  };

  // check for matches at same day
  // const [openWarningMatchSameDayApplicant, setOpenWarningMatchSameDayApplicant] = useState(false);
  let askMatchSameDayApplicant = false;

  // accept this request (and decline all other applicants)
  // e=event, a=applicant, m=match
  const acceptMatch = async (e, a, m) => {
    // return true, if there is one match with the same date, else false
    // if the user confirms the match at the same day - fix match
    if (e.target.id === "submitButtonSameDayRequestApplicant") {
      askMatchSameDayApplicant = false;
    } else {
      askMatchSameDayApplicant = matchesFixed.some((match) => {
        return (
          moment(new Date(match.date)).format("YYYY-MM-DD") ===
          moment(new Date(m.date)).format("YYYY-MM-DD")
        );
      });
    }

    if (askMatchSameDayApplicant) {
      // if there is a match at the same day, show warnings (in the dialog)
      document.getElementById("closeSameDayRequestApplicant").style.display =
        "none";
      document.getElementById("warningSameDayMatchApplicant").style.display =
        "inline-block";
      document.getElementById("submitSameDayRequestApplicant").style.display =
        "inline-block";
    } else {
      // close dialog
      setOpenShowApplicantsDialog(false);
      const userData = [user, m, "accept", a];
      dispatch(updateMatchLoading());
      try {
        const response = await updateMatch(userData, token);
        // dispatch(updateMatchSuccess(response.data));
        dispatch(updateMatchSuccess());
        resetUpdateMatchData();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        updateMatchError(message);
      }
    }
  };

  // TODO
  // e=event, a=applicant, m=match
  const declineMatch = async (e, a, m) => {
    // close dialog
    setOpenShowApplicantsDialog(false);
    const userData = [user, m, "decline", a];
    dispatch(updateMatchLoading());
    try {
      const response = await updateMatch(userData, token);
      // dispatch(updateMatchSuccess(response.data));
      dispatch(updateMatchSuccess());
      resetUpdateMatchData();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      updateMatchError(message);
    }
  };

  // check for matches at same day
  const [openWarningMatchSameDayChange, setOpenWarningMatchSameDayChange] =
    useState(false);
  let changeMatchSameDay = false;

  // change/update this own match
  // e=event, m=match
  const handleUpdate = (e, m) => {
    setUpdateMatchId(m._id);
    setUpdateMatchDate(moment(new Date(m.date)).format("YYYY-MM-DD")); // format date, so mui/react recognizes the date format (for the dialog)
    setUpdateMatchTime(m.time);
    setUpdateMatchDestination(m.destination);

    // // set updateData for dialog
    // setUpdateData({
    //   _id: m._id,
    //   // format date, so mui/react recognizes the date format (for the dialog)
    //   date: moment(new Date(m.date)).format("YYYY-MM-DD"),
    //   time: m.time,
    //   destination: m.destination,
    // });
    // // set the fixed data (to compare in the dialog)
    // setFixedUpdateData({
    //   updateId: m._id,
    //   updateDate: moment(new Date(m.date)).format("YYYY-MM-DD"),
    //   updateTime: m.time,
    //   updateDestination: m.destination,
    // });

    // open update Dialog
    setOpenUpdateMatchDialog(true);
  };

  // on submit of update dialog
  const onSubmitUpdate = async (e) => {
    // close update Dialog
    setOpenUpdateMatchDialog(false);

    // check if there is already a match at this day
    changeMatchSameDay = matchesFixed.some((match) => {
      return (
        // moment(new Date(match.date)).format("YYYY-MM-DD") === updateData.date
        moment(new Date(match.date)).format("YYYY-MM-DD") === updateMatchDate
      );
    });

    // set boolean to false, if the event was the submit of the warning
    if (e.target.id === "submitChangeSameDay") {
      changeMatchSameDay = false;
      setOpenWarningMatchSameDayChange(false);
    }

    if (changeMatchSameDay) {
      setOpenWarningMatchSameDayChange(changeMatchSameDay);
    } else {
      // match id object needs to be on second place
      // const matchObject = { _id: updateData._id };
      const matchObject = { _id: updateMatchId };
      // const userData = [user, matchObject, "update", updateData];
      const updateMatchData = {
        updateMatchId,
        updateMatchDate,
        updateMatchTime,
        updateMatchDestination,
      };
      const userData = [user, matchObject, "update", updateMatchData];
      dispatch(updateMatchLoading());
      try {
        const response = await updateMatch(userData, token);
        // dispatch(updateMatchSuccess(response.data));
        dispatch(updateMatchSuccess());
        resetUpdateMatchData();
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        updateMatchError(message);
      }
    }
  };

  // click on delete button
  const deleteSubmit = (m) => {
    setDeleteData(m);
    setOpenDeleteMatchDialog(true);
  };

  // cancel delete request
  const cancelDelete = (m) => {
    setOpenDeleteMatchDialog(false);
    setDeleteData({});
  };

  // delete one of your own matches
  const handleDelete = async (m) => {
    setOpenDeleteMatchDialog(false);
    const userData = [user, deleteData, "delete"];
    dispatch(deleteMatchLoading());
    try {
      const response = await deleteMatch(userData, token);
      // dispatch(deleteMatchSuccess(response.data));
      dispatch(deleteMatchSuccess());
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      deleteMatchError(message);
    }
  };

  // variable to check if there is already a (fixed) match at this day
  let matchAtSameDay = false;

  // init the create-match process (with the form-data)
  const onSubmit = async (e) => {
    e.preventDefault();

    // return true, if there is one match with the same date, else false
    matchAtSameDay = matchesFixed.some((match) => {
      // return moment(new Date(match.date)).format("YYYY-MM-DD") === date;
      return moment(new Date(match.date)).format("YYYY-MM-DD") === newMatchDate;
    });

    // if the user confirms the match at the same day - create match
    if (e.target.id === "submitSameDayRequest") {
      matchAtSameDay = false;
    }

    // if (!date || !time || !destination) {
    if (!newMatchDate || !newMatchTime || !newMatchDestination) {
      toast.error("Bitte füllen Sie alle Felder aus!");
    } else if (matchAtSameDay) {
      // if there is a match at the same day, show warnings (in the dialog)
      document.getElementById("submitRequest").style.display = "none";
      document.getElementById("warningSameDayMatch").style.display =
        "inline-block";
      document.getElementById("submitSameDayRequest").style.display =
        "inline-block";
    } else {
      // close dialog
      setOpenNewMatchDialog(false);

      const userData = {
        emailAsId: user.email,
        opponentEmailAsId: "",
        // date, // set by form
        newMatchDate, // set by form
        // time, // set by form
        newMatchTime, // set by form
        // destination, // set by form
        newMatchDestination, // set by form
        club: user.club,
        applicants: [],
        opponent: "",
        coachClub: user.name,
        coachOpponent: "",
        age: user.age.value,
        league: user.league.value,
        association: user.association,
        matched: false,
      };

      if (!user.age || !user.league || !user.association) {
        toast.error("Bitte füllen Sie zuerst Ihr Profil aus!");
      } else {
        dispatch(createMatchLoading());
        try {
          const response = await createMatch(userData, token);
          // console.log(response);
          // dispatch(createMatchSuccess(response.data));
          dispatch(createMatchSuccess());
          resetNewMatchData();
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          createMatchError(message);
        }
      }
    }
  };

  // loading sign
  if (status === "loading") {
    return <SpinnerLogo />;
  }

  return (
    <>
      <Typography variant="mainHeader">Matchplaner</Typography>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      {/* äußerster Container */}
      {/* <Grid container> */}
      {/* container headings */}
      <Grid
        container
        justifyContent="space-between"
        display={{ xs: "none", md: "flex" }}
      >
        {/* headings */}
        <Grid item>
          <Typography variant="h6">Testspielbörse: Gegner finden</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Eigene Anfragen</Typography>
        </Grid>
      </Grid>
      {/* container Testspielbörse/neues Match/eigene Matches */}
      <Grid
        container
        height={{ xs: "auto", md: 300 }}
        mb={2}
        direction={{ xs: "column", md: "row" }}
      >
        <Grid item display={{ xs: "grid", md: "none" }}>
          <Typography variant="h6">Testspielbörse: Gegner finden</Typography>
        </Grid>
        {/* container testspielbörse: spiele */}
        <Grid
          item
          container
          xs={12}
          md={9}
          sx={{
            border: "1px solid gray",
            borderRadius: "5px",
            height: "100%",
            overflowY: "scroll",
          }}
          mr={{ xs: 0, md: 1 }} // margin between the two containers of 1=8px --> set width of second container to "xs"
          mb={{ xs: 1, md: 0 }}
          p={"2px"} // beacuse margin of cards is 2px in each direction (so between them there is a space of 4 px) -> add 2px between cards and box so there are also 4 px
        >
          {/* spiele */}
          {matchesAvailable.length > 0 ? (
            <>
              {matchesAvailable.map((match, index) => (
                // item: card spiele
                // <Grid item key={index} xs={12} md={4} lg={3} xl={2}>
                <Grid item key={index} xs={12} md={6} lg={4}>
                  <Card>
                    <CardContent
                      sx={{ pl: 0, pr: 0, pt: "5px", overflow: "scroll" }}
                    >
                      {/* container: heading */}
                      <Grid
                        item
                        container
                        // justifyContent="space-between"
                        backgroundColor="lightgray"
                        sx={{ pl: 1, pr: 1 }}
                      >
                        {/* headings */}
                        <Grid item xs={4}>
                          {match.date.split("T")[0].split("-")[2]}.
                          {match.date.split("T")[0].split("-")[1]}.
                          {match.date.split("T")[0].split("-")[0].slice(2, 4)}
                        </Grid>
                        <Grid item xs={4}>
                          {match.time}
                        </Grid>
                        <Grid item xs={4}>
                          {match.destination}
                        </Grid>
                      </Grid>
                      <Typography variant="subtitle1">{match.club}</Typography>
                      <Typography variant="subtitle2">
                        {match.age === 20 ? "Aktive" : "U" + match.age}
                      </Typography>
                      <Typography variant="subtitle2">
                        {match.league}
                      </Typography>
                      <Typography variant="subtitle2">
                        {match.association}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      {/* <Button size="small" onClick={openDetails}>
                            Details
                          </Button> */}
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => askMatch(e, match)}
                      >
                        Anfragen
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </>
          ) : (
            <Grid item xs={12} alignSelf="center">
              <em>Keine Testspiele vorhanden.</em>
            </Grid>
          )}
        </Grid>
        {/* container neue Anfrage/eigene Spiele */}
        {/* Defining an explicit width to a Grid element that is flex container, flex item, and has spacing at the same time lead to unexpected behavior, avoid doing it. If you need to do such, remove one of the props. */}
        {/* The xs, sm, md, lg, and xl props are not supported within direction="column" and direction="column-reverse" containers. */}
        <Grid
          item
          container
          direction="column"
          // xs="auto"
          xs={12}
          md
          justifyContent="space-between"
        >
          <Grid item display={{ xs: 12, md: "none" }}>
            <Typography variant="h6">Eigene Anfragen</Typography>
          </Grid>
          {/* neue Anfrage */}
          <Grid
            item
            height={100} // fixed height so we can set the height of the coachMatches
            sx={{
              backgroundColor: "#a0ff0b",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            // onClick={handleOpen}
            onClick={() => setOpenNewMatchDialog(true)}
          >
            <Typography
              variant="h3"
              color="black"
              fontWeight={{ lg: "bold" }}
              mb={0}
            >
              <AddIcon fontSize="large" />
            </Typography>
            <Typography
              variant="h6"
              color="black"
              sx={{ m: 0 }}
              fontSize={{ xs: "12px", md: "15px" }}
            >
              Neue Anfrage erstellen
            </Typography>
          </Grid>
          {/* eigene Spiele: container spiele */}
          <Grid
            item
            container
            // direction="column"
            height={{ xs: "auto", md: "calc(100% - 100px - 8px)" }} //  100% of the container height - 100px of the "Neue Anfrage erstellen"-Button - 8px spacing
            maxHeight={"calc(300px - 100px - 8px)"} // 100% nimmt auch mehr als die gegebene Fläche ein, deshalb mit maxHeight beschränken (Höhe Testspielbörse - Höhe Button - Höhe Spacing)
            // MUI uses a recommended 8px scaling factor by default.
            my={{ xs: 1, md: 0 }}
            sx={{
              border: "1px solid gray",
              borderRadius: "5px",
              overflow: "scroll",
            }}
            alignContent="start"
          >
            {/* spiele */}
            {matchesCreated.length > 0 ? (
              <>
                {matchesCreated.map((match, index) => (
                  // container: spiele/infos/bewerber
                  <Grid
                    item
                    container
                    key={index}
                    justifyContent="space-evenly"
                  >
                    {/* infos */}
                    <Grid item xs={4} md={12} lg={4}>
                      {/* split date string an only take day.month.year */}
                      {match.date.split("T")[0].split("-")[2]}.
                      {match.date.split("T")[0].split("-")[1]}.
                      {match.date.split("T")[0].split("-")[0].slice(2, 4)}
                    </Grid>
                    <Grid item xs={2} md={4} lg={2}>
                      {match.time}
                    </Grid>
                    <Grid item xs={1} md={2} lg={1}>
                      {match.destination}
                    </Grid>
                    <Grid item xs={1} md={2} lg={1}>
                      <Typography
                        variant="subtitle1"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleOpenApplicants(match)}
                      >
                        {match.applicants.length}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      onClick={(e) => handleUpdate(e, match)}
                      sx={{ cursor: "pointer" }}
                    >
                      <ModeEditIcon />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      // onClick={(e) => handleDelete(e, match)}
                      onClick={() => deleteSubmit(match)}
                      sx={{ cursor: "pointer" }}
                    >
                      <DeleteIcon color="warning" />
                    </Grid>
                  </Grid>
                ))}
              </>
            ) : (
              <Grid item xs={12} alignSelf="center">
                <em>Noch keine eigene Anfrage erstellt.</em>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* container headings */}
      <Grid
        container
        justifyContent="space-between"
        display={{ xs: "none", md: "flex" }}
      >
        {/* headings */}
        <Grid item>
          <Typography variant="h6">Matches: Vereinbarte Spiele</Typography>
        </Grid>
        <Grid item>
          {/* <Typography variant="h6">Merkliste</Typography> */}
          <Typography variant="h6">Angefragte Spiele und Merkliste</Typography>
        </Grid>
      </Grid>
      {/* container vereinbarte Spiele/bewerber */}
      <Grid
        container
        height={{ xs: "auto", md: 300 }}
        direction={{ xs: "column", md: "row" }}
      >
        {/* container vereinbarte Spiele */}
        <Grid item display={{ xs: "grid", md: "none" }}>
          <Typography variant="h6">Matches: Vereinbarte Spiele</Typography>
        </Grid>
        <Grid
          item
          container
          sx={{
            border: "1px solid gray",
            borderRadius: "5px",
            height: "100%",
            overflowY: "scroll",
          }}
          alignContent="start"
          mr={{ xs: 0, md: 1 }}
          mb={{ xs: 1, md: 0 }}
          xs={12}
          md
        >
          {/* spiele */}
          {matchesFixed.length > 0 ? (
            <>
              {matchesFixed.map((match, index) => (
                // container spiele/infos
                <Grid item container key={index}>
                  {/* infos */}
                  <Grid item xs={4}>
                    {match.date.split("T")[0].split("-")[2]}.
                    {match.date.split("T")[0].split("-")[1]}.
                    {match.date.split("T")[0].split("-")[0].slice(2, 4)},
                    {match.time} Uhr
                  </Grid>
                  <Grid item xs={5}>
                    {user.club === match.opponent ? match.club : match.opponent}
                  </Grid>
                  <Grid item xs={3}>
                    {match.destination}
                  </Grid>
                </Grid>
              ))}
            </>
          ) : (
            <Grid item xs={12} alignSelf="center">
              <em>Keine Testspiele vereinbart.</em>
            </Grid>
          )}
        </Grid>
        {/* container spiele als bewerber */}
        <Grid item display={{ xs: "grid", md: "none" }}>
          <Typography variant="h6">Angefragte Spiele und Merkliste</Typography>
        </Grid>
        <Grid
          item
          container
          sx={{
            border: "1px solid gray",
            borderRadius: "5px",
            height: "100%",
            overflowY: "scroll",
          }}
          alignContent="start"
          xs={12}
          md
        >
          {/* spiele */}
          {matchesApplied.length > 0 ? (
            <>
              {matchesApplied.map((match, index) => (
                // container spiele/card/infos
                <Grid item container key={index}>
                  {/* infos */}
                  <Grid item xs={4}>
                    {match.date.split("T")[0].split("-")[2]}.
                    {match.date.split("T")[0].split("-")[1]}.
                    {match.date.split("T")[0].split("-")[0].slice(2, 4)},
                    {match.time} Uhr
                  </Grid>
                  <Grid item xs={5}>
                    {match.club}
                  </Grid>
                  {/* {match.applicants.includes(user.email) ? ( */}
                  {match.applicants.some((u) => u.email === user.email) ? (
                    <>
                      <Grid item xs={2}>
                        <em>angefragt</em>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={2}>
                        <em>gemerkt</em>
                      </Grid>
                      <Grid item xs={1}>
                        <AddIcon />
                      </Grid>
                    </>
                  )}
                </Grid>
              ))}
            </>
          ) : (
            <Grid item xs={12} alignSelf="center">
              <em>Keine Testspiele angefragt.</em>
            </Grid>
          )}
        </Grid>
      </Grid>
      {/* </Grid> */}

      {/* Filter */}
      {/* <Box sx={{ display: "none" }}> */}
      {/* <Box> */}
      {/* <Typography variant="h6">Wunschgegner</Typography> */}
      {/* age */}
      {/* <FormControl>
          <InputLabel variant="standard" htmlFor="ageMatches">
            Alter
          </InputLabel>
          <NativeSelect
            defaultValue=""
            inputProps={{
              name: "age",
              id: "ageMatches",
            }}
          >
            <option disabled value="">
              Alter
            </option>
            <option value="u18">U18</option>
            <option value="u17">U17</option>
          </NativeSelect>
        </FormControl> */}
      {/* league */}
      {/* <FormControl>
          <InputLabel variant="standard" htmlFor="leagueMatches">
            Liga
          </InputLabel>
          <NativeSelect
            defaultValue=""
            inputProps={{
              name: "league",
              id: "leagueMatches",
            }}
          >
            <option disabled value="">
              Liga
            </option>
            <option value="bl1">1. Bundesliga</option>
            <option value="bl2">2. Bundesliga</option>
          </NativeSelect>
        </FormControl> */}
      {/* city */}
      {/* hier nach plz? oder input field? */}
      {/* association */}
      {/* <FormControl>
          <InputLabel variant="standard" htmlFor="associationMatches">
            Liga
          </InputLabel>
          <NativeSelect
            defaultValue=""
            inputProps={{
              name: "association",
              id: "associationMatches",
            }}
          >
            <option disabled value="">
              Verband
            </option>
            <option value="wfv">WFV</option>
            <option value="bfv">BFV</option>
          </NativeSelect>
        </FormControl> */}
      {/* distance */}
      {/* <FormControl>
          <InputLabel variant="standard" htmlFor="distanceMatches">
            Entfernung
          </InputLabel>
          <NativeSelect
            defaultValue=""
            inputProps={{
              name: "distance",
              id: "distanceMatches",
            }}
          >
            <option disabled value="">
              Umkreis
            </option>
            <option value="10">&lt; 10km</option>
            <option value="50">&lt; 50km</option>
            <option value="50+">&gt; 50km</option>
          </NativeSelect>
        </FormControl>
      </Box> */}
      {/* Sort */}
      {/* <Box sx={{ display: "none" }}> */}
      {/* <Box> */}
      {/* <FormControl fullWidth> */}
      {/* <FormControl>
          <InputLabel variant="standard" htmlFor="sortMatches">
            Sortieren
          </InputLabel>
          <NativeSelect
            defaultValue="new"
            inputProps={{
              name: "sort",
              id: "sortMatches",
            }}
          >
            <option value="new">Neuste</option>
            <option value="date">Datum/Nächste</option>
            <option value="distance">Distanz</option>
          </NativeSelect>
        </FormControl>
        <Button>Anwenden</Button>
      </Box> */}
      {/* Search */}
      {/* <Box sx={{ display: "none" }}>
       <TextField
          type="text"
          id="search"
          label="Suche"
          // value={search}
          name="search"
          onChange={onChange}
        />
      </Box> */}

      {/* Dialog: create new match */}
      <Dialog
        open={openNewMatchDialog}
        // onClose={handleClose}
        onClose={() => setOpenNewMatchDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Neues Spiel erstellen
          <IconButton
            aria-label="close"
            // onClick={handleClose}
            onClick={() => setOpenNewMatchDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          <DialogContentText>
            Bitte füllen Sie die folgenden Daten aus, um ein neues Testspiel zu
            erstellen.
          </DialogContentText>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={3}>
              Datum:
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                type="date"
                id="date"
                // label="Datum"
                // value={date}
                value={newMatchDate}
                name="date"
                // onChange={onChange}
                onChange={onNewMatchDateChanged}
                InputProps={{
                  inputProps: { min: moment().format("YYYY-MM-DD") },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              Uhrzeit:
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                type="time"
                id="time"
                // label="Uhrzeit"
                // value={time}
                value={newMatchTime}
                name="time"
                // onChange={onChange}
                onChange={onNewMatchTimeChanged}
              />
            </Grid>
            <Grid item xs={3}>
              Spielort:
            </Grid>
            <Grid item xs={9}>
              <TextField
                select
                required
                // fullWidth
                // label="Spielort"
                name="destination"
                id="destination"
                // value={destination}
                value={newMatchDestination}
                onChange={onNewMatchDestinationChanged}
              >
                <MenuItem value="H">Heim</MenuItem>
                <MenuItem value="A">Auswärts</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Typography
            id="warningSameDayMatch"
            sx={{ display: "none", color: "orange" }}
          >
            Sie haben bereits ein Testspiel an diesem Tag. Wollen Sie trotzdem
            fortfahren?
          </Typography>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button variant="outlined" onClick={onSubmit} id="submitRequest">
              Anfrage erstellen
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={onSubmit}
              id="submitSameDayRequest"
              sx={{ display: "none" }}
            >
              Anfrage trotzdem erstellen
            </Button>
            {/* <Button onClick={handleClose}>Abbrechen</Button> */}
            <Button onClick={() => setOpenNewMatchDialog(false)}>
              Abbrechen
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Dialog: ask match at the same day */}
      <Dialog
        open={openWarningMatchSameDay}
        onClose={() => setOpenWarningMatchSameDay(false)}
        aria-labelledby="warning-match-same-day-title"
        aria-describedby="warning-match-same-day-description"
      >
        <DialogTitle sx={{ color: "black" }}>
          Spiel wirklich anfragen?
          <IconButton
            aria-label="close"
            onClick={() => setOpenWarningMatchSameDay(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "orange" }}>
            Sie haben bereits ein Spiel an diesem Tag ausgemacht. Wollen Sie
            dennoch dieses Spiel anfragen?
          </DialogContentText>
          <DialogActions>
            <Button
              variant="outlined"
              color="warning"
              id="submitAskSameDay"
              onClick={(e) => submitAskMatch(e)}
            >
              Anfrage trotzdem stellen
            </Button>
            <Button onClick={() => setOpenWarningMatchSameDay(false)}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Dialog: warning change match to same day as fixed match */}
      <Dialog
        open={openWarningMatchSameDayChange}
        onClose={() => setOpenWarningMatchSameDayChange(false)}
        // aria-labelledby="warning-match-same-day-title"
        // aria-describedby="warning-match-same-day-description"
      >
        <DialogTitle sx={{ color: "black" }}>
          Spiel wirklich ändern?
          <IconButton
            aria-label="close"
            onClick={() => setOpenWarningMatchSameDayChange(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "orange" }}>
            Sie haben bereits ein Spiel an diesem Tag ausgemacht. Wollen Sie
            dennoch dieses Spiel auf diesen Termin verlegen?
          </DialogContentText>
          <DialogActions>
            <Button
              variant="outlined"
              color="warning"
              id="submitChangeSameDay"
              onClick={(e) => onSubmitUpdate(e)}
            >
              Anfrage trotzdem ändern
            </Button>
            <Button onClick={() => setOpenWarningMatchSameDayChange(false)}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Dialog: update own existing match */}
      <Dialog
        open={openUpdateMatchDialog}
        // onClose={handleUpdateClose}
        onClose={() => setOpenUpdateMatchDialog(false)}
        aria-labelledby="update-dialog-title"
        aria-describedby="update-dialog-description"
      >
        <DialogTitle id="update-dialog-title">
          Spielanfrage bearbeiten
          <IconButton
            aria-label="close"
            // onClick={handleUpdateClose}
            onClick={() => setOpenUpdateMatchDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent id="update-dialog-description">
          {/* <DialogContentText>
            Die aktuellen Daten: <br />
            {fixedUpdateData.updateDate} <br />
            {fixedUpdateData.updateTime} Uhr <br />
            {fixedUpdateData.updateDestination} <br />
            Hier können Sie Ihre Angaben ändern:
          </DialogContentText> */}
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={3}>
              Datum:
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                type="date"
                id="updateDate"
                // label="Datum"
                // value={updateData.date}
                value={updateMatchDate}
                name="date"
                // onChange={onChangeUpdate}
                onChange={onUpdateMatchDateChanged}
                InputProps={{
                  inputProps: { min: moment().format("YYYY-MM-DD") },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              Uhrzeit:
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                type="time"
                id="updateTime"
                // label="Uhrzeit"
                // value={updateData.time}
                value={updateMatchTime}
                name="time"
                // onChange={onChangeUpdate}
                onChange={onUpdateMatchTimeChanged}
              />
            </Grid>
            <Grid item xs={3}>
              Spielort:
            </Grid>
            <Grid item xs={9}>
              <TextField
                select
                required
                // fullWidth
                // label="Spielort"
                name="destination"
                id="updateDestination"
                // value={updateData.destination}
                value={updateMatchDestination}
                // onChange={onChangeUpdate}
                onChange={onUpdateMatchDestinationChanged}
              >
                <MenuItem value="H">Heim</MenuItem>
                <MenuItem value="A">Auswärts</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <DialogActions>
            <Button variant="outlined" onClick={(e) => onSubmitUpdate(e)}>
              Neue Daten bestätigen
            </Button>
            {/* <Button onClick={handleUpdateClose}>Abbrechen</Button> */}
            <Button onClick={() => setOpenUpdateMatchDialog(false)}>
              Abbrechen
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Dialog: see applicants of own games */}
      <Dialog
        open={openShowApplicantsDialog}
        onClose={handleCloseApplicants}
        // aria-labelledby="alert-dialog-title-applicants"
        // aria-describedby="alert-dialog-description-applicants"
      >
        <DialogTitle id="alert-dialog-title-applicants">
          {/* Sie haben folgende Bewerber auf Ihr Spiel:
           */}
          Bewerber:
          <IconButton
            aria-label="close"
            onClick={handleCloseApplicants}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent id="alert-dialog-description-applicants">
          <Grid container>
            {matchData.applicants.length > 0 ? (
              matchData.applicants.map((applicant, index) => (
                <Grid item key={index} xs={12}>
                  <DialogContentText>
                    {applicant.club}({applicant.name})
                    <IconButton
                      onClick={(e) => acceptMatch(e, applicant, matchData)}
                    >
                      <CheckIcon color="success" />
                    </IconButton>
                  </DialogContentText>
                  <Grid
                    item
                    sx={{ display: "none" }}
                    id="warningSameDayMatchApplicant"
                  >
                    <Typography sx={{ color: "orange" }}>
                      Sie haben bereits ein Testspiel an diesem Tag. Wollen Sie
                      trotzdem fortfahren?
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "none" }}
                    id="submitSameDayRequestApplicant"
                  >
                    <Button
                      variant="outlined"
                      color="warning"
                      sx={{ "&:hover": { backgroundColor: "orange" } }}
                      onClick={(e) => acceptMatch(e, applicant, matchData)}
                      id="submitButtonSameDayRequestApplicant"
                    >
                      Annehmen
                    </Button>
                    <Button onClick={handleCloseApplicants}>Abbrechen</Button>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid item>
                <DialogContentText>Keine Bewerber vorhanden</DialogContentText>
              </Grid>
            )}
          </Grid>
          <DialogActions>
            <Button
              onClick={handleCloseApplicants}
              id="closeSameDayRequestApplicant"
            >
              Schließen
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Dialog: submit delete one of own games */}
      <Dialog
        open={openDeleteMatchDialog}
        onClose={cancelDelete}
        // aria-labelledby="delete-match-title"
        // aria-describedby="warning-match-same-day-description"
      >
        <DialogTitle>
          Spielanfrage wirklich löschen?
          <IconButton
            aria-label="close"
            onClick={cancelDelete}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "red" }}>
            Sind Sie sicher, dass sie diese Spielanfrage löschen wollen?
          </DialogContentText>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleDelete}
              color="error"
              sx={{ "&:hover": { backgroundColor: "red" } }}
            >
              Ja, löschen
            </Button>
            <Button onClick={cancelDelete}>Abbrechen</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Dialog: submit ask match */}
      <Dialog open={openAskMatch} onClose={() => setOpenAskMatch(false)}>
        <DialogTitle>
          Spiel wirklich anfragen?
          <IconButton
            aria-label="close"
            onClick={() => setOpenAskMatch(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "orange" }}>
            Sind Sie sicher, dass sie dieses Spiel anfragen wollen?
          </DialogContentText>
          <DialogActions>
            <Button
              variant="outlined"
              color="warning"
              onClick={(e) => submitAskMatch(e)}
            >
              Anfragen
            </Button>
            <Button onClick={() => setOpenAskMatch(false)}>Abbrechen</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Matchplaner;
