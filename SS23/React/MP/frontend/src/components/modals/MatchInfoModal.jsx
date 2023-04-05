import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  updateMatchError,
  updateMatchLoading,
  updateMatchSuccess,
} from "../../features/matchplaner/matchplanerActions";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { updateMatch } from "../../features/matchplaner/matchplanerAPI";
import { days } from "../../utils/constants/days";
import { months } from "../../utils/constants/months";

export function MatchInfoModal(props) {
  const dispatch = useDispatch();
  const { matchesFixed } = useSelector((state) => state.matchplaner);
  const { user, token } = useSelector((state) => state.user);
  const { teamId } = useSelector((state) => state.team);
  const { clubId } = useSelector((state) => state.club);

  const thisMatch = props.match;

  let day = new Date(thisMatch.date).getDay();
  let month = new Date(thisMatch.date).getMonth();

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
      const teamAndClubInfo = { clubId, teamId };
      const data = [teamAndClubInfo, thisMatch, "ask"];
      dispatch(updateMatchLoading());
      try {
        const response = await updateMatch(data, token);
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
          <DialogTitle sx={{ paddingTop: "2rem" }}>Spielansicht</DialogTitle>
          <Grid container justifyContent="center">
            <Grid container item xs={10} justifyContent="center" gap={3}>
              <Grid
                container
                item
                gap={9.5}
                justifyContent="center"
                sx={{ fontWeight: "700" }}
              >
                <Grid
                  item
                  xs={5}
                  sx={{
                    backgroundColor: "#d2ff00",
                    color: "black",
                    borderRadius: "10px",
                  }}
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      position: "relative",
                      top: "1rem",
                    }}
                  >
                    {days[day]}
                  </Typography>
                  <Typography sx={{ fontSize: "2.6rem" }}>
                    {thisMatch.date &&
                      thisMatch.date.split("T")[0].split("-")[2]}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      position: "relative",
                      top: "-1rem",
                    }}
                  >
                    {months[month]}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sx={{
                    backgroundColor: "#d2ff00",
                    color: "black",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      position: "relative",
                      top: "1rem",
                    }}
                  >
                    {thisMatch.destination
                      ? "Heim"
                      : !thisMatch.destination
                      ? "Auswärts"
                      : "Keine Angabe"}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "2.6rem",
                    }}
                  >
                    {thisMatch.time}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "1.6rem",
                      position: "relative",
                      top: "-1rem",
                    }}
                  >
                    Uhr
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                gap={1}
                sx={{
                  border: "1px solid #353838",
                  backgroundColor: "#1E1F1F",
                  borderRadius: "10px",
                  padding: "1rem 2rem",
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    style={{
                      textAlign: "left",
                      fontSize: "1.2rem",
                    }}
                  >
                    Spieldetails
                  </Typography>
                </Grid>
                <Grid container item xs={12}>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      textAlign: "left",
                      color: "#7A7C7C",
                    }}
                  >
                    <Typography>Spielmodus</Typography>
                    <Typography>Rasenart</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    sx={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    <Typography>
                      {thisMatch.typeOfGame !== ""
                        ? thisMatch.typeOfGame
                        : "Keine Angabe"}
                    </Typography>
                    <Typography>
                      {thisMatch.typeOfField !== ""
                        ? thisMatch.typeOfField
                        : "Keine Angabe"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <p
                    style={{
                      color: "#7A7C7C",
                    }}
                  >
                    Beschreibung
                  </p>
                  <p style={{ textAlign: "left", paddingLeft: "0.15rem" }}>
                    {thisMatch.info !== ""
                      ? thisMatch.info
                      : "Zu diesem Match stehen keine weiteren Informationen zur Verfügung..."}
                  </p>
                </Grid>
              </Grid>
              {/* <div
          style={{
            borderRadius: "10px",
            border: "1px solid gray",
            margin: "1rem 3rem",
          }}
        >
          <div style={{ textAlign: "left", margin: "1rem 2rem" }}>
            <p style={{ marginBottom: "1rem" }}>Spielstätte</p>
            <div>
              <p>Name</p>
              <p>Straße + Hausnummer</p>
              <p>PLZ + Ort</p>
            </div>
          </div>
        </div> */}
              <Grid
                item
                container
                gap={1}
                sx={{
                  border: "1px solid #353838",
                  backgroundColor: "#1E1F1F",
                  borderRadius: "10px",
                  padding: "1rem 2rem",
                }}
              >
                <Grid item xs={12}>
                  <p style={{ textAlign: "left", fontSize: "1.2rem" }}>
                    Teaminfo
                  </p>
                </Grid>
                <Grid item container>
                  <Grid
                    item
                    xs={4}
                    sx={{ textAlign: "left", color: "#7A7C7C" }}
                  >
                    <p>Verein</p>
                    <p>Alter</p>
                    <p>Spielklasse</p>
                    {/* <p>Stadt:</p>
              <p>Verband: </p>
              <p>Fussball.de:</p> */}
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    sx={{ paddingLeft: "1rem", textAlign: "left" }}
                  >
                    {" "}
                    <p>{thisMatch.matchOpponent}</p>
                    <p>{thisMatch.matchOpponentAge}</p>
                    <p>{thisMatch.matchOpponentLeague} </p>
                    {/* <p>Reutlingen</p>
            <p>WFV </p>
            <p>https://link.de</p> */}
                  </Grid>
                </Grid>
              </Grid>
              {props.hideRequestBtn === false && (
                <Button
                  className="submit-button"
                  id="requestMatchBtn"
                  onClick={submitRequest}
                  sx={{ margin: "1rem 0" }}
                >
                  Match anfragen
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
