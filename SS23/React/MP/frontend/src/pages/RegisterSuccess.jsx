import { Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { resendEmail } from "../features/user/userAPI";

function RegisterSuccess() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Erfolgreich registriert";
  }, []);

  let emailResend = localStorage.getItem("data_resend");

  const sendEmailAgain = async () => {
    try {
      await resendEmail({ email: emailResend });
      // remove stored item (no longer needed)
      localStorage.removeItem("data_resend");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* heading */}
      <Typography variant="mainHeader">Erfolgreiche Registrierung</Typography>

      {/* info about next steps */}
      <Typography>
        Herzlichen Glückwunsch, Sie haben sich erfolgreich bei MatchPlaner
        registriert. Sie werden in den nächsten Minuten eine E-Mail erhalten, in
        welcher Sie Ihren Account bestätigen und sich einloggen können. Vielen
        Dank und viel Spaß!
      </Typography>
      {emailResend && (
        <MuiLink
          onClick={sendEmailAgain}
          sx={{
            textDecoration: "none",
            fontSize: "1em",
          }}
          className="pointer"
        >
          E-Mail erneut senden
        </MuiLink>
      )}
      <Link to="/">Zurück zur Startseite</Link>
    </>
  );
}

export default RegisterSuccess;
