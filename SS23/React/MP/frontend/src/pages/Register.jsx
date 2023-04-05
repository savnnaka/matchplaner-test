import {
  Typography,
  MenuItem,
  ListSubheader,
  TextField,
  Box,
  Button,
  Grid,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  SvgIcon,
  Tooltip,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Container,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkRegistrationCode, register } from "../features/user/userAPI";
import {
  registerCodeValidationLoading,
  registerCodeValidationSuccess,
  registerCodeValidationError,
  registerLoading,
  registerSuccess,
  registerError,
} from "../features/user/userActions";
import SpinnerLogo from "../components/SpinnerLogo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerifiedUser, LockOpen, CoPresentOutlined } from "@mui/icons-material";

import RegistrationCoach from "../components/RegistrationCoach";
import RegistrationManager from "../components/RegistrationManager";

import { loginSuccess } from "../features/user/userActions";

import { useNavigate } from "react-router-dom";

import {
  allCountries,
  allAges,
  ATassociations,
  CHassociations,
  GERassociations,
} from "../utils/ageAndLeague";

function Register() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Registrieren";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // general infos
  const [tab, setTab] = useState(0);
  const [role, setRole] = useState("");
  const [step, setStep] = useState(0);

  // inputs
  const [firstName, setFirstName] = useState("");
  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const [lastName, setLastName] = useState("");
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const [email, setEmail] = useState("");
  const onEmailChanged = (e) => setEmail(e.target.value);
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [code, setCode] = useState("");
  const onCodeChanged = (e) => setCode(e.target.value);
  const [club, setClub] = useState();
  const [country, setCountry] = useState();
  const [association, setAssociation] = useState();
  const [age, setAge] = useState();
  const [league, setLeague] = useState();
  const [missingClub, setMissingClub] = useState("");
  const onChangeMissingClub = (e) => setMissingClub(e.target.value);
  const [missingCountry, setMissingCountry] = useState();
  const [missingAssociation, setMissingAssociation] = useState();
  const [isSetMissingClub, setIsSetMissingClub] = useState(false);
  const [clubId, setClubId] = useState("");
  const [isSetClub, setIsSetClub] = useState(false);

  // missing club
  const [openMissingClubDialog, setOpenMissingClubDialog] = useState(false);
  // open club dialog
  const handleOpenMissingClub = () => {
    setOpenMissingClubDialog(true);
  };
  // close club dialog
  const handleCloseMissingClub = () => {
    setOpenMissingClubDialog(false);
  };
  // submit change club via dialog
  const handleAnnounceMissingClub = () => {
    setIsSetMissingClub(true);
    // send email with club, country, association
  };

  // password checklist requirements
  const length = 7;
  const patternNumber = /[0-9]/;
  const patternCapital = /[A-Z]/;
  const patternSpecialChars = /[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/;
  // password checklist test functions
  const hasLength = (pw) => {
    return pw.length >= length;
  };
  const hasNumber = (pw) => {
    return patternNumber.test(pw);
  };
  const hasCapital = (pw) => {
    return patternCapital.test(pw);
  };
  const hasSpecialChar = (pw) => {
    return patternSpecialChars.test(pw);
  };

  // email checklist
  const patternEmail = /\S+@\S+/; // only check for string@string, validate email per send mail
  const hasEmailFormat = (email) => {
    return patternEmail.test(email);
  };

  const { user, status, error } = useSelector((state) => state.user);

  const allClubs = ["TSV Sickenhausen", "SV Degerschlacht", "TSV Sondelfingen"];

  const chooseRole = (r) => {
    setRole(r);
    setStep(1);
  };

  const checkCode = async () => {
    try {
      let tempId = await checkRegistrationCode(code);
      setIsSetClub(true);
      setClubId(tempId);
      setStep(2);
    } catch (error) {
      toast.error(error);
    }
  };

  const submitRegistration = async () => {
    let error = false;
    // check for errors
    if (!hasLength(password) || !hasNumber(password) || !hasCapital(password)) {
      setPasswordError(true);
      error = true;
    } else {
      setPasswordError(false);
    }
    if (!hasEmailFormat(email)) {
      setEmailError(true);
      error = true;
    } else {
      setEmailError(false);
    }

    // ask backend if there is no error
    if (!error) {
      try {
        let userData;
        if (role === "manager") {
          if (isSetMissingClub) {
            userData = {
              firstName,
              lastName,
              email,
              password,
              role,
              club: missingClub,
              country: missingCountry,
              association: missingAssociation,
            };
          } else {
            userData = {
              firstName,
              lastName,
              email,
              password,
              role,
              club,
              country,
              association,
            };
          }
        } else if (role === "coach") {
          userData = {
            firstName,
            lastName,
            email,
            password,
            role,
            code,
            clubId,
            age,
            league,
          };
        }
        const response = await register(userData);
        // save JWT to local storage
        localStorage.setItem("jwt", response.data.jwt);
        // save user to local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.team) {
          localStorage.setItem("team", JSON.stringify(response.data.team));
        }
        if (response.data.club) {
          localStorage.setItem("club", JSON.stringify(response.data.club));
        }
        // login successful, dispatch action to store
        dispatch(loginSuccess(response.data.jwt, response.data.user));
        // redirect in App.js (user objects navigates to dashboard)
        // navigate("/register/success");
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

  return (
    <>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />

      {status === "loading" && <SpinnerLogo />}

      <Container
        style={{
          minHeight: "calc(100vh - 65px)", //full height - header
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* step one: choose role */}
        {step === 0 && (
          <Grid container justifyContent="space-evenly">
            <span onClick={() => chooseRole("manager")}>
              <Box
                width="200px"
                height="200px"
                sx={{
                  backgroundColor: "var(--lightgreen)",
                  color: "black",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ":hover": {
                    boxShadow: "0 0 10px var(--lightgreen)",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="largeBold">Manager</Typography>
              </Box>
            </span>
            <span onClick={() => chooseRole("coach")}>
              <Box
                width="200px"
                height="200px"
                sx={{
                  backgroundColor: "var(--lightgreen)",
                  color: "black",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ":hover": {
                    boxShadow: "0 0 10px var(--lightgreen)",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="largeBold">Trainer</Typography>
              </Box>
            </span>
          </Grid>
        )}
        {/* step two (coach): enter code */}
        {step === 1 && role === "coach" && (
          <Grid container justifyContent="space-evenly">
            <Grid item xs={12} mb={2}>
              <TextField
                id="code"
                label="Code"
                type="text"
                value={code}
                name="code"
                onChange={onCodeChanged}
              />
            </Grid>
            <Button onClick={() => setStep(0)}>Zurück</Button>
            <Tooltip title="Du kannst jederzeit später deinen Verein auswählen">
              <Button onClick={() => setStep(2)}>Ohne Verein fortfahren</Button>
            </Tooltip>
            <Button disabled={code.length < 4} onClick={checkCode}>
              Weiter
            </Button>
          </Grid>
        )}
        {/* step two (manager): choose club */}
        {step === 1 && role === "manager" && (
          <Grid container justifyContent="space-evenly">
            <Grid item container direction="column" mb={2}>
              <Grid item>
                <Autocomplete
                  id="country"
                  onChange={(event, country) => setCountry(country)}
                  options={allCountries}
                  renderOption={(props, option) => {
                    return <li {...props}>{option.label}</li>;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Land" />
                  )}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  id="association"
                  onChange={(event, association) => setAssociation(association)}
                  options={GERassociations}
                  renderOption={(props, option) => {
                    return <li {...props}>{option.label}</li>;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Verband" />
                  )}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  id="club"
                  onChange={(event, club) => setClub(club)}
                  options={allClubs}
                  renderOption={(props, option) => {
                    return <li {...props}>{option}</li>;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Verein" />
                  )}
                />
              </Grid>
            </Grid>
            <Button onClick={() => setStep(0)}>Zurück</Button>
            <Button onClick={handleOpenMissingClub}>
              Dein Verein ist nicht aufgelistet?
            </Button>
            <Button disabled={!club} onClick={() => setStep(3)}>
              Weiter
            </Button>
          </Grid>
        )}
        {/* step three: create team (only coach) */}
        {step === 2 && role === "coach" && (
          <Grid container justifyContent="space-evenly">
            <Grid item container direction="column" mb={2}>
              <Grid item>
                <Autocomplete
                  id="age"
                  onChange={(event, age) => setAge(age)}
                  options={allAges}
                  renderOption={(props, option) => {
                    return <li {...props}>{option.label}</li>;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Alter"
                      inputProps={{
                        ...params.inputProps,
                        required: Boolean(clubId),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  id="league"
                  onChange={(event, league) => setLeague(league)}
                  options={[{ label: "Kreisliga", value: 2 }]}
                  renderOption={(props, option) => {
                    return <li {...props}>{option.label}</li>;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Liga"
                      inputProps={{
                        ...params.inputProps,
                        required: Boolean(clubId),
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button onClick={() => setStep(1)}>Zurück</Button>
            <Button onClick={() => setStep(3)}>Weiter</Button>
          </Grid>
        )}
        {/* step four: create account */}
        {step === 3 && (
          <Grid container justifyContent="space-evenly">
            <Grid item xs={12} mb={2}>
              <TextField
                required
                id="firstName"
                label="Vorname"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onFirstNameChanged}
                inputProps={{
                  style: {
                    paddingRight: "60px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <TextField
                required
                id="lastName"
                label="Nachname"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onLastNameChanged}
                inputProps={{
                  style: {
                    paddingRight: "60px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <TextField
                error={emailError}
                required
                id="email"
                label="E-Mail"
                helperText={emailError && "Bitte gültige E-Mail angeben"}
                type="email"
                value={email}
                name="email"
                onChange={onEmailChanged}
                inputProps={{
                  style: {
                    paddingRight: "60px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <TextField
                error={passwordError}
                required
                id="password"
                label="Passwort"
                helperText={
                  <>
                    <Typography component="span" variant="smallLight">
                      Das Passwort braucht mindestens:
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="smallLight"
                      sx={{
                        color: hasLength(password)
                          ? "var(--lightgreen)"
                          : "red",
                      }}
                    >
                      7 Zeichen
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="smallLight"
                      sx={{
                        color: hasNumber(password)
                          ? "var(--lightgreen)"
                          : "red",
                      }}
                    >
                      1 Zahl
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="smallLight"
                      sx={{
                        color: hasCapital(password)
                          ? "var(--lightgreen)"
                          : "red",
                      }}
                    >
                      1 Großbuchstaben
                    </Typography>
                    {/* <Typography
                      component="span"
                      variant="smallLight"
                      sx={{
                        color: hasSpecialChar(password)
                          ? "var(--lightgreen)"
                          : "red",
                      }}
                    >
                      1 Sonderzeichen
                    </Typography> */}
                  </>
                }
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={onPasswordChanged}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Button
              onClick={role === "manager" ? () => setStep(1) : () => setStep(2)}
            >
              Zurück
            </Button>
            <Button
              disabled={email === "" || password === ""}
              onClick={submitRegistration}
            >
              Registrieren
            </Button>
          </Grid>
        )}
      </Container>

      {/* Dialog for missing club*/}
      <Dialog open={openMissingClubDialog} onClose={handleCloseMissingClub}>
        <DialogTitle>Verein nicht aufgelistet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sollte Dein Verein nicht aufgelistet sein, kannst du ihn hier
            hinzufügen. Wir werden uns dann schnellstmöglich darum kümmern, dass
            Dein Verein hinzugefüft wird.
          </DialogContentText>
          <Grid item container direction="column" mb={2}>
            <Grid item>
              <Autocomplete
                id="missingCountry"
                onChange={(event, country) => setMissingCountry(country)}
                options={allCountries}
                renderOption={(props, option) => {
                  return <li {...props}>{option.label}</li>;
                }}
                renderInput={(params) => <TextField {...params} label="Land" />}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                id="missingAssociation"
                onChange={(event, association) =>
                  setMissingAssociation(association)
                }
                options={GERassociations}
                renderOption={(props, option) => {
                  return <li {...props}>{option.label}</li>;
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Verband" />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                id="missingClub"
                name="missingClub"
                label="Verein"
                value={missingClub}
                type="text"
                onChange={onChangeMissingClub}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMissingClub}>Abbruch</Button>
          <Button
            disabled={!missingCountry || !missingAssociation || !missingClub}
            onClick={handleAnnounceMissingClub}
          >
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Register;
