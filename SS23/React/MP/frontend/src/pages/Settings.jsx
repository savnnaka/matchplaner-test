import { Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Settings() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Einstellungen";
  }, []);

  const { user } = useSelector((state) => state.user);

  const linkDashboard = user ? "/" + user.role : "/";

  return (
    <>
      <Typography variant="mainHeader">Einstellungen</Typography>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      <Container>
        <Typography>Diese Seite ist noch in der Entwicklung...</Typography>
        <Link to={linkDashboard}>Zurück zum Dashboard</Link>
      </Container>
    </>
  );
}

export default Settings;
