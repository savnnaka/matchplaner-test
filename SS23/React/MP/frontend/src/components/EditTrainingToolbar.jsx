import {
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  createTrainingLoading,
  createTrainingSuccess,
  createTrainingError,
} from "../features/trainingsplaner/trainingsplanerActions";
import { createTraining } from "../features/trainingsplaner/trainingsplanerAPI";
import {
  updateLoading,
  updateSuccess,
  updateError,
} from "../features/user/userActions";
import { updateUser } from "../features/user/userAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectSearch from "react-select-search";
import {
  Close as CloseIcon,
  AddCircleOutline,
  Edit,
  PlayArrow,
  Replay,
  BookmarkAdd,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import $ from "jquery";
import {
  setNewTab,
  setNewUnitInfo,
} from "../features/trainingsplaner/trainingsplanerActions";

function EditTrainingToolbar() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const { status, unit, unitInfo } = useSelector(
    (state) => state.trainingsplaner
  );

  // input values
  const [time, setTime] = useState(2); // 0 = 45, 1 = 60, 2 = 90, 3 = 120
  const [player, setPlayer] = useState(12);
  const [goalkeeper, setGoalkeeper] = useState(1);
  const [focus, setFocus] = useState("Zufällig");

  // handle input changes
  const onTimeChanged = (e) => setTime(e.target.value);
  const onPlayerChanged = (e) => setPlayer(e.target.value);
  const onGoalkeeperChanged = (e) => setGoalkeeper(e.target.value);
  const onFocusChanged = (e) => setFocus(e);

  useEffect(() => {
    if (unitInfo) {
      // set infos of saved unit
      setTime(unitInfo.duration);
      setPlayer(unitInfo.player);
      setGoalkeeper(unitInfo.goalkeeper);
      setFocus(unitInfo.focus);
      setFocusDialog(unitInfo.focus);
    }
  }, [unitInfo]);

  // create array of possible amounts of players
  const minPlayers = 4;
  const maxPlayers = 40;
  const arrayMenuItemsPlayers = [];
  for (let index = minPlayers; index < maxPlayers; index++) {
    arrayMenuItemsPlayers.push(index);
  }

  // create array of possible amounts of goalkeepers
  const minPlayersGk = 0;
  const maxPlayersGk = 10;
  const arrayMenuItemsGoalkeepers = [];
  for (let index = minPlayersGk; index < maxPlayersGk; index++) {
    arrayMenuItemsGoalkeepers.push(index);
  }

  // create array of focus
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

  const optionsFocusSearch = [
    {
      value: "Bewegungsschnelligkeit",
      name: "Bewegungsschnelligkeit",
    },
    {
      value: "Aktionsschnelligkeit",
      name: "Aktionsschnelligkeit",
    },
    {
      value: "Antrittsschnelligkeit",
      name: "Antrittsschnelligkeit",
    },
    {
      value: "Sprungkraft",
      name: "Sprungkraft",
    },
    {
      value: "Schnellkraft",
      name: "Schnellkraft",
    },
    {
      value: "Kraft",
      name: "Kraft",
    },
    {
      value: "Schnelligkeitsausdauer",
      name: "Schnelligkeitsausdauer",
    },
    {
      value: "Kurzzeitausdauer",
      name: "Kurzzeitausdauer",
    },
    {
      value: "Mittelzeitausdauer",
      name: "Mittelzeitausdauer",
    },
    {
      value: "Langzeitausdauer",
      name: "Langzeitausdauer",
    },
    {
      value: "Reaktion",
      name: "Reaktion",
    },
    {
      value: "Umstellung",
      name: "Umstellung",
    },
    {
      value: "Orientierung",
      name: "Orientierung",
    },
    {
      value: "Vororientierung",
      name: "Vororientierung",
    },
    {
      value: "Differenzierung",
      name: "Differenzierung",
    },
    {
      value: "Kopplung",
      name: "Kopplung",
    },
    {
      value: "Rhythmisierung",
      name: "Rhythmisierung",
    },
    {
      value: "Gleichgewicht",
      name: "Gleichgewicht",
    },
    {
      value: "Beweglichkeit",
      name: "Beweglichkeit",
    },
    {
      value: "Ballannahme",
      name: "Ballannahme",
    },
    {
      value: "Passtechnik",
      name: "Passtechnik",
    },
    {
      value: "Dribbling",
      name: "Dribbling",
    },
    {
      value: "Schusstechnik",
      name: "Schusstechnik",
    },
    {
      value: "Zweikampfverhalten",
      name: "Zweikampfverhalten",
    },
    {
      value: "Ballkontrolle",
      name: "Ballkontrolle",
    },
    {
      value: "Offene Stellung",
      name: "Offene Stellung",
    },
    {
      value: "Finten",
      name: "Finten",
    },
    {
      value: "Kopfball",
      name: "Kopfball",
    },
    {
      value: "Flanken",
      name: "Flanken",
    },
    {
      value: "Freilaufverhalten",
      name: "Freilaufverhalten",
    },
    {
      value: "Kreuzen",
      name: "Kreuzen",
    },
    {
      value: "Gegengleiche Laufwege",
      name: "Gegengleiche Laufwege",
    },
    {
      value: "Hinterlaufen",
      name: "Hinterlaufen",
    },
    {
      value: "Tiefenläufe",
      name: "Tiefenläufe",
    },
    {
      value: "Halbräume",
      name: "Halbräume",
    },
    {
      value: "Boxbesetzung",
      name: "Boxbesetzung",
    },
    {
      value: "Positionswechsel",
      name: "Positionswechsel",
    },
    {
      value: "Überladen",
      name: "Überladen",
    },
    {
      value: "Ballzirkulation",
      name: "Ballzirkulation",
    },
    {
      value: "Spielverlagerung",
      name: "Spielverlagerung",
    },
    {
      value: "Spiel in die Tiefe",
      name: "Spiel in die Tiefe",
    },
    {
      value: "Schnittstellenpass",
      name: "Schnittstellenpass",
    },
    {
      value: "Diago/Flugball",
      name: "Diago/Flugball",
    },
    {
      value: "Gezielter Fehlpass",
      name: "Gezielter Fehlpass",
    },
    {
      value: "Spiel über den Dritten",
      name: "Spiel über den Dritten",
    },
    {
      value: "Doppelpass",
      name: "Doppelpass",
    },
    {
      value: "Stützpässe",
      name: "Stützpässe",
    },
    {
      value: "1-vs-1(off)",
      name: "1-vs-1(off)",
    },
    {
      value: "Überzahl",
      name: "Überzahl",
    },
    {
      value: "Spielaufbau",
      name: "Spielaufbau",
    },
    {
      value: "Flügelspiel",
      name: "Flügelspiel",
    },
    {
      value: "Bälle festmachen",
      name: "Bälle festmachen",
    },
    {
      value: "Torabschluss",
      name: "Torabschluss",
    },
    {
      value: "Distanzschüsse",
      name: "Distanzschüsse",
    },
    {
      value: "Kopfbälle",
      name: "Kopfbälle",
    },
    {
      value: "Abschlüsse",
      name: "Abschlüsse",
    },
    {
      value: "Konter",
      name: "Konter",
    },
    {
      value: "Ballsicherung",
      name: "Ballsicherung",
    },
    {
      value: "Gegenpressing",
      name: "Gegenpressing",
    },
    {
      value: "Kontersicherung",
      name: "Kontersicherung",
    },
    {
      value: "Umschaltspiel",
      name: "Umschaltspiel",
    },
    {
      value: "1-vs-1(def)",
      name: "1-vs-1(def)",
    },
    {
      value: "Unterzahl",
      name: "Unterzahl",
    },
    {
      value: "Abwehrkopfbälle",
      name: "Abwehrkopfbälle",
    },
    {
      value: "Viererkette",
      name: "Viererkette",
    },
    {
      value: "Dreierkette",
      name: "Dreierkette",
    },
    {
      value: "Fünferkette",
      name: "Fünferkette",
    },
    {
      value: "Verschieben",
      name: "Verschieben",
    },
    {
      value: "Angriffspressing",
      name: "Angriffspressing",
    },
    {
      value: "Mittelfeldpressing",
      name: "Mittelfeldpressing",
    },
    {
      value: "Abwehrpressing",
      name: "Abwehrpressing",
    },
    {
      value: "Pressing",
      name: "Pressing",
    },
    {
      value: "Doppeln",
      name: "Doppeln",
    },
    {
      value: "Manndeckung",
      name: "Manndeckung",
    },
    {
      value: "Raumdeckung",
      name: "Raumdeckung",
    },
  ];

  // custom filter of search field
  // if query is emtpy, then show only important focus, else all that matches
  const handleFilter = (options) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        // add chosen focus to options so it will be displayed
        let lessOptions = optionsFocus;
        // check if focus is already in the return array
        let focusDialogIsIncluded = lessOptions.some(
          (obj) => obj.name === focusDialog
        );
        if (!focusDialogIsIncluded) {
          lessOptions.push({ value: focusDialog, name: focusDialog });
        }
        return lessOptions;
      }
      const updatedItems = options.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      return updatedItems;
    };
  };

  const [openFocusDialog, setOpenFocusDialog] = useState(false);
  // const [focusDialog, setFocusDialog] = useState("Zufällig");
  const [focusDialog, setFocusDialog] = useState(focus);
  const onFocusDialogChanged = (e) => setFocusDialog(e);

  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [saveUnitDate, setSaveUnitDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [saveUnitTime, setSaveUnitTime] = useState("19:00");
  const [saveUnitTitle, setSaveUnitTitle] = useState("");

  const onChangeSaveUnitDate = (e) => {
    setSaveUnitDate(e.target.value);
  };
  const onChangeSaveUnitTime = (e) => {
    setSaveUnitTime(e.target.value);
  };
  const onChangeSaveUnitTitle = (e) => {
    setSaveUnitTitle(e.target.value);
  };

  // save the calculated training under coach
  const saveTraining = async () => {
    let unitToSave = {
      // exercises,
      exercises: unit,
      player,
      goalkeeper,
      focus,
      date: saveUnitDate,
      time: saveUnitTime,
      title: saveUnitTitle,
      duration: time,
    };
    let updateData = { emailUser: user.email, unitToSave };
    try {
      dispatch(updateLoading());
      const newUser = await updateUser(updateData, token);
      // console.log(newUser);
      // reset form
      setSaveUnitDate(moment(new Date()).format("YYYY-MM-DD"));
      setSaveUnitTime("19:00");
      setSaveUnitTitle("");
      // update successful, dispatch action to store
      dispatch(updateSuccess(newUser));
      // open tab with saved units
      dispatch(setNewTab(2));
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

  // create training with filter/infos of form
  const getTraining = async () => {
    if (time === "" || player === "" || goalkeeper === "") {
      toast.error("Bitte alle Felder ausfüllen");
    } else {
      let randomFocus;

      // if focus is general, set to specific values
      let focusArray = [];
      if (focus === "Technik") {
        focusArray = ["Passtechnik", "Ballannahme", "Ballkontrolle"];
      } else if (focus === "Kondition") {
        focusArray = [
          "Schnelligkeitsausdauer",
          "Kurzzeitausdauer",
          "Mittelzeitausdauer",
          "Langzeitausdauer",
        ];
      } else if (focus === "Koordination") {
        focusArray = ["Bewegungsschnelligkeit", "Rhythmisierung"];
      } else if (focus === "Pressing") {
        focusArray = ["Gegenpressing", "Pressing", "Doppeln"];
      } else if (focus === "Zufällig") {
        // choose random focus
        let randomIndex = Math.floor(Math.random() * optionsFocus.length);
        if (randomIndex === 0) {
          randomIndex = 1;
        }
        randomFocus = optionsFocus[randomIndex].value;

        // randomFocus =
        //   optionsFocusSearch[
        //     Math.floor(Math.random() * optionsFocusSearch.length)
        //   ].value;
        setFocus(randomFocus);
        focusArray = [randomFocus];
      } else {
        // pass focus string in array
        focusArray = [focus];
      }

      let filter = [
        user.age.value,
        user.league.value,
        player,
        goalkeeper,
        3 + time, // to get amount of exs
        focusArray,
      ];

      try {
        dispatch(createTrainingLoading());
        const response = await createTraining(filter, token);
        // console.log(response);
        dispatch(createTrainingSuccess(response));
        let unitInfo;
        // save info of training in store so they are present even after reload
        randomFocus
          ? (unitInfo = {
              player,
              goalkeeper,
              duration: time,
              focus: randomFocus,
            })
          : (unitInfo = {
              player,
              goalkeeper,
              duration: time,
              focus,
            });

        dispatch(setNewUnitInfo({ unitInfo }));
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(createTrainingError(message));
      }
    }
  };

  return (
    <>
      <Grid container my={2} alignItems="center">
        {/* properties */}
        <Grid
          item
          xs={12}
          tablet={9}
          container
          justifyContent="space-between"
          columnSpacing={1}
          rowSpacing={1}
        >
          {/* time */}
          <Grid item xs>
            <TextField
              select
              // label="Trainingszeit (in min)"
              label="Dauer (min)"
              name="time"
              id="time"
              value={time}
              onChange={onTimeChanged}
              SelectProps={{
                style: { fontSize: "13px" },
              }}
            >
              <MenuItem value="" disabled>
                Trainingszeit auswählen
              </MenuItem>
              <MenuItem value={3}>120</MenuItem>
              <MenuItem value={2}>90</MenuItem>
              <MenuItem value={1}>60</MenuItem>
              <MenuItem value={0}>45</MenuItem>
            </TextField>
          </Grid>
          {/* players */}
          <Grid item xs>
            <TextField
              select
              label="Feldspieler"
              name="player"
              id="player"
              value={player}
              onChange={onPlayerChanged}
              SelectProps={{
                style: { fontSize: "13px" },
              }}
            >
              <MenuItem value="" disabled>
                Spieleranzahl auswählen
              </MenuItem>
              {arrayMenuItemsPlayers.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* goalkeeper */}
          <Grid item xs>
            <TextField
              select
              label="Torspieler"
              name="goalkeeper"
              id="goalkeeper"
              value={goalkeeper}
              onChange={onGoalkeeperChanged}
              SelectProps={{
                style: { fontSize: "13px" },
              }}
            >
              <MenuItem value="" disabled>
                Torspieleranzahl auswählen
              </MenuItem>
              {arrayMenuItemsGoalkeepers.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* focus */}
          <Grid item xs>
            <TextField
              label="Schwerpunkt"
              InputLabelProps={{
                style: {
                  shrink: true,
                },
              }}
              value={focus}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setOpenFocusDialog(true)}>
                    {focus === "Zufällig" ? <AddCircleOutline /> : <Edit />}
                  </IconButton>
                ),
                readOnly: true,
                style: { fontSize: "13px", cursor: "default" },
              }}
              inputProps={
                {
                  // style: { padding: "10px", cursor: "default" },
                }
              }
              sx={
                {
                  // opacity: focus === "Zufällig" ? 0.5 : 1,
                  // width: isTiny ? "200px" : "initial",
                }
              }
            />
          </Grid>
        </Grid>

        {/* buttons */}
        <Grid item xs container justifyContent="space-evenly">
          <Tooltip title="Training neu laden">
            <span>
              <IconButton
                onClick={getTraining}
                sx={{ border: "1px solid var(--lightgreen)" }}
              >
                <PlayArrow />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Training ähnlich laden">
            <span>
              <IconButton
                onClick={() => console.log("In Arbeit")}
                sx={{
                  border:
                    unit.length === 0
                      ? "1px solid var(--lightgray)"
                      : "1px solid var(--lightgreen)",
                }}
                disabled={unit.length === 0}
              >
                <Replay />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Training speichern">
            <span>
              <IconButton
                onClick={() => setOpenSaveDialog(true)}
                sx={{
                  border:
                    unit.length === 0
                      ? "1px solid var(--lightgray)"
                      : "1px solid var(--lightgreen)",
                }}
                disabled={unit.length === 0}
              >
                <BookmarkAdd />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      </Grid>

      {/* set focus dialog */}
      <Dialog
        open={openFocusDialog}
        onClose={() => setOpenFocusDialog(false)}
        sx={{ height: "100%" }}
      >
        <DialogTitle>
          Schwerpunkt wählen
          <IconButton
            aria-label="close"
            onClick={() => setOpenFocusDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ height: "100%" }}>
          <Grid
            container
            justifyContent="flex-start"
            direction="column"
            sx={{ height: "100%" }}
          >
            <Grid item>
              <Typography>Wähle deinen Schwerpunkt aus:</Typography>
            </Grid>
            <Grid item>
              <SelectSearch
                // options={optionsFocusSearch}
                options={optionsFocus}
                printOptions="always"
                filterOptions={handleFilter}
                value={focusDialog}
                name="focusDialog"
                id="focusDialog"
                // label="Schwerpunkt"
                // placeholder={focusDialog ? focusDialog : "Zufällig"}
                defaultValue="Zufällig"
                search
                onChange={onFocusDialogChanged}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFocusDialog(false)}>Abbrechen</Button>
          <Button
            onClick={() => {
              setFocus(focusDialog);
              setOpenFocusDialog(false);
            }}
          >
            Bestätigen
          </Button>
        </DialogActions>
      </Dialog>
      {/* save unit dialog */}
      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
        <DialogTitle>
          Einheit speichern
          <IconButton
            aria-label="close"
            onClick={() => setOpenSaveDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Titel */}
          <TextField
            type="text"
            id="saveUnitTitle"
            value={saveUnitTitle}
            name="saveUnitTitle"
            onChange={onChangeSaveUnitTitle}
          />
          <Typography>
            Willst Du diese Einheit direkt einem Tag zuordnen?
          </Typography>
          {/* Datum */}
          <TextField
            type="date"
            id="saveUnitDate"
            value={saveUnitDate}
            name="saveUnitDate"
            onChange={onChangeSaveUnitDate}
            InputProps={{
              inputProps: { min: moment().format("YYYY-MM-DD") },
            }}
          />
          {/* Uhrzeit */}
          <TextField
            type="time"
            id="saveUnitTime"
            value={saveUnitTime}
            name="saveUnitTime"
            onChange={onChangeSaveUnitTime}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveTraining}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditTrainingToolbar;
