import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import SpinnerLogo from "../components/SpinnerLogo";
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
  Link as MuiLink,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Close as CloseIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { login, updateUser, resetPassword } from "../features/user/userAPI";
import {
  loginLoading,
  loginSuccess,
  loginError,
  resetPasswordLoading,
  resetPasswordSuccess,
  resetPasswordError,
  resetStatus,
} from "../features/user/userActions";

function Login() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Login";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (userData) => {
    try {
      // init the auth flow
      dispatch(loginLoading());
      // make API call to server to authenticate user
      const response = await login(userData);
      // check for payment
      if (response.data.notPaid) {
        toast.error("Popup mit Code/Payment");
      }
      // save JWT to local storage
      localStorage.setItem("jwt", response.data.jwt);
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // TODO: also look for team and club and save it in store
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

  // scroll to top when visited (else takes the viewY of the prev site)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onEmailChanged = (e) => setEmail(e.target.value.toLowerCase());
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const { user, error, status } = useSelector((state) => state.user);

  // redirect after successfull login, else show error
  useEffect(() => {
    // show error if there is one
    if (status === "failed" && error) {
      toast.error(error);
    }

    // create new pw, save and send
    if (status === "success_reset_pw") {
      toast.success("Dein Passwort wurde erfolgreich zurückgesetzt.");

      setOpenResetPasswordDialog(false);
    }

    if (status !== "loading") {
      dispatch(resetStatus()); // reset all props but not the user and token
    }
  }, [status, error, user]);

  // handle the submit/login event
  const onSubmit = async (e) => {
    e.preventDefault(); // dont allow to send the form data, instead go on with this function
    // check if input is not empty
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (email && password) {
      // Only ask backend if there are values to send
      // No encryption at this point needed, because we send the data via HTTPS (so body cant be seen)
      const userData = {
        email,
        password,
      };

      onLogin(userData);
    }
  };

  // reset password
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);
  const [emailNewPassword, setEmailNewPassword] = useState("");
  const [emailNewPasswordError, setEmailNewPasswordError] = useState(false);
  const onChangeEmailNewPassword = (e) => {
    setEmailNewPassword(e.target.value);
  };

  const askResetPassword = async () => {
    if (!emailNewPassword) {
      setEmailNewPasswordError(true);
      return;
    }

    setEmailNewPasswordError(false);

    try {
      // init flow
      dispatch(resetPasswordLoading());
      const response = await resetPassword({ email: emailNewPassword });
      console.log(response);
      dispatch(resetPasswordSuccess());
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(resetPasswordError(message));
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 65px)", //full height - header
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
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
      <form style={{ marginBottom: "20px" }}>
        <Grid container spacing={2} justifyContent="center">
          {/* email input */}
          <Grid item xs={12}>
            <TextField
              error={emailError}
              required
              autoFocus
              type="email"
              id="email"
              name="email"
              value={email}
              label="E-Mail eingeben"
              helperText={emailError && "Bitte E-Mail angeben"}
              onChange={onEmailChanged}
            />
          </Grid>
          {/* password input */}
          <Grid item xs={12}>
            <TextField
              error={passwordError}
              required
              id="password"
              label="Passwort eingeben"
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              onChange={onPasswordChanged}
              // autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // forgot password
              helperText={passwordError && "Bitte Passwort angeben"}
            />
          </Grid>
          {/* submit/login button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              onClick={onSubmit}
              disabled={status !== "idle"}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* link to register if not registered */}
      <Grid container justifyContent="center">
        <Typography>Noch kein Mitglied?</Typography>
        <MuiLink onClick={() => navigate("/register")}>
          <Typography>Jetzt registrieren.</Typography>
        </MuiLink>
      </Grid>
      {/* Reset password */}
      <Grid container justifyContent="center">
        <Typography>Passwort vergessen?</Typography>
        <MuiLink onClick={() => setOpenResetPasswordDialog(true)}>
          <Typography>Hier klicken.</Typography>
        </MuiLink>
      </Grid>

      {/* reset password dialog */}
      <Dialog
        open={openResetPasswordDialog}
        onClose={() => setOpenResetPasswordDialog(false)}
      >
        <DialogTitle>
          Passwort vergessen?
          <IconButton
            aria-label="close"
            onClick={() => setOpenResetPasswordDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography>
                Hier kannst Du Dein altes Passwort zurücksetzen und bekommst ein
                neues Passwort.
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                Gib hier Deine registrierte E-Mail Adresse an, sodass wir Dir
                Dein neues Passwort zuschicken können.
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                type="text"
                id="email"
                name="email"
                value={emailNewPassword}
                error={emailNewPasswordError}
                helperText={emailNewPasswordError && "Bitte E-Mail angeben"}
                onChange={onChangeEmailNewPassword}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetPasswordDialog(false)}>
            Abbrechen
          </Button>
          <Button onClick={() => askResetPassword()}>Bestätigen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login;
