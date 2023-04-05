import { Button, Container, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function NoInternetConnection() {
  return (
    <>
      <Typography variant="mainHeader">:(</Typography>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      <Container>
        <Typography>
          Es scheint, als ob keine Internetverbindung besteht...
        </Typography>
        <Button onClick={() => window.location.reload()}>Erneut laden</Button>
        <Link to="/">Zurück zur Startseite</Link>
      </Container>
    </>
  );
}

export default NoInternetConnection;
