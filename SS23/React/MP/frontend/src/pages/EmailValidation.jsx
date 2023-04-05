import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { validateEmail, login } from "../features/user/userAPI";
import {
  validateEmailLoading,
  validateEmailSuccess,
  validateEmailError,
  loginLoading,
  loginSuccess,
  loginError,
  resetStatus,
} from "../features/user/userActions";
import SpinnerLogo from "../components/SpinnerLogo";
import { Button, TextField, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function EmailValidation() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Email bestätigen";
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get email validation token from url
  let { token } = useParams();

  // get and set data of form
  const [formData, setFormData] = useState({
    email: "",
    verificationToken: token,
  });
  const { email, verificationToken } = formData;

  const [emailError, setEmailError] = useState(false);
  const [verificationTokenError, setVerificationTokenError] = useState(false);

  const { user, status, error } = useSelector((state) => state.user);

  // handle change of inputs
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // submit email validation
  const onSubmit = async (e) => {
    e.preventDefault();

    let error = false;

    if (!email) {
      setEmailError(true);
      error = true;
    } else {
      setEmailError(false);
    }
    if (!verificationToken) {
      setVerificationTokenError(true);
      error = true;
    } else {
      setVerificationTokenError(false);
    }

    // No encryption at this point needed, because we send the data via HTTPS (so body cant be seen)
    const userDataValidate = {
      email,
      verificationToken,
    };

    if (error) {
      return;
    }

    try {
      // init validation flow
      dispatch(validateEmailLoading());
      // verify the email address of the current user with the token
      const res = await validateEmail(userDataValidate);
      // validation successfull
      dispatch(validateEmailSuccess());
      toast.success("Email erfolgreich validiert. Weiterleitung zum Login");
      window.setTimeout(() => {
        // redirect to login after 2 seconds
        navigate("/login");
      }, 2000);
    } catch (error) {
      // login failed, show error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(validateEmailError(message));
    }
  };

  // // show errors
  // useEffect(() => {
  //   // show error if there is one
  //   if (status === "failed" && error) {
  //     toast.error(error);
  //   }

  //   if (status !== "loading") {
  //     dispatch(resetStatus()); // reset all props but not the user and token
  //   }
  // }, [status, error, user]);

  // as soon as validate ends successfully, call login
  // useEffect(() => {
  //   // Handle errors
  //   if (status === "failed" || error) {
  //     toast.error(error);
  //   }
  //   // handle login if validation was successfull
  //   if (status === "success") {
  //     const userData = {
  //       email,
  //       password,
  //       verificationToken,
  //     };
  //     onLogin(userData);
  //     // navigate in next step, because now "user" is set
  //   }
  //   // If user is logged in, then navigate to Dashboard
  //   if (user) {
  //     if (user.role === "manager") {
  //       navigate("/manager");
  //     } else if (user.role === "coach") {
  //       navigate("/coach");
  //     }
  //   }
  //   // Reset status
  //   dispatch(resetStatus());
  // }, [user, status, error]);

  if (status === "loading") {
    return <SpinnerLogo />;
  }

  return (
    <>
      <Typography variant="mainHeader">E-Mail Validierung</Typography>

      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography>
            Bitte schalte Deinen Account frei und logge dich ein.
          </Typography>
        </Grid>
        {/* email */}
        <Grid item>
          <TextField
            error={emailError}
            required
            type="email"
            id="email"
            name="email"
            value={email}
            label="Please enter your email"
            helperText={emailError && "Bitte E-Mail angeben"}
            onChange={onChange}
          />
        </Grid>
        {/* token */}
        <Grid item>
          <TextField
            error={verificationTokenError}
            required
            id="verificationToken"
            label="Please enter your validation token"
            helperText={verificationTokenError && "Bitte Code angeben"}
            type="text"
            value={verificationToken}
            name="verificationToken"
            onChange={onChange}
          />
        </Grid>
        {/* button */}
        <Grid item xs={12}>
          <Button type="submit" variant="outlined" onClick={onSubmit}>
            Account freischalten
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default EmailValidation;
