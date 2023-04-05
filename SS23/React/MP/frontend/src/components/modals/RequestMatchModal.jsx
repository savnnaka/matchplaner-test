import {
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMatchLoading,
  updateMatchSuccess,
  updateMatchError,
} from "../../features/matchplaner/matchplanerActions";
import { updateMatch } from "../../features/matchplaner/matchplanerAPI";
import { RequestChangeModal } from "./RequestChangeModal";

export function RequestMatchModal(props) {
  const dispatch = useDispatch();
  const { matchesFixed } = useSelector((state) => state.matchplaner);
  const { user, token } = useSelector((state) => state.user);
  const { clubName } = useSelector((state) => state.club);

  const thisMatch = props.match;

  // submit ask for match
  const submitRequest = async (e) => {
    // return true, if there is one match with the same date, else false
    let requestMatchSameDay = matchesFixed.some((match) => {
      return (
        moment(new Date(match.date)).format("YYYY-MM-DD") ===
        moment(new Date(thisMatch.date)).format("YYYY-MM-DD")
      );
    });

    // close warning that there is already a match at that day, when user submits with info of this warning
    if (e.target.id === "submitAskSameDay") {
      requestMatchSameDay = false;

      //TODO: checken ob das notwendig ist
      // setzt das warn-div wieder auf hidden und zeigt den anfragen button wieder an
      let requestButton = document.getElementById("requestButton");
      requestButton.classList.remove("hidden");
      let warning = document.getElementById("warning-same-day");
      warning.classList.remove("visible");
      props.handleClose();
    }

    if (requestMatchSameDay) {
      //disable regular submit button
      let requestButton = document.getElementById("requestButton");
      requestButton.classList.add("hidden");
      //show div with warning and button
      let warning = document.getElementById("warning-same-day");
      warning.classList.add("visible");
    } else {
      const userData = [user, thisMatch, "ask"];
      dispatch(updateMatchLoading());
      try {
        const response = await updateMatch(userData, token);
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
  };

  const [requestChangesOpen, setRequestChangesOpen] = useState(false);

  const handleRequestChangeClose = () => {
    setRequestChangesOpen(false);
  };

  const handleRequestChangeOpen = () => {
    setRequestChangesOpen(true);
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullwidth="true"
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            backgroundColor: "#1E1F1F",
            border: "1px solid #D2FF00",
            borderRadius: "5px",
          }}
        >
          <DialogTitle sx={{ paddingTop: "2rem" }}>
            Match vereinbaren
          </DialogTitle>
          <Grid container justifyContent="center">
            <Grid container item xs={6} gap={2} justifyContent="center">
              <TextField
                variant="outlined"
                disabled
                label="Gegner"
                sx={{ marginTop: "1rem" }}
                value={thisMatch.matchOpponent}
              ></TextField>
              <TextField
                variant="outlined"
                disabled
                label="Alter"
                value={thisMatch.matchOpponentAge}
              ></TextField>
              <TextField
                variant="outlined"
                disabled
                label="Datum"
                value={moment(thisMatch.date).format("DD.MM.YYYY")}
              ></TextField>
              <TextField
                variant="outlined"
                disabled
                label="Uhrzeit"
                value={thisMatch.time}
              ></TextField>
              <TextField
                variant="outlined"
                disabled
                label="Spielstätte"
                value={
                  thisMatch.matchDestination
                    ? `Auswärts (${thisMatch.matchOpponent})`
                    : `Heim (${clubName})`
                }
              ></TextField>
              <TextField
                variant="outlined"
                disabled
                label="Spielmodus"
                value={thisMatch.typeOfGame}
              ></TextField>
              <TextField
                variant="outlined"
                disabled
                label="Platz"
                value={thisMatch.typeOfField}
              ></TextField>
              <Button
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  backgroundColor: "white",
                }}
                onClick={handleRequestChangeOpen}
              >
                Anpassen
              </Button>
              <Button
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
                id="requestButton"
                onClick={submitRequest}
              >
                Match anfragen
              </Button>
              <div id="warning-same-day">
                <p style={{ marginBottom: "0.5rem", color: "#dc3545" }}>
                  Du hast bereits ein Match für diesen Tag vereinbart.
                  <br />
                  Willst du dennoch fortfahren?
                </p>
                <Button
                  style={{
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                  id="submitAskSameDay"
                  onClick={submitRequest}
                >
                  Trotzdem anfragen
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <RequestChangeModal
        match={thisMatch}
        open={requestChangesOpen}
        handleUpdate={props.handleUpdate}
        handleClose={handleRequestChangeClose}
        handleSubmit={submitRequest}
      />
    </>
  );
}
