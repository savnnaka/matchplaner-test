import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  ListSubheader,
  IconButton,
  Container,
  Tooltip,
  Autocomplete,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { resetStatus } from "../features/user/userActions";
import { updateUser } from "../features/user/userAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Person,
  Delete,
  Edit,
  Groups,
  Help,
  Flag,
  ChangeCircle,
} from "@mui/icons-material";
import { allAges } from "../utils/ageAndLeague";

function Profile() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Profil";
  }, []);

  const { user, status, error } = useSelector((state) => state.user);
  const { clubName, logo, country, association } = useSelector(
    (state) => state.club
  );
  const { age, league } = useSelector((state) => state.team);

  const [newEmail, setNewEmail] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newLeague, setNewLeague] = useState("");
  const [newTelephone, setNewTelephone] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showNewPassword1, setShowNewPassword1] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [code, setCode] = useState("");

  const onChangeNewEmail = (e) => setNewEmail(e.target.value);
  const onChangeNewAge = (e) => setNewAge(e.target.value);
  const onChangeNewLeague = (e) => setNewLeague(e.target.value);
  const onChangeNewTelephone = (e) => setNewTelephone(e.target.value);
  const onChangeNewPassword1 = (e) => setNewPassword1(e.target.value);
  const onChangeNewPassword2 = (e) => setNewPassword2(e.target.value);
  const onChangeOldPassword = (e) => setOldPassword(e.target.value);
  const onChangeCode = (e) => setCode(e.target.value);

  // delete account
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // open dialog
  const handleOpenDelete = () => {
    setOpenDeleteDialog(true);
  };
  // close dialog
  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    // means dont delete - so just do nothing
  };
  // submit delete dialog
  const handleDelete = () => {
    setOpenDeleteDialog(false);

    // TODO
    // delete account
    // deleteUser()
    // onLogout()
  };

  // handle password dialog
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  // open password dialog
  const handleOpenPassword = () => {
    setOpenPasswordDialog(true);
  };
  // close password dialog
  const handleClosePassword = () => {
    setOpenPasswordDialog(false);
  };
  // submit change password via dialog
  const handleChangePassword = () => {
    let userData;
    if (newPassword1 !== newPassword2) {
      toast.error("Neue Passwörter stimmen nicht überein");
    } else {
      userData = {
        password: [newPassword1, oldPassword],
      };
      try {
        const response = updateUser(userData);
        // jwt und dispatch update
        handleClosePassword();
        setNewPassword1("");
        setNewPassword2("");
        setOldPassword("");
        setShowNewPassword1(false);
        setShowNewPassword2(false);
        setShowOldPassword(false);
        toast.success("Passwort erfolgreich geändert");
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    }
  };

  // handle league and age dialog
  const [openLeagueAgeDialog, setOpenLeagueAgeDialog] = useState(false);
  // open dialog
  const handleOpenLeagueAge = () => {
    setOpenLeagueAgeDialog(true);
  };
  // close dialog
  const handleCloseLeagueAge = () => {
    setOpenLeagueAgeDialog(false);
  };
  // submit change password via dialog
  const handleChangeLeagueAge = () => {
    let userData = {
      age,
      league,
    };
    try {
      const response = updateUser(userData);
      // jwt und dispatch update
      handleCloseLeagueAge();
      setNewAge("");
      setNewLeague("");
      toast.success("Team erfolgreich geändert");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  // change email
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  // open email dialog
  const handleOpenEmail = () => {
    setOpenEmailDialog(true);
  };
  // close email dialog
  const handleCloseEmail = () => {
    setOpenEmailDialog(false);
  };
  // submit change email via dialog
  const handleChangeEmail = () => {
    setOpenEmailDialog(false);
    const userData = {
      email: newEmail,
    };
    try {
      const response = updateUser(userData);
      // jwt und dispatch update
      // resend verification mail und emailVerified = false
      handleCloseEmail();
      setNewEmail("");
      toast.success("Email erfolgreich geändert");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  // change phone number
  const [openTelephoneDialog, setOpenTelephoneDialog] = useState(false);
  // open phone dialog
  const handleOpenTelephone = () => {
    setOpenTelephoneDialog(true);
  };
  // close email dialog
  const handleCloseTelephone = () => {
    setOpenTelephoneDialog(false);
  };
  // submit change phone via dialog
  const handleChangeTelephone = () => {
    setOpenEmailDialog(false);
    const userData = {
      telephone: newTelephone,
    };

    try {
      const response = updateUser(userData);
      // jwt und dispatch update
      handleCloseTelephone();
      setNewTelephone("");
      toast.success("Telefonnummer erfolgreich geändert");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  // change club
  const [openClubDialog, setOpenClubDialog] = useState(false);
  // open club dialog
  const handleOpenClub = () => {
    setOpenClubDialog(true);
  };
  // close club dialog
  const handleCloseClub = () => {
    setOpenClubDialog(false);
    // means dont delete - so just do nothing
  };
  // submit change club via dialog
  const handleChangeClub = () => {
    // check Code
    // if no team -> required team creation
    setOpenClubDialog(false);
    // localStorage aktualisieren
  };

  return (
    <Container>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />

      <Grid container direction="column" marginY={2} rowGap={3}>
        {/* user */}
        <Grid container alignItems="center">
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Person fontSize="large" />
            <Typography variant="largeLight">
              {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : user.role}
            </Typography>
            <IconButton onClick={handleOpenDelete}>
              <Delete sx={{ color: "red" }} />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={8}
            container
            justifyContent="center"
            columnSpacing={1}
            rowSpacing={1}
          >
            <Grid item>
              <TextField
                size="small"
                id="email"
                label="E-Mail"
                name="email"
                value={user.email ? user.email : ""}
                disabled
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleOpenEmail}>
                      <Edit />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="password"
                label="Passwort"
                name="password"
                value="Dein Passwort"
                disabled
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleOpenPassword}>
                      <Edit />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                id="phone"
                label="Telefon-/Handynummer"
                name="phone"
                value={user.telephone ? user.telephone : ""}
                disabled
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleOpenTelephone}>
                      <Edit />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* team */}
        <Grid container alignItems="center">
          <Grid
            item
            xs={8}
            container
            justifyContent="center"
            columnSpacing={1}
            rowSpacing={1}
          >
            <Grid item>
              <TextField
                size="small"
                label="Alter"
                id="age"
                name="age"
                value={age ? age.label : ""}
                type="text"
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                label="Liga"
                id="league"
                name="league"
                value={league ? league.label : ""}
                type="text"
                disabled
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Groups fontSize="large" />
            <Typography variant="largeLight">team</Typography>
            {!age && !league ? (
              <IconButton onClick={handleOpenLeagueAge}>
                <Edit />
              </IconButton>
            ) : (
              <IconButton>
                <Tooltip title="Alter und Liga können nur mit einem neuen Team angelegt werden (Wechsel oder neue Saison)">
                  <Help />
                </Tooltip>
              </IconButton>
            )}
          </Grid>
        </Grid>

        {/* club */}
        <Grid container alignItems="center">
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Flag fontSize="large" />
            <Typography variant="largeLight">
              {clubName ? clubName : "vereinslos"}
            </Typography>
            <IconButton onClick={handleOpenClub}>
              <ChangeCircle />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={8}
            container
            justifyContent="center"
            columnSpacing={1}
            rowSpacing={1}
          >
            <Grid item>
              <TextField
                size="small"
                label="Verband"
                id="association"
                name="association"
                value={association ? association : ""}
                type="text"
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                label="Land"
                id="country"
                name="country"
                value={country ? country : ""}
                type="text"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog for delete user */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Account löschen</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Willst Du Deinen Account (mit allen Matches und Trainings) wirklich
            endgültig löschen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Nein, nicht löschen</Button>
          <Button
            onClick={handleDelete}
            color="error"
            sx={{ "&:hover": { backgroundColor: "red" } }}
          >
            Ja, löschen
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for change email */}
      <Dialog open={openEmailDialog} onClose={handleCloseEmail}>
        <DialogTitle>E-Mail ändern</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hier kannst Du eine neue E-Mail Adresse angeben. Diese neue E-Mail
            Adresse muss dann erst noch bestätigt werden.
          </DialogContentText>
          <TextField
            helperText="Neue E-Mail Adresse"
            id="newEmail"
            name="newEmail"
            value={newEmail}
            type="email"
            onChange={onChangeNewEmail}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmail}>Abbruch</Button>
          <Button onClick={handleChangeEmail}>Ändern</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for change phone number */}
      <Dialog open={openTelephoneDialog} onClose={handleCloseTelephone}>
        <DialogTitle>Telefon-/Handynummer ändern</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hier kannst Du eine neue Telefon-/Handynummer angeben. Die Angabe
            ist nicht verpflichtend, erleichtert Dir aber die Kommunikation mit
            anderen Trainern (bei z.B. spontanter Spielabsage).
          </DialogContentText>
          <TextField
            helperText="Neue Telefon-/Handynummer"
            id="newTelephone"
            name="newTelephone"
            value={newTelephone}
            type="text"
            onChange={onChangeNewTelephone}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTelephone}>Abbruch</Button>
          <Button onClick={handleChangeTelephone}>Ändern</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for change team data */}
      <Dialog open={openLeagueAgeDialog} onClose={handleCloseLeagueAge}>
        <DialogTitle>Telefon-/Handynummer ändern</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lege das Alter und die Liga Deiner Mannschaft an. Diese kann jede
            Saison neu bestimmt werden.
          </DialogContentText>
          <Grid item container direction="column" mt={2}>
            {/* TODO: wenn kein club, dann Land und Verband */}
            <Grid item>
              <Autocomplete
                id="age"
                onChange={(event, age) => setNewAge(age)}
                options={allAges}
                renderOption={(props, option) => {
                  return <li {...props}>{option.label}</li>;
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Alter" />
                )}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                id="league"
                onChange={(event, league) => setNewLeague(league)}
                options={[{ label: "Kreisliga", value: 2 }]}
                renderOption={(props, option) => {
                  return <li {...props}>{option.label}</li>;
                }}
                renderInput={(params) => <TextField {...params} label="Liga" />}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLeagueAge}>Abbruch</Button>
          <Button onClick={handleChangeLeagueAge}>Ändern</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for update password */}
      <Dialog open={openPasswordDialog} onClose={handleClosePassword}>
        <DialogTitle>Passwort ändern</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hier kannst Du Dein Passwort ändern
          </DialogContentText>
          <TextField
            helperText="Neues Passwort"
            id="newPassword1"
            name="newPassword1"
            value={newPassword1}
            type={showNewPassword1 ? "text" : "password"}
            onChange={onChangeNewPassword1}
            inputProps={{
              autoComplete: "new-password",
            }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword1(!showNewPassword1)}
                  >
                    {showNewPassword1 ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            helperText="Neues Passwort bestätigen"
            id="newPassword2"
            name="newPassword2"
            value={newPassword2}
            type={showNewPassword2 ? "text" : "password"}
            onChange={onChangeNewPassword2}
            inputProps={{
              autoComplete: "new-password",
            }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword2(!showNewPassword2)}
                  >
                    {showNewPassword2 ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            helperText="Altes Passwort"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            type={showOldPassword ? "text" : "password"}
            onChange={onChangeOldPassword}
            inputProps={{
              autoComplete: "new-password",
            }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePassword}>Abbruch</Button>
          <Button onClick={handleChangePassword}>Passwort ändern</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for change club */}
      <Dialog open={openClubDialog} onClose={handleCloseClub}>
        <DialogTitle>Verein wechseln</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ordne Dich und Dein Team einem Verein zu. Dazu musst Du nur den vom
            Verein erhaltenen Code eingeben.
          </DialogContentText>

          <TextField
            helperText="Neuer Zugangscode"
            id="code"
            name="code"
            value={code}
            type="text"
            onChange={onChangeCode}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClub}>Abbruch</Button>
          <Button onClick={handleChangeClub}>Verein wechseln</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Profile;
