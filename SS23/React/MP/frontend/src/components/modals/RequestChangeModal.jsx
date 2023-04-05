import {
  TextField,
  MenuItem,
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  Grid,
} from "@mui/material";
import moment from "moment";
import { gamesTypes } from "../../utils/constants/gamesTypes";
import { fieldTypes } from "../../utils/constants/fieldTypes";
export function RequestChangeModal(props) {
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
            Spieldaten anpassen
          </DialogTitle>
          <Grid container justifyContent="center">
            <Grid container item xs={6} gap={2} justifyContent="center">
              <TextField
                type="date"
                name="date"
                label="Datum"
                variant="outlined"
                sx={{ marginTop: "1rem" }}
                value={moment(props.match.date).format("YYYY-MM-DD")}
                onChange={(e) => {
                  props.handleUpdate(e.target.name, e.target.value);
                }}
              />
              <TextField
                type="time"
                name="time"
                label="Uhrzeit"
                variant="outlined"
                value={props.match.time}
                onChange={(e) => {
                  props.handleUpdate(e.target.name, e.target.value);
                }}
              />
              <TextField
                select
                name="destination"
                label="Spielort"
                variant="outlined"
                value={props.match.destination}
                onChange={(e) => {
                  props.handleUpdate(e.target.name, e.target.value);
                }}
              >
                <MenuItem key="Heim" value="Heim">
                  Heim
                </MenuItem>
                <MenuItem key="Auswärts" value="Auswärts">
                  Auswärts
                </MenuItem>
              </TextField>
              <TextField
                select
                name="field"
                label="Rasenart"
                variant="outlined"
                value={props.match.typeOfField}
                onChange={(e) => {
                  props.handleUpdate(e.target.name, e.target.value);
                }}
              >
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
                value={props.match.modus}
                onChange={(e) => {
                  props.handleUpdate(e.target.name, e.target.value);
                }}
              >
                {gamesTypes.map((option, idx) => (
                  <MenuItem key={idx + 1} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  backgroundColor: "white",
                }}
                onClick={props.handleClose}
              >
                Abbrechen
              </Button>
              <Button
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
                id="requestButton"
                onClick={props.handleSubmit}
              >
                Änderungen anfragen
              </Button>
              <div id="warning-same-day">
                <p style={{ marginBottom: "0.5rem", color: "#dc3545" }}>
                  Du hast bereits ein Match für diesen Tag vereinbart.
                  <br />
                  Willst du dennoch fortfahren?
                </p>
                <Button
                  className="submit-button requestButton"
                  style={{
                    width: "100%",
                    margin: "0 0 1rem 0",
                    cursor: "pointer",
                  }}
                  id="requestButton"
                  onClick={props.handleSubmit}
                >
                  Trotzdem anfragen
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
