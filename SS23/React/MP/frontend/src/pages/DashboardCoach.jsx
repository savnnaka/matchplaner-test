import {
  Typography,
  Grid,
  Card,
  CardMedia,
  TextField,
  Button,
  MenuItem,
  Tooltip,
  Container,
} from "@mui/material";
import {
  WhatsApp,
  Facebook,
  Link as LinkIcon,
  Email,
  GppBad as BadIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import imageMatchplaner from "../images/feature_mp.jpg";
import imageReiseplaner from "../images/tool-reiseplaner.jpg";
import imageEventplaner from "../images/tool-eventplaner.jpg";
import imageTrainingsplaner from "../images/feature_trp2.jpg";
import imageSaisonplaner from "../images/feature_sp.jpg";
import imageVereinsplaner from "../images/feature_vp.png";
import imageTaktikplaner from "../images/tool-taktikplaner.jpg";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Newsfeed from "../components/Newsfeed";
import Calendar from "../components/Calendar";
import SpinnerLogo from "../components/SpinnerLogo";
import { getTeamByCoach } from "../features/team/teamAPI";
import { getClubByTeam } from "../features/club/clubAPI";
import { updateSuccess } from "../features/user/userActions";

import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import {
  getTeamLoading,
  getTeamSuccess,
  getTeamError,
} from "../features/team/teamActions";
import {
  getClubLoading,
  getClubSuccess,
  getClubError,
} from "../features/club/clubActions";

function DashboardCoach() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Coach";
  }, []);

  const dispatch = useDispatch();

  const { user, status, token } = useSelector((state) => state.user);
  const { clubName } = useSelector((state) => state.club);
  const { age, teamId } = useSelector((state) => state.team);

  const getTeam = async () => {
    try {
      dispatch(getTeamLoading());
      const response = await getTeamByCoach(token);
      dispatch(getTeamSuccess(response[0]));
    } catch (err) {
      const errorMsg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      dispatch(getTeamError(errorMsg));
    }
  };

  const getClub = async () => {
    try {
      dispatch(getClubLoading());
      const response = await getClubByTeam(teamId, token);
      dispatch(getClubSuccess(response[0]));
    } catch (err) {
      const errorMsg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      dispatch(getClubError(errorMsg));
    }
  };

  // scroll to top when visited
  useEffect(() => {
    window.scrollTo(0, 0);
    getTeam();
    getClub();
  }, []);

  // array of all tools with all props
  const tools = [
    {
      name: "MatchPlaner",
      description: "Testspielbörse",
      infoText: "Finde den passenden Gegner für Deine Testspiele",
      link: "matchplaner",
      imgUrl: `url(${imageMatchplaner})`,
      requirement: "Verein",
      matchRequirement: Boolean(clubName),
      // bgColor: "rgba(100,100,0,0.5)",
    },
    {
      name: "TrainingsPlaner",
      description: "Übungsdatenbank",
      infoText:
        "Erhalte in sekundenschnelle eine perfekt abgestimmte Trainingseinheit für Deine Mannschaft",
      link: "trainingsplaner",
      imgUrl: `url(${imageTrainingsplaner})`,
      requirement: "Alter (Team)",
      matchRequirement: Boolean(age),
      // bgColor: "rgba(90,150,60,0.5)",
    },

    // {
    //   name: "ReisePlaner",
    //   description: "Trainingslager",
    //   link: "reiseplaner",
    //   imgUrl: `url(${imageReiseplaner})`,
    //   variant: "comingSoon", //enabled, disabled, comingSoon
    //   bgColor: "rgba(100,50,80,0.5)",
    // },
    // {
    //   name: "EventPlaner",
    //   description: "Teambuilding",
    //   link: "eventplaner",
    //   imgUrl: `url(${imageEventplaner})`,
    //   variant: "comingSoon", //enabled, disabled, comingSoon
    //   bgColor: "rgba(100,50,80,0.5)",
    // },

    {
      name: "SaisonPlaner",
      description: "Belastungssteuerung",
      infoText:
        "Plane Deine gesamte Saison und steuere die Belastung individuell",
      link: "saisonplaner",
      imgUrl: `url(${imageSaisonplaner})`,
      requirement: "Alter (Team)",
      matchRequirement: Boolean(age),
      // bgColor: "rgba(100,50,80,0.5)",
    },

    {
      name: "VereinsPlaner",
      description: "Belegungsplan",
      infoText: "Verwalte alle Termine zentral und übersichtlich für alle",
      link: "clubplaner",
      imgUrl: `url(${imageVereinsplaner})`,
      requirement: "Verein",
      matchRequirement: Boolean(clubName),
      // bgColor: "rgba(90,150,60,0.5)",
    },
    // {
    //   name: "TaktikPlaner",
    //   description: "Analysetool",
    //   link: "taktikplaner",
    //   imgUrl: `url(${imageTaktikplaner})`,
    //   variant: "comingSoon", //enabled, disabled, comingSoon
    //   bgColor: "rgba(100,50,80,0.5)",
    // },
  ];

  // dialog: show packages
  // const [openShowPackages, setOpenShowPackages] = useState(false);

  // handle new package
  const [newPackage, setNewPackage] = useState("");

  // Let App change e.g. while typing in input field
  const onChangePackage = (e) => {
    setNewPackage(e.target.value);
  };

  // submit the new chosen package (connection/infos: stripe)
  const submitNewPackage = async () => {
    if (newPackage === "") {
      toast.error("Bitte wählen Sie ein Paket aus");
    } else {
      localStorage.setItem("newPackage", newPackage);
      let priceId;
      switch (newPackage) {
        case "basic":
          priceId = "price_1LfOU9InQhoZcIpGi7YxBRAr";
          break;
        case "training":
          priceId = "price_1LfOC7InQhoZcIpGrRkR7Qcn";
          break;
        case "saison":
          priceId = "price_1LfOCaInQhoZcIpGh6XGZJtP";
          break;
        case "tactics":
          priceId = "price_1LfOD6InQhoZcIpGBMNmwFzN";
          break;
        case "premium":
          priceId = "price_1LfODYInQhoZcIpG4UkQYk6q";
          break;
        default:
          break;
      }
      const userData = {
        priceId,
        newPackage,
      };
      // const promise = dispatch(createSubscriptionSession({ userData }));
      // Redirect to stripe payment site
      // window.location = promise.payload.url;
    }
  };

  // continue without choosing a package (get basic free package)
  const continueWithBasicPackage = async () => {
    // set firstVisit to false
    const userData = {
      firstVisit: false,
    };
    // dispatch(update(userData));
    // redirect
    // window.location = "/coach";
  };

  // update package (stripe)
  const updatePackage = () => {
    // TODO: include strip
    // redirects to stripe: manage abo
    window.location =
      "https://billing.stripe.com/p/login/test_6oE17L2Li3Lx8fKeUU";
  };

  const icons = [
    <WhatsApp fontSize="large" />,
    <Facebook fontSize="large" />,
    <LinkIcon fontSize="large" />,
    <Email fontSize="large" />,
  ];

  return (
    <>
      <Typography variant="mainHeader">
        Herzlich Willkommen {user.firstName ? user.firstName : "Coach"}!
      </Typography>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      {status === "loading" && <SpinnerLogo />}

      <Container>
        <Grid container columnSpacing={3}>
          {/* heading */}
          <Grid item xs={12}>
            <Typography fontWeight="bold" textAlign="start">
              Meine Features
            </Typography>
          </Grid>

          {/* show all tools/features and disable them when not booked / mark them if not yet programmed */}
          {tools.map((tool, index) => (
            <Grid item xs={12} md={6} key={index} mb={2}>
              <Tooltip
                title={
                  !tool.matchRequirement &&
                  "Bitte Profil (" + tool.requirement + ") aktualisieren"
                }
              >
                <Card sx={{ padding: "0px", margin: "0px" }}>
                  <Link to={tool.matchRequirement ? tool.link : "../profile"}>
                    <CardMedia
                      sx={{
                        backgroundImage: tool.imgUrl,
                        height: 175,
                      }}
                    >
                      <Grid
                        container
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        // bgcolor={tool.bgColor}
                        // bgcolor="rgba(0,0,0,0.4)"
                        bgcolor={
                          tool.matchRequirement
                            ? "rgba(0,0,0,0.4)"
                            : "rgba(0,0,0,0.8)"
                        }
                        position="relative"
                      >
                        <Grid item>
                          <Typography variant="largeBold">
                            {tool.name}
                          </Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="smallLight">
                            {tool.infoText}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardMedia>
                  </Link>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default DashboardCoach;
