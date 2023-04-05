import {
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Container,
  Tooltip,
  Link as MuiLink,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import SpinnerLogo from "../components/SpinnerLogo";
import { ArrowBackIos } from "@mui/icons-material";
import EditModeTrainingsplaner from "../components/EditTraining";
import DetailModeTrainingsplaner from "../components/DetailTraining";
import SavedModeTrainingsplaner from "../components/SavedTraining";
import { setNewTab } from "../features/trainingsplaner/trainingsplanerActions";

function Trainingsplaner() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Trainingsplaner";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, newTab } = useSelector((state) => state.trainingsplaner);

  // use tabs for in-site navigation
  const [tab, setTab] = useState(newTab);

  useEffect(() => {
    setTab(newTab);
  }, [newTab]);

  return (
    <>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      <Container>
        {/* tabs: Planungsmodus, Detailplanung, Bibliothek */}
        <Box sx={{ width: "100%" }} mb={2}>
          <Tabs
            value={tab}
            onChange={(event, newTab) => dispatch(setNewTab(newTab))}
          >
            <Tab value={0} label="PLANUNGSMODUS" />
            {/* <Tab value={1} label="DETAILPLANUNG" /> */}
            <Tab value={2} label="BIBLIOTHEK" />
          </Tabs>
        </Box>

        {/* show spinning logo if loading */}
        {status === "loading" && <SpinnerLogo />}

        {/* additional info for coaches */}
        {/* 
        "- Vor jedem Training kann ein kurzes Warm-up inklusive Dehnen sinnvoll sein"
        "- Die Torspieler werden in manchen Übungen auch als Feldspieler gezählt"
        "- Alter und Liga können nur bei einem Vereinswechsel oder zum Start einer neuen Saison geändert werden"
        */}

        <Grid container>
          {/* Planungsmodus */}
          {tab === 0 && <EditModeTrainingsplaner />}
          {/* Detailplanung */}
          {/* {tab === 1 && <DetailModeTrainingsplaner />} */}
          {/* Bibliothek */}
          {tab === 2 && <SavedModeTrainingsplaner />}
        </Grid>
      </Container>
    </>
  );
}

export default Trainingsplaner;
