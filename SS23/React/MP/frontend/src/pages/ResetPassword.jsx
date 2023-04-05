import {
  Button,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SpinnerLogo from "../components/SpinnerLogo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Close as CloseIcon } from "@mui/icons-material";
import { resetPasswordSetNew, login } from "../features/user/userAPI";
import {
  loginLoading,
  loginSuccess,
  loginError,
} from "../features/user/userActions";

function ResetPassword() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Passwort vergessen";
  }, []);
  const dispatch = useDispatch();

  const { user, error, status } = useSelector((state) => state.user);

  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [tempPasswordError, setTempPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPassword2Error, setNewPassword2Error] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);
  const [pwValidationLength, setPwValidationLength] = useState(false);
  const [pwValidationNumber, setPwValidationNumber] = useState(false);
  const [pwValidationCapital, setPwValidationCapital] = useState(false);
  const [pwValidationSpecialChars, setPwValidationSpecialChars] =
    useState(false);

  const onTempPasswordChanged = (e) => setTempPassword(e.target.value);
  const onNewPasswordChanged = (e) => setNewPassword(e.target.value);
  const onNewPassword2Changed = (e) => setNewPassword2(e.target.value);

  const onLogin = async (userData) => {
    try {
      // init the auth flow
      dispatch(loginLoading());
      // make API call to server to authenticate user
      const response = await login(userData);
      // save JWT to local storage
      localStorage.setItem("jwt", response.data.jwt);
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // login successful, dispatch action to store
      dispatch(loginSuccess(response.data.jwt, response.data.user));
    } catch (error) {
      // login failed, show error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(loginError(message));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let error = false;

    if (!tempPassword) {
      setTempPasswordError(true);
      error = true;
    } else {
      setTempPasswordError(false);
    }

    if (!newPassword) {
      setNewPasswordError(true);
      error = true;
    } else {
      setNewPasswordError(false);
    }

    // password checklist requirements
    const length = 7;
    const patternNumber = /[0-9]/;
    const patternCapital = /[A-Z]/;
    const patternSpecialChars = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;
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

    const hasL = hasLength(newPassword);
    const hasN = hasNumber(newPassword);
    const hasC = hasCapital(newPassword);
    const hasS = hasSpecialChar(newPassword);

    setPwValidationLength(hasL);
    setPwValidationNumber(hasN);
    setPwValidationCapital(hasC);
    setPwValidationSpecialChars(hasS);

    if (!hasL || !hasN || !hasC || !hasS) {
      setNewPasswordError(true);
      error = true;
    } else {
      setNewPasswordError(false);
    }

    if (!newPassword2 || newPassword !== newPassword2) {
      setNewPassword2Error(true);
      error = true;
    } else {
      setNewPassword2Error(false);
    }

    if (error) {
      return;
    }

    // tempPw kontrollieren und löschen
    // neues pw anlegen
    try {
      const userData = {
        tempPassword,
        newPassword,
      };
      const updatedUser = await resetPasswordSetNew(userData);

      // login after successfull reset of pw
      try {
        onLogin({ email: updatedUser.email, password: newPassword });
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Typography variant="mainHeader">Passwort zurücksetzen</Typography>

      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />

      {/* show spinning logo if loading */}
      {status === "loading" && <SpinnerLogo />}

      {/* form to allow "enter" to submit */}
      <form>
        <Grid container spacing={2} justifyContent="center">
          {/* email input */}
          <Grid item>
            <TextField
              error={tempPasswordError}
              required
              autoFocus
              type="text"
              id="tempPassword"
              name="tempPassword"
              value={tempPassword}
              label="Temporäres Passwort eingeben"
              helperText={
                tempPasswordError && "Bitte temporäres Passwort angeben"
              }
              onChange={onTempPasswordChanged}
              sx={{ width: "250px" }}
            />
          </Grid>
          {/* password input */}
          <Grid item>
            <TextField
              error={newPasswordError}
              required
              id="password"
              label="Passwort eingeben"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              name="password"
              onChange={onNewPasswordChanged}
              // autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // forgot password
              helperText={
                newPasswordError && (
                  <>
                    Das Passwort braucht mindestens: <br />
                    {!pwValidationLength && (
                      <>
                        7 Zeichen <br />
                      </>
                    )}
                    {!pwValidationNumber && (
                      <>
                        1 Zahl <br />
                      </>
                    )}
                    {!pwValidationCapital && (
                      <>
                        1 Großbuchstaben <br />
                      </>
                    )}
                    {!pwValidationSpecialChars && <>1 Sonderzeichen</>}
                  </>
                )
              }
              sx={{ width: "250px" }}
            />
          </Grid>
          {/* password2 input */}
          <Grid item>
            <TextField
              error={newPassword2Error}
              required
              id="password"
              label="Passwort bestätigen"
              type={showNewPassword2 ? "text" : "password"}
              value={newPassword2}
              name="password"
              onChange={onNewPassword2Changed}
              // autoComplete="current-password"
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
              // forgot password
              helperText={
                newPassword2Error && "Passwörter stimmen nicht überein"
              }
              sx={{ width: "250px" }}
            />
          </Grid>
          {/* submit/login button */}
          <Grid item xs={12}>
            <Button type="submit" onClick={onSubmit} variant="wide">
              Passwort ändern
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default ResetPassword;
