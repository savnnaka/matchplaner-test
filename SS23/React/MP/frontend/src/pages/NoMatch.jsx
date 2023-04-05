import { Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function NoMatch() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Nicht gefunden";
  }, []);

  return (
    <>
      <Typography variant="mainHeader">404</Typography>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      <Container>
        <Typography>
          Die gewünschte Seite konnte nicht gefunden werden :(
        </Typography>
        <Link to="/">Zurück zur Startseite</Link>
      </Container>
    </>
  );
}

export default NoMatch;
