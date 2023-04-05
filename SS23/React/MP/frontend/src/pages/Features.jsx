import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import imageMatchplaner from "../images/tool-matchplaner-color-without-border.jpg";
import imageEventplaner from "../images/tool-eventplaner-color-without-border.jpg";
import imageReiseplaner from "../images/tool-reiseplaner-color-without-border.jpg";
import imageTrainingsplaner from "../images/tool-trainingsplaner-color-without-border.jpg";
import imageTaktikplaner from "../images/tool-taktikplaner-color-without-border.jpg";
import imageSaisonplaner from "../images/tool-saisonplaner-color-without-border.jpg";

function Features() {
  // remove class "container" to get full width and add when leaving site
  useEffect(() => {
    $("main").removeClass("container-fluid");

    // cleanup: reset style changes
    return () => {
      $("main").addClass("container-fluid");
    };
  }, []);

  const features = [
    {
      name: "MatchPlaner",
      id: "matchplaner",
      imageUrl: `url(${imageMatchplaner})`,
      title: "Testspielbörse",
      content:
        "Mit dem MatchPlaner findest Du innerhalb von Sekunden den passenden Testspielgegner oder kannst selbst eine Anfrage erstellen. Schluss mit aufwändiger Kontaktpflege oder überfüllten WhatsApp-Gruppen. Sei clever und spare Zeit!",
      package: "Basis-Paket",
      price: "0.00",
    },
    {
      name: "ReisePlaner",
      id: "reiseplaner",
      imageUrl: `url(${imageReiseplaner})`,
      title: "Buchungsportal",
      content:
        "Der ReisePlaner spart Dir nicht nur Zeit, sondern auch Geld. Hier findest Du mit wenigen Klicks gruppen-geeignete Angebote zu Top-Preisen! Der ReisePlaner liefert Dir eine umfangreiche Angebotsübersicht. Vergiss lange Google-Suchen und Preisvergleiche!",
      package: "Basis-Paket",
      price: "0.00",
    },
    {
      name: "EventPlaner",
      id: "eventplaner",
      imageUrl: `url(${imageEventplaner})`,
      title: "Buchungsportal",
      content:
        "Du willst Dein Team stärken und gemeinsame Aktionen planen? Dann hilft Dir der EventPlaner passende und kostengünstige Angebote zu finden. Highlight: Im EventPlaner findest Du verknüpfte Angebote, mit denen Du noch mehr sparst. Profitiere von unschlagbaren Rabatten!",
      package: "Basis-Paket",
      price: "0.00",
    },
    {
      name: "TrainingsPlaner",
      id: "trainingsplaner",
      imageUrl: `url(${imageTrainingsplaner})`,
      title: "Übungsdatenbank",
      content:
        "Ein MUST-HAVE für jeden Fußballtrainer! Die Übungsdatenbank liefert Dir mehr als 10.000 verschiedene Übungen. Mithilfe des MP-Algorithmus wird jede Trainingseinheit individuell an Deine Ziele und Anforderungen angepasst. Das ist neu und einzigartig!",
      package: "...-Paket",
      price: "x.xx",
    },
    {
      name: "SaisonPlaner",
      id: "saisonplaner",
      imageUrl: `url(${imageSaisonplaner})`,
      title: "Trainingskalender",
      content:
        "Wenn Du Deine Mannschaft ohne nervige Konditionseinheiten fit machen willst, brauchst Du den SaisonPlaner. Der Trick: Optimale Belastungssteuerung basierend auf sportwissenschaftlichen Erkenntnissen! Plane Deine Saison wie die Profis!",
      package: "...-Paket",
      price: "x.xx",
    },
    {
      name: "TaktikPlaner",
      id: "taktikplaner",
      imageUrl: `url(${imageTaktikplaner})`,
      title: "Analysetool",
      content:
        "Mit dem TaktikPlaner hast Du Unterstützung am Spielfeldrand während des Spiels. Die In-Game-Analyse ermöglicht es Dir jeden Gegner zu entschlüsseln und die richtigen taktischen Vorgaben zu treffen, um Dein Team zum Erfolg zu coachen. Der mobile Taktikfuchs!",
      package: "...-Paket",
      price: "x.xx",
    },
    {
      name: "Ultimate Coach Bundle",
      id: "ultimate",
      imageUrl: `url(${imageMatchplaner})`,
      title: "Special Offer",
      content: "Komplettpaket: alle 6 Features inklusive",
      package: "...-Paket",
      price: "x.xx",
    },
  ];

  return (
    <>
      {/* each feature with full height */}

      {/* container for the (first) full screen height */}
      {/* Matchplaner */}
      <Grid
        container
        height="calc(100vh - 50px - 80px)" //full height - header - whitespace [mb + mt = 2 * (5 margin * 8px)]
        mb={5}
        mt={5}
        className="fullWidth"
        id="matchplaner"
      >
        <Box
          sx={{
            backgroundImage: `url(${imageMatchplaner})`,
            width: "100%",
            height: "100%",
            backgroundColor: "var(--lightblack)", // backup, if img does not load
            backgroundPosition: "center" /* Center the image */,
            backgroundRepeat: "no-repeat" /* Do not repeat the image */,
            backgroundSize:
              "cover" /* Resize the background image to cover the entire container */,
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{ height: "100%" }}
            justifyContent="center"
          >
            {/* Description */}
            <Grid
              item
              container
              xs={12}
              md={7}
              sx={{ height: "100%" }}
              alignItems="stretch"
            >
              <Card
                sx={{
                  background: "transparent",
                }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                >
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Grid item container direction="column" mb={4}>
                        <Typography>Feature 1</Typography>
                        <Typography
                          variant="h1green"
                          sx={{ lineHeight: "70px" }}
                        >
                          MatchPlaner
                        </Typography>
                        <Typography variant="h3white">
                          Testspielbörse
                        </Typography>
                      </Grid>
                      <Grid item container direction="column">
                        <Typography sx={{ lineHeight: "20px" }}>
                          Mit dem MatchPlaner findest Du innerhalb von Sekunden
                          den passenden Testspielgegner oder kannst selbst eine
                          Anfrage erstellen. Schluss mit aufwändiger
                          Kontaktpflege oder überfüllten WhatsApp-Gruppen. Sei
                          clever und spare Zeit!
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Zur Demo &amp; allen Details</Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
            {/* Pricing */}
            <Grid
              item
              container
              xs={0}
              md={5}
              sx={{ height: "100%" }}
              alignItems="stretch"
              display={{ xs: "none", md: "flex" }}
            >
              <Card sx={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                >
                  <CardContent>
                    <Grid container direction="column">
                      <Typography variant="h4green">Basis-Paket</Typography>
                      <Typography variant="h1green" sx={{ lineHeight: "70px" }}>
                        0,00&euro;
                      </Typography>
                      <Typography variant="h6white">
                        Paket wird automatisch verlängert
                      </Typography>
                      <Typography variant="h6white" mb={2}>
                        monatlich kündbar
                      </Typography>
                      <Typography>Inklusive Features</Typography>
                      <Grid
                        item
                        container
                        direction="column"
                        sx={{ lineHeight: "18px" }}
                      >
                        <Typography variant="h5white">
                          MatchPlaner - Testspielbörse
                        </Typography>
                        <Typography variant="h5white">
                          ReisePlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          EventPlaner - Buchungsportal
                        </Typography>
                        <Typography
                          variant="h5white"
                          sx={{
                            textDecoration: "line-through",
                            color: "rgba(255,255,255,0.2)",
                          }}
                        >
                          TrainingsPlaner - Übungsdatenbank
                        </Typography>
                        <Typography
                          variant="h5white"
                          sx={{
                            textDecoration: "line-through",
                            color: "rgba(255,255,255,0.2)",
                          }}
                        >
                          SaisonPlaner - Trainingskalender
                        </Typography>
                        <Typography
                          variant="h5white"
                          sx={{
                            textDecoration: "line-through",
                            color: "rgba(255,255,255,0.2)",
                          }}
                        >
                          TaktikPlaner - Analysetool
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Paket auswählen</Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* container for the (second) full screen height */}
      {/* Reiseplaner */}
      <Grid
        container
        height="calc(100vh - 50px - 80px)" //full height - header - whitespace [mb + mt = 2 * (5 margin * 8px)]
        mb={5}
        mt={5}
        className="fullWidth"
        id="reiseplaner"
      >
        <Box
          sx={{
            backgroundImage: `url(${imageReiseplaner})`,
            width: "100%",
            height: "100%",
            backgroundColor: "var(--lightblack)", // backup, if img does not load
            backgroundPosition: "center" /* Center the image */,
            backgroundRepeat: "no-repeat" /* Do not repeat the image */,
            backgroundSize:
              "cover" /* Resize the background image to cover the entire container */,
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{ height: "100%" }}
            justifyContent="center"
          >
            {/* Description */}
            <Grid
              item
              container
              xs={12}
              md={7}
              sx={{ height: "100%" }}
              alignItems="stretch"
            >
              <Card
                sx={{
                  background: "transparent",
                }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                >
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Grid item container direction="column" mb={4}>
                        <Typography>Feature 2</Typography>
                        <Typography
                          variant="h1green"
                          sx={{ lineHeight: "70px" }}
                        >
                          ReisePlaner
                        </Typography>
                        <Typography variant="h3white">
                          Buchungsportal
                        </Typography>
                      </Grid>
                      <Grid item container direction="column">
                        <Typography sx={{ lineHeight: "20px" }}>
                          Der ReisePlaner spart Dir nicht nur Zeit, sondern auch
                          Geld. Hier findest Du mit wenigen Klicks
                          gruppen-geeignete Angebote zu Top-Preisen! Der
                          ReisePlaner liefert Dir eine umfangreiche
                          Angebotsübersicht. Vergiss lange Google-Suchen und
                          Preisvergleiche!
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Zur Demo &amp; allen Details</Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
            {/* Pricing */}
            <Grid
              item
              container
              xs={0}
              md={5}
              sx={{ height: "100%" }}
              alignItems="stretch"
              display={{ xs: "none", md: "flex" }}
            >
              <Card sx={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                  // container for icon
                  position="relative"
                >
                  <Typography
                    variant="h1white"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: " translate(-50%, -50%) rotate(-0.06turn)",
                      // transform: "translate(-50%, -50%)",
                    }}
                  >
                    Coming Soon!
                  </Typography>

                  <Lock
                    sx={{
                      width: "80%",
                      height: "80%",
                      // center the icon over the text
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  />
                  {/* <CardContent>
                    <Grid container direction="column">
                      <Typography variant="h4green">Basis-Paket</Typography>
                      <Typography variant="h1green" sx={{ lineHeight: "70px" }}>
                        0,00&euro;
                      </Typography>
                      <Typography variant="h6white">
                        Paket wird automatisch verlängert
                      </Typography>
                      <Typography variant="h6white" mb={2}>
                        monatlich kündbar
                      </Typography>
                      <Typography>Inklusive Features</Typography>
                      <Grid
                        item
                        container
                        direction="column"
                        sx={{ lineHeight: "18px" }}
                      >
                        <Typography variant="h5white">
                          MatchPlaner - Testspielbörse
                        </Typography>
                        <Typography variant="h5white">
                          ReisePlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          EventPlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          TrainingsPlaner - Übungsdatenbank
                        </Typography>
                        <Typography variant="h5white">
                          SaisonPlaner - Trainingskalender
                        </Typography>
                        <Typography variant="h5white">
                          TaktikPlaner - Analysetool
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Paket auswählen</Button>
                  </CardActions> */}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* container for the (third) full screen height */}
      {/* Eventplaner */}
      <Grid
        container
        height="calc(100vh - 50px - 80px)" //full height - header - whitespace [mb + mt = 2 * (5 margin * 8px)]
        mb={5}
        mt={5}
        className="fullWidth"
        id="eventplaner"
      >
        <Box
          sx={{
            backgroundImage: `url(${imageEventplaner})`,
            width: "100%",
            height: "100%",
            backgroundColor: "var(--lightblack)", // backup, if img does not load
            backgroundPosition: "center top" /* Center/Top the image */,
            backgroundRepeat: "no-repeat" /* Do not repeat the image */,
            backgroundSize:
              "cover" /* Resize the background image to cover the entire container */,
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{ height: "100%" }}
            justifyContent="center"
          >
            {/* Description */}
            <Grid
              item
              container
              xs={12}
              md={7}
              sx={{ height: "100%" }}
              alignItems="stretch"
            >
              <Card
                sx={{
                  background: "transparent",
                }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                >
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Grid item container direction="column" mb={4}>
                        <Typography>Feature 3</Typography>
                        <Typography
                          variant="h1green"
                          sx={{ lineHeight: "70px" }}
                        >
                          EventPlaner
                        </Typography>
                        <Typography variant="h3white">
                          Buchungsportal
                        </Typography>
                      </Grid>
                      <Grid item container direction="column">
                        <Typography sx={{ lineHeight: "20px" }}>
                          Du willst Dein Team stärken und gemeinsame Aktionen
                          planen? Dann hilft Dir der EventPlaner passende und
                          kostengünstige Angebote zu finden. Highlight: Im
                          EventPlaner findest Du verknüpfte Angebote, mit denen
                          Du noch mehr sparst. Profitiere von unschlagbaren
                          Rabatten!
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Zur Demo &amp; allen Details</Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
            {/* Pricing */}
            <Grid
              item
              container
              xs={0}
              md={5}
              sx={{ height: "100%" }}
              alignItems="stretch"
              display={{ xs: "none", md: "flex" }}
            >
              <Card sx={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                  // container for icon
                  position="relative"
                >
                  <Typography
                    variant="h1white"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: " translate(-50%, -50%) rotate(-0.06turn)",
                      // transform: "translate(-50%, -50%)",
                    }}
                  >
                    Coming Soon!
                  </Typography>

                  <Lock
                    sx={{
                      width: "80%",
                      height: "80%",
                      // center the icon over the text
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  />
                  {/* <CardContent>
                    <Grid container direction="column">
                      <Typography variant="h4green">Basis-Paket</Typography>
                      <Typography variant="h1green" sx={{ lineHeight: "70px" }}>
                        0,00&euro;
                      </Typography>
                      <Typography variant="h6white">
                        Paket wird automatisch verlängert
                      </Typography>
                      <Typography variant="h6white" mb={2}>
                        monatlich kündbar
                      </Typography>
                      <Typography>Inklusive Features</Typography>
                      <Grid
                        item
                        container
                        direction="column"
                        sx={{ lineHeight: "18px" }}
                      >
                        <Typography variant="h5white">
                          MatchPlaner - Testspielbörse
                        </Typography>
                        <Typography variant="h5white">
                          ReisePlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          EventPlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          TrainingsPlaner - Übungsdatenbank
                        </Typography>
                        <Typography variant="h5white">
                          SaisonPlaner - Trainingskalender
                        </Typography>
                        <Typography variant="h5white">
                          TaktikPlaner - Analysetool
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Paket auswählen</Button>
                  </CardActions> */}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* container for the (fourth) full screen height */}
      {/* Trainingsplaner */}
      <Grid
        container
        height="calc(100vh - 50px - 80px)" //full height - header - whitespace [mb + mt = 2 * (5 margin * 8px)]
        mb={5}
        mt={5}
        className="fullWidth"
        id="trainingsplaner"
      >
        <Box
          sx={{
            backgroundImage: `url(${imageTrainingsplaner})`,
            width: "100%",
            height: "100%",
            backgroundColor: "var(--lightblack)", // backup, if img does not load
            backgroundPosition: "center" /* Center the image */,
            backgroundRepeat: "no-repeat" /* Do not repeat the image */,
            backgroundSize:
              "cover" /* Resize the background image to cover the entire container */,
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{ height: "100%" }}
            justifyContent="center"
          >
            {/* Description */}
            <Grid
              item
              container
              xs={12}
              md={7}
              sx={{ height: "100%" }}
              alignItems="stretch"
            >
              <Card
                sx={{
                  background: "transparent",
                }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                >
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Grid item container direction="column" mb={4}>
                        <Typography>Feature 4</Typography>
                        <Typography
                          variant="h1green"
                          sx={{ lineHeight: "70px" }}
                        >
                          TrainingsPlaner
                        </Typography>
                        <Typography variant="h3white">
                          Übungsdatenbank
                        </Typography>
                      </Grid>
                      <Grid item container direction="column">
                        <Typography sx={{ lineHeight: "20px" }}>
                          Ein MUST-HAVE für jeden Fußballtrainer! Die
                          Übungsdatenbank liefert Dir mehr als 10.000
                          verschiedene Übungen. Mithilfe des MP-Algorithmus wird
                          jede Trainingseinheit individuell an Deine Ziele und
                          Anforderungen angepasst. Das ist neu und einzigartig!
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Zur Demo &amp; allen Details</Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
            {/* Pricing */}
            <Grid
              item
              container
              xs={0}
              md={5}
              sx={{ height: "100%" }}
              alignItems="stretch"
              display={{ xs: "none", md: "flex" }}
            >
              <Card sx={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                  // container for icon
                  position="relative"
                >
                  <Typography
                    variant="h1white"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: " translate(-50%, -50%) rotate(-0.06turn)",
                      // transform: "translate(-50%, -50%)",
                    }}
                  >
                    Coming Soon!
                  </Typography>

                  <Lock
                    sx={{
                      width: "80%",
                      height: "80%",
                      // center the icon over the text
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  />
                  {/* <CardContent>
                    <Grid container direction="column">
                      <Typography variant="h4green">Basis-Paket</Typography>
                      <Typography variant="h1green" sx={{ lineHeight: "70px" }}>
                        0,00&euro;
                      </Typography>
                      <Typography variant="h6white">
                        Paket wird automatisch verlängert
                      </Typography>
                      <Typography variant="h6white" mb={2}>
                        monatlich kündbar
                      </Typography>
                      <Typography>Inklusive Features</Typography>
                      <Grid
                        item
                        container
                        direction="column"
                        sx={{ lineHeight: "18px" }}
                      >
                        <Typography variant="h5white">
                          MatchPlaner - Testspielbörse
                        </Typography>
                        <Typography variant="h5white">
                          ReisePlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          EventPlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          TrainingsPlaner - Übungsdatenbank
                        </Typography>
                        <Typography variant="h5white">
                          SaisonPlaner - Trainingskalender
                        </Typography>
                        <Typography variant="h5white">
                          TaktikPlaner - Analysetool
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Paket auswählen</Button>
                  </CardActions> */}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* container for the (fifth) full screen height */}
      {/* Saisonplaner */}
      <Grid
        container
        height="calc(100vh - 50px - 80px)" //full height - header - whitespace [mb + mt = 2 * (5 margin * 8px)]
        mb={5}
        mt={5}
        className="fullWidth"
        id="saisonplaner"
      >
        <Box
          sx={{
            backgroundImage: `url(${imageSaisonplaner})`,
            width: "100%",
            height: "100%",
            backgroundColor: "var(--lightblack)", // backup, if img does not load
            backgroundPosition: "center" /* Center the image */,
            backgroundRepeat: "no-repeat" /* Do not repeat the image */,
            backgroundSize:
              "cover" /* Resize the background image to cover the entire container */,
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{ height: "100%" }}
            justifyContent="center"
          >
            {/* Description */}
            <Grid
              item
              container
              xs={12}
              md={7}
              sx={{ height: "100%" }}
              alignItems="stretch"
            >
              <Card
                sx={{
                  background: "transparent",
                }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                >
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Grid item container direction="column" mb={4}>
                        <Typography>Feature 5</Typography>
                        <Typography
                          variant="h1green"
                          sx={{ lineHeight: "70px" }}
                        >
                          SaisonPlaner
                        </Typography>
                        <Typography variant="h3white">
                          Trainingskalender
                        </Typography>
                      </Grid>
                      <Grid item container direction="column">
                        <Typography sx={{ lineHeight: "20px" }}>
                          Wenn Du Deine Mannschaft ohne nervige
                          Konditionseinheiten fit machen willst, brauchst Du den
                          SaisonPlaner. Der Trick: Optimale Belastungssteuerung
                          basierend auf sportwissenschaftlichen Erkenntnissen!
                          Plane Deine Saison wie die Profis!
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Zur Demo &amp; allen Details</Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
            {/* Pricing */}
            <Grid
              item
              container
              xs={0}
              md={5}
              sx={{ height: "100%" }}
              alignItems="stretch"
              display={{ xs: "none", md: "flex" }}
            >
              <Card sx={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                  // container for icon
                  position="relative"
                >
                  <Typography
                    variant="h1white"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: " translate(-50%, -50%) rotate(-0.06turn)",
                      // transform: "translate(-50%, -50%)",
                    }}
                  >
                    Coming Soon!
                  </Typography>

                  <Lock
                    sx={{
                      width: "80%",
                      height: "80%",
                      // center the icon over the text
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  />
                  {/* <CardContent>
                    <Grid container direction="column">
                      <Typography variant="h4green">Basis-Paket</Typography>
                      <Typography variant="h1green" sx={{ lineHeight: "70px" }}>
                        0,00&euro;
                      </Typography>
                      <Typography variant="h6white">
                        Paket wird automatisch verlängert
                      </Typography>
                      <Typography variant="h6white" mb={2}>
                        monatlich kündbar
                      </Typography>
                      <Typography>Inklusive Features</Typography>
                      <Grid
                        item
                        container
                        direction="column"
                        sx={{ lineHeight: "18px" }}
                      >
                        <Typography variant="h5white">
                          MatchPlaner - Testspielbörse
                        </Typography>
                        <Typography variant="h5white">
                          ReisePlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          EventPlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          TrainingsPlaner - Übungsdatenbank
                        </Typography>
                        <Typography variant="h5white">
                          SaisonPlaner - Trainingskalender
                        </Typography>
                        <Typography variant="h5white">
                          TaktikPlaner - Analysetool
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Paket auswählen</Button>
                  </CardActions> */}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* container for the (sixth) full screen height */}
      {/* Taktikplaner */}
      <Grid
        container
        height="calc(100vh - 50px - 80px)" //full height - header - whitespace [mb + mt = 2 * (5 margin * 8px)]
        mb={5}
        mt={5}
        className="fullWidth"
        id="taktikplaner"
      >
        <Box
          sx={{
            backgroundImage: `url(${imageTaktikplaner})`,
            width: "100%",
            height: "100%",
            backgroundColor: "var(--lightblack)", // backup, if img does not load
            backgroundPosition: "center" /* Center the image */,
            backgroundRepeat: "no-repeat" /* Do not repeat the image */,
            backgroundSize:
              "cover" /* Resize the background image to cover the entire container */,
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{ height: "100%" }}
            justifyContent="center"
          >
            {/* Description */}
            <Grid
              item
              container
              xs={12}
              md={7}
              sx={{ height: "100%" }}
              alignItems="stretch"
            >
              <Card
                sx={{
                  background: "transparent",
                }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                >
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Grid item container direction="column" mb={4}>
                        <Typography>Feature 6</Typography>
                        <Typography
                          variant="h1green"
                          sx={{ lineHeight: "70px" }}
                        >
                          TaktikPlaner
                        </Typography>
                        <Typography variant="h3white">Analysetool</Typography>
                      </Grid>
                      <Grid item container direction="column">
                        <Typography sx={{ lineHeight: "20px" }}>
                          Mit dem TaktikPlaner hast Du Unterstützung am
                          Spielfeldrand während des Spiels. Die In-Game-Analyse
                          ermöglicht es Dir jeden Gegner zu entschlüsseln und
                          die richtigen taktischen Vorgaben zu treffen, um Dein
                          Team zum Erfolg zu coachen. Der mobile Taktikfuchs!
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Zur Demo &amp; allen Details</Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
            {/* Pricing */}
            <Grid
              item
              container
              xs={0}
              md={5}
              sx={{ height: "100%" }}
              alignItems="stretch"
              display={{ xs: "none", md: "flex" }}
            >
              <Card sx={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                  // container for icon
                  position="relative"
                >
                  <Typography
                    variant="h1white"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: " translate(-50%, -50%) rotate(-0.06turn)",
                      // transform: "translate(-50%, -50%)",
                    }}
                  >
                    Coming Soon!
                  </Typography>

                  <Lock
                    sx={{
                      width: "80%",
                      height: "80%",
                      // center the icon over the text
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  />
                  {/* <CardContent>
                    <Grid container direction="column">
                      <Typography variant="h4green">Basis-Paket</Typography>
                      <Typography variant="h1green" sx={{ lineHeight: "70px" }}>
                        0,00&euro;
                      </Typography>
                      <Typography variant="h6white">
                        Paket wird automatisch verlängert
                      </Typography>
                      <Typography variant="h6white" mb={2}>
                        monatlich kündbar
                      </Typography>
                      <Typography>Inklusive Features</Typography>
                      <Grid
                        item
                        container
                        direction="column"
                        sx={{ lineHeight: "18px" }}
                      >
                        <Typography variant="h5white">
                          MatchPlaner - Testspielbörse
                        </Typography>
                        <Typography variant="h5white">
                          ReisePlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          EventPlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          TrainingsPlaner - Übungsdatenbank
                        </Typography>
                        <Typography variant="h5white">
                          SaisonPlaner - Trainingskalender
                        </Typography>
                        <Typography variant="h5white">
                          TaktikPlaner - Analysetool
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Paket auswählen</Button>
                  </CardActions> */}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* container for the (seventh) full screen height */}
      {/* Ultimate */}
      <Grid
        container
        height="calc(100vh - 50px - 80px)" //full height - header - whitespace [mb + mt = 2 * (5 margin * 8px)]
        mb={5}
        mt={5}
        className="fullWidth"
        id="ultimate"
      >
        <Box
          sx={{
            backgroundImage: `url(${imageMatchplaner})`,
            width: "100%",
            height: "100%",
            backgroundColor: "var(--lightblack)", // backup, if img does not load
            backgroundPosition: "center" /* Center the image */,
            backgroundRepeat: "no-repeat" /* Do not repeat the image */,
            backgroundSize:
              "cover" /* Resize the background image to cover the entire container */,
            border: "2px solid var(--lightgreen)",
          }}
        >
          <Grid
            container
            alignItems="center"
            sx={{ height: "100%" }}
            justifyContent="center"
          >
            {/* Description */}
            <Grid
              item
              container
              xs={12}
              md={7}
              sx={{ height: "100%" }}
              alignItems="stretch"
            >
              <Card
                sx={{
                  background: "transparent",
                }}
              >
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                >
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Grid item container direction="column" mb={4}>
                        <Typography>Special Offer</Typography>
                        <Typography
                          variant="h1green"
                          sx={{ lineHeight: "70px" }}
                        >
                          Ultimate Coach Bundle
                        </Typography>
                        <Typography variant="h3white">
                          Zeitlich begrenzt
                        </Typography>
                      </Grid>
                      <Grid item container direction="column">
                        <Typography sx={{ lineHeight: "20px" }}>
                          Komplettpaket
                        </Typography>
                        <Typography sx={{ lineHeight: "20px" }}>
                          Alle 6 Features inklusive
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  {/* <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Zur Demo &amp; allen Details</Button>
                  </CardActions> */}
                </Grid>
              </Card>
            </Grid>
            {/* Pricing */}
            <Grid
              item
              container
              xs={0}
              md={5}
              sx={{ height: "100%" }}
              alignItems="stretch"
              display={{ xs: "none", md: "flex" }}
            >
              <Card sx={{ backgroundColor: "rgba(0,0,0,0.5)", width: "100%" }}>
                <Grid
                  container
                  direction="column"
                  sx={{ height: "100%" }}
                  justifyContent="space-between"
                  // container for icon
                  position="relative"
                >
                  <Typography
                    variant="h1white"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: " translate(-50%, -50%) rotate(-0.06turn)",
                      // transform: "translate(-50%, -50%)",
                    }}
                  >
                    Coming Soon!
                  </Typography>

                  <Lock
                    sx={{
                      width: "80%",
                      height: "80%",
                      // center the icon over the text
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  />
                  {/* <CardContent>
                    <Grid container direction="column">
                      <Typography variant="h4green">Basis-Paket</Typography>
                      <Typography variant="h1green" sx={{ lineHeight: "70px" }}>
                        0,00&euro;
                      </Typography>
                      <Typography variant="h6white">
                        Paket wird automatisch verlängert
                      </Typography>
                      <Typography variant="h6white" mb={2}>
                        monatlich kündbar
                      </Typography>
                      <Typography>Inklusive Features</Typography>
                      <Grid
                        item
                        container
                        direction="column"
                        sx={{ lineHeight: "18px" }}
                      >
                        <Typography variant="h5white">
                          MatchPlaner - Testspielbörse
                        </Typography>
                        <Typography variant="h5white">
                          ReisePlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          EventPlaner - Buchungsportal
                        </Typography>
                        <Typography variant="h5white">
                          TrainingsPlaner - Übungsdatenbank
                        </Typography>
                        <Typography variant="h5white">
                          SaisonPlaner - Trainingskalender
                        </Typography>
                        <Typography variant="h5white">
                          TaktikPlaner - Analysetool
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button>Paket auswählen</Button>
                  </CardActions> */}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* container for the (eigth) full screen height */}
      {/* overview + register */}
      <Grid
        container
        // height="calc(100vh - 84px - 80px)" //full height - header - whitespace [mb + mt = 2 * (5 margin * 8px)]
        mb={5}
        mt={5}
        className="fullWidth"
        id="overview"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "var(--lightblack)",
            // border: "2px solid var(--lightgreen)",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            // sx={{ height: "100%" }}
          >
            <Typography variant="h2green">Alle Pakete im Überblick</Typography>

            {/* overview with cards */}
            <Grid
              container
              justifyContent="center"
              // alignItems="stretch"
              // columnSpacing="5px"
              // direction={{ xs: "column", md: "row" }}
              direction="row"
            >
              {/* basis paket */}
              <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <Card sx={{ height: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    sx={{ height: "100%" }}
                  >
                    <Typography sx={{ visibility: "hidden" }}>
                      Wir empfehlen
                    </Typography>
                    <CardHeader
                      title="Basis Paket"
                      titleTypographyProps={{
                        fontSize: "14px",
                        color: "white",
                      }}
                      // sx={{ pb: "0", height: "10%" }}
                    />
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100%" }}
                      >
                        <Grid item container direction="column">
                          <Typography variant="h3green">0,00&euro;</Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--lightgreen)", fontSize: "6px" }}
                          >
                            pro Monat
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            Paket wird automatisch verlängert
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            monatlich kündbar
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h6green"
                            sx={{ fontSize: "8px" }}
                          >
                            30 Tage kostenlose Testphase
                          </Typography>
                        </Grid>
                        <Grid item container direction="column">
                          <Typography variant="body2white">Features</Typography>
                          <Typography variant="body1white">
                            MatchPlaner
                          </Typography>
                          <Typography variant="body1white">
                            ReisePlaner
                          </Typography>
                          <Typography variant="body1white">
                            EventPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            TrainingsPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            SaisonPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            TaktikPlaner
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography sx={{ visibility: "hidden" }}>
                        Du sparst: 7,98&euro;
                      </Typography>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
              {/* ultimate coach bundle */}
              <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <Card sx={{ height: "100%", border: "2px solid white" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    sx={{ height: "100%" }}
                  >
                    <Typography>Wir empfehlen</Typography>
                    <CardHeader
                      title="UltimateCoach Bundle"
                      titleTypographyProps={{
                        fontSize: "14px",
                        color: "white",
                      }}
                      // sx={{ pb: "0", height: "10%" }}
                    />
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100%" }}
                      >
                        <Grid item container direction="column">
                          <Typography variant="h3green">19,99&euro;</Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--lightgreen)", fontSize: "6px" }}
                          >
                            pro Monat
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            Paket wird automatisch verlängert
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            monatlich kündbar
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h6green"
                            sx={{
                              fontSize: "8px",
                              // fontSize: "10px",
                              // color: "var(--lightgreen)",
                              // lineHeight: "70%", //TODO: schauen, warum alles unter 1 nicht angenommen wird?!
                            }}
                          >
                            30 Tage kostenlose Testphase
                          </Typography>
                        </Grid>
                        <Grid item container direction="column">
                          <Typography variant="body2white">Features</Typography>
                          <Typography variant="body1white">
                            MatchPlaner
                          </Typography>
                          <Typography variant="body1white">
                            ReisePlaner
                          </Typography>
                          <Typography variant="body1white">
                            EventPlaner
                          </Typography>
                          <Typography variant="body1white">
                            TrainingsPlaner
                          </Typography>
                          <Typography variant="body1white">
                            SaisonPlaner
                          </Typography>
                          <Typography variant="body1white">
                            TaktikPlaner
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="h6white">
                        Du sparst: 7,98&euro;
                      </Typography>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
              {/* trainingsplaner paket */}
              <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <Card sx={{ height: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    sx={{ height: "100%" }}
                  >
                    <Typography sx={{ visibility: "hidden" }}>
                      Wir empfehlen
                    </Typography>
                    <CardHeader
                      title="TrainingsPlaner Paket"
                      titleTypographyProps={{
                        fontSize: "14px",
                        color: "white",
                      }}
                      // sx={{ pb: "0", height: "10%" }}
                    />
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100%" }}
                      >
                        <Grid item container direction="column">
                          <Typography variant="h3green">12,99&euro;</Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--lightgreen)", fontSize: "6px" }}
                          >
                            pro Monat
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            Paket wird automatisch verlängert
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            monatlich kündbar
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h6green"
                            sx={{ fontSize: "8px" }}
                          >
                            30 Tage kostenlose Testphase
                          </Typography>
                        </Grid>
                        <Grid item container direction="column">
                          <Typography variant="body2white">Features</Typography>
                          <Typography variant="body1white">
                            MatchPlaner
                          </Typography>
                          <Typography variant="body1white">
                            ReisePlaner
                          </Typography>
                          <Typography variant="body1white">
                            EventPlaner
                          </Typography>
                          <Typography variant="body1white">
                            TrainingsPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            SaisonPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            TaktikPlaner
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography sx={{ visibility: "hidden" }}>
                        Du sparst: 7,98&euro;
                      </Typography>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
              {/* saisonplaner paket */}
              <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <Card sx={{ height: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    sx={{ height: "100%" }}
                  >
                    <Typography sx={{ visibility: "hidden" }}>
                      Wir empfehlen
                    </Typography>
                    <CardHeader
                      title="SaisonPlaner Paket"
                      titleTypographyProps={{
                        fontSize: "14px",
                        color: "white",
                      }}
                      // sx={{ pb: "0", height: "10%" }}
                    />
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100%" }}
                      >
                        <Grid item container direction="column">
                          <Typography variant="h3green">9,99&euro;</Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--lightgreen)", fontSize: "6px" }}
                          >
                            pro Monat
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            Paket wird automatisch verlängert
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            monatlich kündbar
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h6green"
                            sx={{ fontSize: "8px" }}
                          >
                            30 Tage kostenlose Testphase
                          </Typography>
                        </Grid>
                        <Grid item container direction="column">
                          <Typography variant="body2white">Features</Typography>
                          <Typography variant="body1white">
                            MatchPlaner
                          </Typography>
                          <Typography variant="body1white">
                            ReisePlaner
                          </Typography>
                          <Typography variant="body1white">
                            EventPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            TrainingsPlaner
                          </Typography>
                          <Typography variant="body1white">
                            SaisonPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            TaktikPlaner
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography sx={{ visibility: "hidden" }}>
                        Du sparst: 7,98&euro;
                      </Typography>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
              {/* taktikplaner paket */}
              <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={4}
                lg={2}
              >
                <Card sx={{ height: "100%" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    sx={{ height: "100%" }}
                  >
                    <Typography sx={{ visibility: "hidden" }}>
                      Wir empfehlen
                    </Typography>
                    <CardHeader
                      title="TaktikPlaner Paket"
                      titleTypographyProps={{
                        fontSize: "14px",
                        color: "white",
                      }}
                      // sx={{ pb: "0", height: "10%" }}
                    />
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100%" }}
                      >
                        <Grid item container direction="column">
                          <Typography variant="h3green">4,99&euro;</Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "var(--lightgreen)", fontSize: "6px" }}
                          >
                            pro Monat
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            Paket wird automatisch verlängert
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{ fontSize: "6px" }}
                          >
                            monatlich kündbar
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h6green"
                            sx={{ fontSize: "8px" }}
                          >
                            30 Tage kostenlose Testphase
                          </Typography>
                        </Grid>
                        <Grid item container direction="column">
                          <Typography variant="body2white">Features</Typography>
                          <Typography variant="body1white">
                            MatchPlaner
                          </Typography>
                          <Typography variant="body1white">
                            ReisePlaner
                          </Typography>
                          <Typography variant="body1white">
                            EventPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            TrainingsPlaner
                          </Typography>
                          <Typography
                            variant="body1white"
                            sx={{
                              textDecoration: "line-through",
                              color: "rgba(255,255,255,0.2)",
                            }}
                          >
                            SaisonPlaner
                          </Typography>
                          <Typography variant="body1white">
                            TaktikPlaner
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography sx={{ visibility: "hidden" }}>
                        Du sparst: 7,98&euro;
                      </Typography>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
            </Grid>

            <Typography variant="body1white">
              ----Aktivierungsgebühr für den Verein----
            </Typography>
          </Grid>
          <Link to="/register">
            <Button>Jetzt registrieren</Button>
          </Link>
        </Box>
      </Grid>
    </>
  );
}

export default Features;
