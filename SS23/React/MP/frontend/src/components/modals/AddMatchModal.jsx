import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
} from "@mui/material";
import {
  createMatchLoading,
  createMatchError,
  createMatchSuccess,
} from "../../features/matchplaner/matchplanerActions";
import { createMatch } from "../../features/matchplaner/matchplanerAPI";
import { gamesTypes } from "../../utils/constants/gamesTypes";
import { fieldTypes } from "../../utils/constants/fieldTypes";

export function AddMatchModal(props) {
  // getting the necessary state information
  const { token } = useSelector((state) => state.user);
  const { teamId, age, league } = useSelector((state) => state.team);
  const { clubId, facilities } = useSelector((state) => state.club);

  const dispatch = useDispatch();

  // init state of input fields
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [matchDestination, setMatchDestination] = useState("");
  const [matchFacility, setMatchFacility] = useState("");
  const [matchField, setMatchField] = useState("");
  const [matchType, setMatchType] = useState("");
  const [matchInfo, setMatchInfo] = useState("");

  // defining input field change handler functions
  const handleMatchDateChange = (e) => {
    setMatchDate(e.target.value);
    let dateRequired = document.getElementById("dateRequired");
    if (dateRequired.classList.contains("visible")) {
      dateRequired.classList.remove("visible");
    }
  };
  const handleMatchTime = (e) => {
    setMatchTime(e.target.value);
    let timeRequired = document.getElementById("timeRequired");
    if (timeRequired.classList.contains("visible")) {
      timeRequired.classList.remove("visible");
    }
  };
  const handleMatchDestinationChange = (e) =>
    setMatchDestination(e.target.value);
  const handleMatchFacilityChange = (e) => setMatchFacility(e.target.value);
  const handleMatchFieldChange = (e) => setMatchField(e.target.value);
  const handleMatchTypeChange = (e) => setMatchType(e.target.value);
  const handleMatchInfoChange = (e) => setMatchInfo(e.target.value);

  /**
   * This method resets all input fields to the initial state
   */
  const resetForm = () => {
    setMatchDate("");
    setMatchTime("");
    setMatchDestination("");
    setMatchFacility("");
    setMatchField("");
    setMatchType("");
    setMatchInfo("");
    let teamInfoRequired = document.getElementById("teamInfoRequired");
    if (teamInfoRequired.classList.contains("visible")) {
      teamInfoRequired.classList.remove("visible");
    }
    let dateRequired = document.getElementById("dateRequired");
    if (dateRequired.classList.contains("visible")) {
      dateRequired.classList.remove("visible");
    }
    let timeRequired = document.getElementById("timeRequired");
    if (timeRequired.classList.contains("visible")) {
      timeRequired.classList.remove("visible");
    }
    let facilityInfo = document.getElementById("facilityInfo");
    if (facilityInfo.classList.contains("visible")) {
      facilityInfo.classList.remove("visible");
    }
  };

  /**
   * This method submits the form and calls the createMatch function
   * @param {Event} e - Event
   */
  const onSubmit = async (e) => {
    e.preventDefault();

    // // return true, if there is one match with the same date, else false
    // matchAtSameDay = matchesFixed.some((match) => {
    //   // return moment(new Date(match.date)).format("YYYY-MM-DD") === date;
    //   return moment(new Date(match.date)).format("YYYY-MM-DD") === newMatchDate;
    // });

    // // if the user confirms the match at the same day - create match
    // if (e.target.id === "submitSameDayRequest") {
    //   matchAtSameDay = false;
    // }
    const facilityAvailable = facilities.filter(
      (facility) => facility.available
    );

    // checks if any information is missing
    if (
      !matchDate ||
      !matchTime ||
      !age ||
      !league ||
      (matchDestination === "Heim" && (!facilities || facilityAvailable))
    ) {
      if (!matchDate) {
        let dateRequired = document.getElementById("dateRequired");
        dateRequired.classList.add("visible");
      }
      if (!matchTime) {
        let timeRequired = document.getElementById("timeRequired");
        timeRequired.classList.add("visible");
      }
      if (
        !age ||
        !league
        // || !association
      ) {
        let teamInfoRequired = document.getElementById("teamInfoRequired");
        teamInfoRequired.classList.add("visible");
      }
      if (matchDestination === "Heim" && (!facilities || facilityAvailable)) {
        let facilityInfo = document.getElementById("facilityInfo");
        facilityInfo.classList.add("visible");
      }
    } else {
      const matchData = {
        gameDate: matchDate,
        gameTime: matchTime,
        destination: matchDestination,
        facilityId: matchFacility,
        typeOfField: matchField,
        typeOfGame: matchType,
        info: matchInfo,
        preferredAge: "",
        preferredLeague: "",
        preferredRating: "",
        teamId: teamId,
        clubId: clubId,
      };

      dispatch(createMatchLoading());
      try {
        const response = await createMatch(matchData, token);
        dispatch(createMatchSuccess());
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        createMatchError(message);
      }
      handleClose();
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

  /**
   * This method handles closing the dialog and calls the resetForm function
   */
  const handleClose = () => {
    props.handleClose();
    resetForm();
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullwidth="true"
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            backgroundColor: "#1E1F1F",
            border: "1px solid #D2FF00",
            borderRadius: "5px",
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <DialogTitle sx={{ paddingTop: "2rem" }}>
            Neue Anfrage erstellen
          </DialogTitle>
          <Grid container justifyContent="center">
            <Grid container item xs={6} gap={2} justifyContent="center">
              <p id="teamInfoRequired">
                Bitte füllen Sie zuerst Ihr Profil aus!
              </p>
              <TextField
                required
                label="Datum"
                type="date"
                name="date"
                variant="outlined"
                value={matchDate}
                onChange={handleMatchDateChange}
                sx={{ marginTop: "1rem" }}
              />
              <p id="dateRequired">Datum ist ein Pflichtfeld!</p>
              <TextField
                required
                label="Uhrzeit"
                type="time"
                name="time"
                variant="outlined"
                value={matchTime}
                onChange={handleMatchTime}
              />
              <p id="timeRequired">Zeit ist ein Pflichtfeld!</p>
              <TextField
                select
                label="Spielort"
                name="destination"
                variant="outlined"
                value={matchDestination}
                onChange={handleMatchDestinationChange}
              >
                <MenuItem key={0} value={""}>
                  Wählen Sie eine Option
                </MenuItem>
                <MenuItem key="Heim" value="Heim">
                  Heim
                </MenuItem>
                <MenuItem key="Auswärts" value="Auswärts">
                  Auswärts
                </MenuItem>
              </TextField>
              <p id="facilityInfo">
                Ihr Verein hat keinen Platz hinterlegt oder es sind momentan
                alle Plätze gesperrt.
              </p>
              <TextField
                select
                label="Platzwahl"
                name="facility"
                variant="outlined"
                value={matchFacility}
                onChange={handleMatchFacilityChange}
                hidden={matchDestination !== "Heim"}
                required={matchDestination === "Heim"}
              >
                <MenuItem key={0} value={""}>
                  Wählen Sie eine Option
                </MenuItem>
                {facilities.map((facility, idx) => (
                  <MenuItem key={idx + 1} value={facility.typeOfField}>
                    {facility.typeOfField}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                name="field"
                label="Rasenart"
                variant="outlined"
                value={matchField}
                onChange={handleMatchFieldChange}
                hidden={matchDestination === "Heim"}
              >
                <MenuItem key={0} value={""}>
                  Wählen Sie eine Option
                </MenuItem>
                {fieldTypes.map((option, idx) => (
                  <MenuItem key={idx + 1} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                name="modus"
                label="Spielmodus"
                variant="outlined"
                value={matchType}
                onChange={handleMatchTypeChange}
              >
                <MenuItem key={0} value={""}>
                  Wählen Sie eine Option
                </MenuItem>
                {gamesTypes.map((option, idx) => (
                  <MenuItem key={idx + 1} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                multiline
                variant="outlined"
                rows={6}
                label="Weitere Informationen"
                value={matchInfo}
                onChange={handleMatchInfoChange}
              ></TextField>
              <Button
                variant="contained"
                // className="submit-button"
                onClick={onSubmit}
              >
                Anfrage erstellen
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
