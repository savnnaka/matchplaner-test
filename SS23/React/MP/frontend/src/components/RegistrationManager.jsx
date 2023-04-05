import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  registerLoading,
  registerSuccess,
  registerError,
} from "../features/user/userActions";
import { register } from "../features/user/userAPI";

function RegistrationManager({ pwProps }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // input fields manager
  const [emailManager, setEmailManager] = useState("");
  const [passwordManager, setPasswordManager] = useState("");
  const [showPasswordManager, setShowPasswordManager] = useState(false);
  const [password2Manager, setPassword2Manager] = useState("");
  const [showPassword2Manager, setShowPassword2Manager] = useState(false);
  const [nameManager, setNameManager] = useState("");
  const [surnameManager, setSurnameManager] = useState("");
  const [country, setCountry] = useState("D"); //default value is "D" (Germany)
  const [club, setClub] = useState("");
  const [association, setAssociation] = useState("");
  const [address, setAddress] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");
  const onEmailManagerChanged = (e) => setEmailManager(e.target.value);
  const onPasswordManagerChanged = (e) => setPasswordManager(e.target.value);
  const onPassword2ManagerChanged = (e) => setPassword2Manager(e.target.value);
  const onNameManagerChanged = (e) => setNameManager(e.target.value);
  const onSurnameManagerChanged = (e) => setSurnameManager(e.target.value);
  const onCountryChanged = (e) => setCountry(e.target.value);
  const onClubChanged = (e) => setClub(e.target.value);
  const onAssociationChanged = (e) => setAssociation(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onPlzChanged = (e) => setPlz(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const [emailManagerError, setEmailManagerError] = useState(false);
  const [passwordManagerError, setPasswordManagerError] = useState(false);
  const [password2ManagerError, setPassword2ManagerError] = useState(false);
  const [nameManagerError, setNameManagerError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [clubError, setClubError] = useState(false);
  const [associationError, setAssociationError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [plzError, setPlzError] = useState(false);
  const [cityError, setCityError] = useState(false);

  const [stepManager, setStepManager] = useState(0);

  const { hasLength, hasNumber, hasCapital, hasSpecialChar } = pwProps;

  // check personal data of manager
  const registerManagerStepPersonalData = async (e) => {
    e.preventDefault();

    let error = false;

    // set error if there is an empty input
    if (!nameManager) {
      setNameManagerError(true);
      error = true;
    } else {
      setNameManagerError(false);
    }

    if (!emailManager) {
      setEmailManagerError(true);
      error = true;
    } else {
      setEmailManagerError(false);
    }

    if (!passwordManager) {
      setPasswordManagerError(true);
      error = true;
    } else {
      setPasswordManagerError(false);
    }

    const pwValidationLength = hasLength(passwordManager);
    const pwValidationNumber = hasNumber(passwordManager);
    const pwValidationCapital = hasCapital(passwordManager);
    const pwValidationSpecialChars = hasSpecialChar(passwordManager);

    if (
      !pwValidationLength ||
      !pwValidationNumber ||
      !pwValidationCapital ||
      !pwValidationSpecialChars
    ) {
      setPasswordManagerError(true);
      error = true;
    } else {
      setPasswordManagerError(false);
    }

    if (!password2Manager || passwordManager !== password2Manager) {
      setPassword2ManagerError(true);
      error = true;
    } else {
      setPassword2ManagerError(false);
    }

    // return if there is an error
    if (error) {
      return;
    }

    // go to next step if everything is ok
    setStepManager(1);
  };

  // create account for manager
  const registerManager = async (e) => {
    e.preventDefault();

    let error = false;

    // set error if there is an empty input
    if (!country) {
      setCountryError(true);
      error = true;
    } else {
      setCountryError(false);
    }

    if (!club) {
      setClubError(true);
      error = true;
    } else {
      setClubError(false);
    }

    if (!association) {
      setAssociationError(true);
      error = true;
    } else {
      setAssociationError(false);
    }

    if (!address) {
      setAddressError(true);
      error = true;
    } else {
      setAddressError(false);
    }

    if (!plz) {
      setPlzError(true);
      error = true;
    } else {
      setPlzError(false);
    }

    if (!city) {
      setCityError(true);
      error = true;
    } else {
      setCityError(false);
    }

    if (error) {
      return;
    }

    const userData = {
      name: nameManager,
      surname: surnameManager,
      email: emailManager,
      password: passwordManager,
      role: "manager",
      country,
      club,
      association,
      address,
      plz,
      city,
    };

    try {
      // init registration flow
      dispatch(registerLoading());
      // register user
      await register(userData);
      // go on
      dispatch(registerSuccess());
      // return <Link to="/register/success" />;
      navigate("/register/success");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      // dispatch(updateError(message));
      dispatch(registerError());
      toast.error("Hat leider nicht geklappt. Bitte erneut versuchen.");
    }
  };

  return (
    <>
      <Stepper orientation="vertical" activeStep={stepManager}>
        <Step>
          <StepLabel>Persönliche Daten angeben</StepLabel>
          <StepContent>
            <Grid container rowSpacing={1}>
              <Grid item>
                <Typography variant="body2">
                  Trage bitte deine persönlichen Daten ein. Bitte beachte, dass
                  der Name später nicht mehr geändert werden kann!
                </Typography>
              </Grid>
              <form>
                <Grid container justifySelf="center" rowSpacing={1}>
                  <Grid item xs={12} mt="10px">
                    <TextField
                      required
                      autoFocus
                      id="name"
                      label="Name"
                      error={nameManagerError}
                      helperText={nameManagerError && "Bitte Namen angeben"}
                      value={nameManager}
                      name="nameManager"
                      size="small"
                      onChange={onNameManagerChanged}
                      inputProps={{
                        style: {
                          paddingRight: "60px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // required
                      // autoFocus
                      id="surname"
                      label="Nachname"
                      // error={surnameManagerError}
                      // helperText={
                      //   nameManagerError && "Bitte Namen angeben"
                      // }
                      value={surnameManager}
                      name="surnameManager"
                      size="small"
                      onChange={onSurnameManagerChanged}
                      inputProps={{
                        style: {
                          paddingRight: "60px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      label="E-Mail"
                      error={emailManagerError}
                      helperText={emailManagerError && "Bitte E-Mail angeben"}
                      type="email"
                      value={emailManager}
                      name="emailManager"
                      size="small"
                      onChange={onEmailManagerChanged}
                      inputProps={{
                        style: {
                          paddingRight: "60px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="passwordManager"
                      label="Passwort"
                      error={passwordManagerError}
                      helperText={
                        passwordManagerError && (
                          <>
                            Das Passwort braucht mindestens: <br /> 7 Zeichen{" "}
                            <br /> 1 Zahl <br /> 1 Großbuchstaben <br /> und 1
                            Sonderzeichen
                          </>
                        )
                      }
                      type={showPasswordManager ? "text" : "password"}
                      value={passwordManager}
                      name="passwordManager"
                      size="small"
                      onChange={onPasswordManagerChanged}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPasswordManager(!showPasswordManager)
                              }
                            >
                              {showPasswordManager ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="password2Manager"
                      label="Passwort bestätigen"
                      error={password2ManagerError}
                      helperText={
                        password2ManagerError &&
                        "Passwörter stimmen nicht überein"
                      }
                      type={showPassword2Manager ? "text" : "password"}
                      value={password2Manager}
                      name="password2Manager"
                      size="small"
                      onChange={onPassword2ManagerChanged}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPassword2Manager(!showPassword2Manager)
                              }
                            >
                              {showPassword2Manager ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button disabled>Zurück</Button>
                    <Button onClick={registerManagerStepPersonalData}>
                      Weiter
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Vereinsdaten angeben</StepLabel>
          <StepContent>
            <Grid container rowSpacing={1}>
              <Grid item>
                <Typography variant="body2">
                  Trage bitte die Daten deines Vereins ein. Bitte beachte, dass
                  diese Daten für alle Trainer gelten, die sich über deine Codes
                  anmelden.
                </Typography>
              </Grid>
              {/* Country first - set the possible values for the next selects */}
              <form>
                <Grid container justifySelf="center" rowSpacing={1}>
                  {/* <Grid item xs={12} mt="10px">
                            <TextField
                              select
                              error={countryError}
                              required
                              size="small"
                              label="Land"
                              name="country"
                              id="country"
                              value={country}
                              onChange={onCountryChanged}
                              helperText={countryError && "Wähle Dein Land"}
                              sx={{ width: "225px" }}
                            >
                              <MenuItem value="D">Deutschland</MenuItem>
                              <MenuItem value="AT">Österreich</MenuItem>
                              <MenuItem value="CH">Schweiz</MenuItem>
                            </TextField>
                          </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      select
                      error={associationError}
                      required
                      size="small"
                      label="Verband"
                      name="association"
                      id="association"
                      value={association}
                      onChange={onAssociationChanged}
                      helperText={associationError && "Wähle Deinen Verband"}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: { sx: { maxHeight: 200 } },
                        },
                      }}
                      sx={{ width: "225px" }}
                    >
                      {/* if no country is set */}
                      {country === "" && (
                        <MenuItem value="">
                          Bitte zuerst Land auswählen
                        </MenuItem>
                      )}

                      {/* if country is germany */}
                      {country === "D" &&
                        [
                          {
                            value: "NI",
                            name: "Niedersächsischer Fußballverband",
                          },
                          {
                            value: "HB",
                            name: "Bremer Fußballverband",
                          },
                          {
                            value: "HH",
                            name: "Hamburger Fußballverband",
                          },
                          {
                            value: "SH",
                            name: "Schleswig-Holsteinischer Fußballverband",
                          },
                          {
                            value: "BB",
                            name: "Fußball-Landesverband Brandenburg",
                          },
                          {
                            value: "MV",
                            name: "Landesfußballverband Mecklenburg-Vorpommern",
                          },
                          {
                            value: "SN",
                            name: "Sächsischer Fußballverband",
                          },
                          {
                            value: "ST",
                            name: "Fußballverband Sachsen-Anhalt",
                          },
                          {
                            value: "TH",
                            name: "Thüringer Fußballverband",
                          },
                          {
                            value: "BE",
                            name: "Berliner Fußballverband",
                          },
                          {
                            value: "BY",
                            name: "Bayerischer Fußballverband",
                          },
                          {
                            value: "BA",
                            name: "Badischer Fußballverband",
                          },
                          {
                            value: "SB",
                            name: "Südbadischer Fußballverband",
                          },
                          {
                            value: "HE",
                            name: "Hessischer Fußballverband",
                          },
                          {
                            value: "WB",
                            name: "Württembergischer Fußballverband",
                          },
                          {
                            value: "WF",
                            name: "Fußball- und Leichtathletikverband Westfalen",
                          },
                          {
                            value: "NR",
                            name: "Fußballverband Niederrhein",
                          },
                          {
                            value: "MR",
                            name: "Fußballverband Mittelrhein",
                          },
                          {
                            value: "RL",
                            name: "Fußballverband Rheinland",
                          },
                          {
                            value: "SW",
                            name: "Südwestdeutscher Fußballverband",
                          },
                          {
                            value: "SL",
                            name: "Saarländischer Fußballverband",
                          },
                        ].map((association, index) => (
                          <MenuItem key={index} value={association.value}>
                            {association.name}
                          </MenuItem>
                        ))}
                      {/* if country is austria */}
                      {/* {country === "AT" &&
                                [
                                  {
                                    value: "BFV",
                                    name: "Burgenländischer Fußballverband",
                                  },
                                  {
                                    value: "KFV",
                                    name: "Kärntner Fußballverband",
                                  },
                                  {
                                    value: "NOFV",
                                    name: "Niederösterreichischer Fußballverband",
                                  },
                                  {
                                    value: "OOFV",
                                    name: "Oberösterreichischer Fußballverband",
                                  },
                                  {
                                    value: "SaFV",
                                    name: "Salzburger Fußballverband",
                                  },
                                  {
                                    value: "StFV",
                                    name: "Steirischer Fußballverband",
                                  },
                                  {
                                    value: "TFV",
                                    name: "Tiroler Fußballverband",
                                  },
                                  {
                                    value: "VFV",
                                    name: "Vorarlberger Fußballverband",
                                  },
                                  {
                                    value: "WFV",
                                    name: "Wiener Fußballverband",
                                  },
                                ].map((association, index) => (
                                  <MenuItem
                                    key={index}
                                    value={association.value}
                                  >
                                    {association.name}
                                  </MenuItem>
                                ))} */}
                      {/* if country is suisse */}
                      {/* {country === "CH" &&
                                [
                                  {
                                    value: "AFV",
                                    name: "Aargauischer Fußballverband",
                                  },
                                  {
                                    value: "FVBJ",
                                    name: "Fußballverband Bern/Jura",
                                  },
                                  {
                                    value: "ISFV",
                                    name: "Innerschweizerischer Fußballverband",
                                  },
                                  {
                                    value: "FVNWS",
                                    name: "Fußballverband Nordwestschweiz",
                                  },
                                  {
                                    value: "OSFV",
                                    name: "Ostschweizer Fußballverband",
                                  },
                                  {
                                    value: "SFV",
                                    name: "Solothurner Fußballverband",
                                  },
                                  {
                                    value: "FVRZ",
                                    name: "Fußballverband Region Zürich",
                                  },
                                  {
                                    value: "FTC",
                                    name: "Federazione Ticinese di Calcio",
                                  },
                                  {
                                    value: "AFF",
                                    name: "Association Fribourgeoise de Football",
                                  },
                                  {
                                    value: "ACGF",
                                    name: "Association Cantonale Genevoise de Football",
                                  },
                                  {
                                    value: "ANF",
                                    name: "Association Neuchâteloise de Football",
                                  },
                                  {
                                    value: "AVF",
                                    name: "Association Valaisanne de Football",
                                  },
                                  {
                                    value: "ACVF",
                                    name: "Association Cantonale Vaudoise de Football",
                                  },
                                ].map((association, index) => (
                                  <MenuItem
                                    key={index}
                                    value={association.value}
                                  >
                                    {association.name}
                                  </MenuItem>
                                ))} */}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      error={clubError}
                      required
                      id="club"
                      label="Vereinsname"
                      helperText={clubError && "Bitte Vereinsnamen angeben"}
                      value={club}
                      name="club"
                      size="small"
                      onChange={onClubChanged}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={addressError}
                      required
                      id="adress"
                      label="Vereinsadresse"
                      helperText={addressError && "Bitte Adresse angeben"}
                      value={address}
                      name="address"
                      size="small"
                      onChange={onAddressChanged}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={plzError}
                      required
                      id="plz"
                      label="Postleitzahl Verein"
                      helperText={
                        plzError && "Bitte Postleitzahl des Vereins angeben"
                      }
                      value={plz}
                      name="plz"
                      size="small"
                      onChange={onPlzChanged}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={cityError}
                      required
                      id="city"
                      label="Stadt Verein"
                      helperText={
                        cityError && "Bitte Stadt des Vereins angeben"
                      }
                      value={city}
                      name="city"
                      size="small"
                      onChange={onCityChanged}
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={() => setStepManager(0)}>Zurück</Button>
                    <Button type="submit" onClick={registerManager}>
                      Registrieren
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
}

export default RegistrationManager;
