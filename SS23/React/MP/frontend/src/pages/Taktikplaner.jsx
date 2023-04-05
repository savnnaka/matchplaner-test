import { Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Taktikplaner() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Taktikplaner";
  }, []);

  return (
    <>
      <Typography variant="mainHeader">TaktikPlaner</Typography>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      <Container>
        <Typography>Diese Seite ist noch in der Entwicklung...</Typography>
        <Link to="/coach">Zurück zum Dashboard</Link>
      </Container>
    </>
  );
}

export default Taktikplaner;
