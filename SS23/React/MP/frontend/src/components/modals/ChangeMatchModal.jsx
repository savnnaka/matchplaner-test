import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  DialogContentText,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import {
  updateMatchLoading,
  updateMatchSuccess,
  updateMatchError,
  deleteMatchError,
  deleteMatchLoading,
  deleteMatchSuccess,
} from "../../features/matchplaner/matchplanerActions";
import {
  updateMatch,
  deleteMatch,
} from "../../features/matchplaner/matchplanerAPI";
import moment from "moment";
import {
  locationSelection,
  fieldSelection,
  modusSelection,
} from "../../utils/filter";
import { Close as CloseIcon, Check as CheckIcon } from "@mui/icons-material";

export function ChangeMatchModal(props) {
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      props.handleClose();
    }
  };

  const handleClick = (event) => {
    const changeMatchDialog = document.getElementById("change-match-modal");
    if (event.target.firstChild.contains(changeMatchDialog)) {
      props.handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // submit match change

  const onSubmit = async (e) => {
    e.preventDefault();

    // // return true, if there is one match with the same date, else false
    // matchAtSameDay = matchesFixed.some((match) => {
    //   // return moment(new Date(match.date)).format("YYYY-MM-DD") === date;
    //   return moment(new Date(match.date)).format("YYYY-MM-DD") === newMatchDate;
    // });

    // // if the user confirms the match at the same day - create match
    // if (e.targe.id === "submitSameDayRequest") {
    //   matchAtSameDay = false;
    // }

    if (!props.match.date) {
      let dateRequired = document.getElementById("dateRequired");
      dateRequired.classList.add("visible");
    } else if (!props.match.time) {
      let timeRequired = document.getElementById("timeRequired");
      timeRequired.classList.add("visible");
    } else {
      props.handleClose();

      //TODO: es werden nicht alle userDaten benötigt
      const matchUpdated = {
        _id: props.match._id,
        emailAsId: props.user.email,
        opponentEmailAsId: "",
        updateMatchDate: props.match.date,
        updateMatchTime: props.match.time,
        updateMatchDestination: props.match.destination,
        updateMatchTypeOfField: props.match.typeOfField,
        updateMatchModus: props.match.modus,
        updateMatchNote: props.match.note,
        club: props.user.club,
        applicants: [],
        opponent: "",
        coachClub: props.user.name,
        coachOpponent: "",
        age: props.user.age,
        league: props.user.league,
        association: props.user.association,
        matched: false,
      };

      const userData = [props.user, matchUpdated, "update"];
      dispatch(updateMatchLoading());
      try {
        const response = await updateMatch(userData, props.token);
        console.log(response);
        dispatch(updateMatchSuccess());
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
    // else if (matchAtSameDay) {
    // if there is a match at the same day, show warnings (in the dialog)
    // document.getElementById("submitRequest").style.display = "none";
    // document.getElementById("warningSameDayMatch").style.display =
    //   "inline-block";
    // document.getElementById("submitSameDayRequest").style.display =
    //   "inline-block";
    // } else {
    // close dialog
  };

  //TODO: umschreiben -> Applicants Dialog
  const [matchData, setMatchData] = useState({
    applicants: [],
  });
  // init and handle dialog
  const [openShowApplicantsDialog, setOpenShowApplicantsDialog] =
    useState(false);
  const handleOpenApplicants = (match) => {
    setMatchData(match);
    setOpenShowApplicantsDialog(true);
  };
  const handleCloseApplicants = () => {
    setMatchData({
      applicants: [],
    });
    setOpenShowApplicantsDialog(false);
  };

  // accept this request (and decline all other applicants)
  // e=event, a=applicant, m=match
  const acceptMatch = async (e, a, m) => {
    // return true, if there is one match with the same date, else false
    // if the user confirms the match at the same day - fix match
    // if (e.target.id === "submitButtonSameDayRequestApplicant") {
    //   askMatchSameDayApplicant = false;
    // } else {
    //   askMatchSameDayApplicant = matchesFixed.some((match) => {
    //     return (
    //       moment(new Date(match.date)).format("YYYY-MM-DD") ===
    //       moment(new Date(m.date)).format("YYYY-MM-DD")
    //     );
    //   });
    // }
    // if (askMatchSameDayApplicant) {
    //   // if there is a match at the same day, show warnings (in the dialog)
    //   document.getElementById("closeSameDayRequestApplicant").style.display =
    //     "none";
    //   document.getElementById("warningSameDayMatchApplicant").style.display =
    //     "inline-block";
    //   document.getElementById("submitSameDayRequestApplicant").style.display =
    //     "inline-block";
    // } else {
    // close dialog
    setOpenShowApplicantsDialog(false);
    const userData = [props.user, m, "accept", a];
    dispatch(updateMatchLoading());
    try {
      const response = await updateMatch(userData, props.token);
      // dispatch(updateMatchSuccess(response.data));
      dispatch(updateMatchSuccess());
      // resetUpdateMatchData();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      updateMatchError(message);
    }
    // }
  };

  // TODO umschreiben -> delete dialog

  const [openDeleteMatchDialog, setOpenDeleteMatchDialog] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const deleteSubmit = (m) => {
    setDeleteData(m);
    setOpenDeleteMatchDialog(true);
  };

  // cancel delete request
  const cancelDelete = (m) => {
    setOpenDeleteMatchDialog(false);
    setDeleteData({});
  };

  const handleDelete = async (m) => {
    setOpenDeleteMatchDialog(false);
    const userData = [props.user, deleteData, "delete"];
    dispatch(deleteMatchLoading());
    console.log(userData);
    try {
      console.log("versuche jetzt spiel zu löschen.");
      const response = await deleteMatch(userData, props.token);
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

  return (
    <div className="change-match-modal" id="change-match-modal">
      <div className="change-match-content">
        <button className="esc-button" onClick={props.handleClose}>
          X
        </button>
        <h5>Matchinformationen ändern</h5>
        <div className="form-container form-flex">
          <TextField
            inputProps={{
              style: { textAlign: "center" },
            }}
            className="filter-input"
            type="date"
            name="date"
            value={moment(props.match.date).format("YYYY-MM-DD")}
            onChange={(e) => props.handleUpdate(e.target.name, e.target.value)}
          />
          <p id="dateRequired">Datum ist ein Pflichtfeld!</p>
          <TextField
            inputProps={{
              style: { textAlign: "center" },
            }}
            className="filter-input"
            type="time"
            name="time"
            value={props.match.time}
            onChange={(e) => props.handleUpdate(e.target.name, e.target.value)}
          />
          <p id="timeRequired">Zeit ist ein Pflichtfeld!</p>
          <FormControl fullWidth>
            <InputLabel>Spielort</InputLabel>
            <Select
              name="destination"
              label="Spielort"
              value={props.match.destination}
              onChange={(e) =>
                props.handleUpdate(e.target.name, e.target.value)
              }
            >
              <MenuItem key={0} value={""}>
                Wählen Sie eine Option
              </MenuItem>
              {locationSelection.map((option, idx) => (
                <MenuItem key={idx + 1} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Rasenart</InputLabel>
            <Select
              name="field"
              label="Rasenart"
              value={props.match.typeOfField}
              onChange={(e) =>
                props.handleUpdate(e.target.name, e.target.value)
              }
            >
              <MenuItem key={0} value={""}>
                Wählen Sie eine Option
              </MenuItem>
              {fieldSelection.map((option, idx) => (
                <MenuItem key={idx + 1} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Spielmodus</InputLabel>
            <Select
              name="modus"
              label="Spielmodus"
              value={props.match.modus}
              onChange={(e) =>
                props.handleUpdate(e.target.name, e.target.value)
              }
            >
              <MenuItem key={0} value={""}>
                Wählen Sie eine Option
              </MenuItem>
              {modusSelection.map((option, idx) => (
                <MenuItem key={idx + 1} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <textarea
            className="area-input"
            name="note"
            cols="30"
            rows="6"
            value={props.match.note}
            onChange={(e) => props.handleUpdate(e.target.name, e.target.value)}
          ></textarea>
          <button
            className="submit-button"
            style={{ marginBottom: ".5rem", marginTop: "0.5rem" }}
            onClick={onSubmit}
          >
            Änderungen speichern
          </button>
          <button
            className="submit-button"
            style={{ marginTop: "0", marginBottom: ".5rem" }}
            onClick={() => handleOpenApplicants(props.match)}
          >
            Bewerber ansehen
          </button>
          <button
            className="submit-button"
            style={{ marginTop: "0", marginBottom: "0" }}
            onClick={() => deleteSubmit(props.match)}
          >
            Spiel löschen
          </button>
        </div>
      </div>
      <Dialog open={openShowApplicantsDialog} onClose={handleCloseApplicants}>
        <DialogTitle id="alert-dialog-title-applicants">
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
            {props.match.applicants.length > 0 ? (
              props.match.applicants.map((applicant, index) => (
                <Grid item key={index} xs={12}>
                  <DialogContentText>
                    {applicant.club}({applicant.name})
                    <IconButton
                      onClick={(e) => acceptMatch(e, applicant, props.match)}
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
    </div>
  );
}
