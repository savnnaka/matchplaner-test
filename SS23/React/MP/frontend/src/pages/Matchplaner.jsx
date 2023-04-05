import { Grid, Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Navigation } from "../components/matchplaner/Navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatchesLoading,
  getMatchesSuccess,
  getMatchesError,
  getFavoriteMatchesLoading,
  getFavoriteMatchesError,
  getFavoriteMatchesSuccess,
} from "../features/matchplaner/matchplanerActions";
import {
  getMatches,
  getFavoriteMatches,
} from "../features/matchplaner/matchplanerAPI";
import SpinnerLogo from "../components/SpinnerLogo";
import "react-toastify/dist/ReactToastify.css";
import { AddMatchModal } from "../components/modals/AddMatchModal";

export function Matchplaner() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Matchplaner";
  }, []);

  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.user);
  const { error, status } = useSelector((state) => state.matchplaner);
  const { favoriteMatches } = useSelector((state) => state.team);

  const loadMatches = async () => {
    try {
      // init loading
      dispatch(getMatchesLoading());
      // api call
      const response = await getMatches(token);
      dispatch(getMatchesSuccess(response));
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(getMatchesError(message));
    }
  };

  const loadFavoriteMatches = async () => {
    try {
      dispatch(getFavoriteMatchesLoading());
      const response = await getFavoriteMatches(favoriteMatches, token);
      dispatch(getFavoriteMatchesSuccess(response));
    } catch (err) {
      dispatch(getFavoriteMatchesError(err));
    }
  };

  // get all available matches at first render
  useEffect(() => {
    loadMatches();
    loadFavoriteMatches();
  }, []);

  // after any action show error message and reset status
  useEffect(() => {
    if (error || status === "failed") {
      toast.error(error);
    }
    if (status === "success") {
      loadMatches();
      loadFavoriteMatches();
    }
  }, [status, error]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // loading sign
  if (status === "loading") {
    return <SpinnerLogo />;
  }

  return (
    <>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      <Container sx={{ paddingTop: "4rem" }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <div className="add-match-button" onClick={handleDialogOpen}></div>
          </Grid>
        </Grid>
        <Box sx={{ width: "100%" }} mb={2}>
          <div style={{ marginTop: "2rem" }}>
            <Navigation />
          </div>
          {/* Modal: create new match */}
          <AddMatchModal handleClose={handleDialogClose} open={dialogOpen} />
        </Box>
      </Container>
    </>
  );
}
