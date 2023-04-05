import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import feature_mp from "../images/feature_mp.jpg";
import feature_trp from "../images/feature_trp2.jpg";
import feature_sp from "../images/feature_sp.jpg";
import feature_vp from "../images/feature_vp.png";
import feature_tap from "../images/feature_tap.jpg";
import feature_ep from "../images/feature_ep.jpg";
import $ from "jquery";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Carousel } from "../components/Carousel";
import { FAQs } from "../components/Accordion";
import React from "react";
import Footer from "../components/Footer";
import Catcher from "./Start/Catcher";
import FeaturesMobile from "./Start/FeaturesMobile"
import Agreement from "./Start/Agreement";
import Advantages from "./Start/Advantages";
import Features from "./Start/Features"
import Description from "./Start/Description";
import Pricing from "./Start/Pricing"
import Exist from "./Start/Exist";
import SEO from "../components/SEO";

import { setAgreementCounter } from "../features/user/userActions";
import { useSelector, useDispatch } from "react-redux";
import { setFacts, getFacts } from "../features/user/userAPI";

function Start() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Start";
  }, []);

  // reference theme to get access
  const theme = useTheme();

  // get height of header
  let heightHeader = 64;
  useEffect(() => {
    let header = document.getElementById("header");
    heightHeader = header.clientHeight;
  }, []);

  let heightFooter;
  useEffect(() => {
    let footer = document.getElementById("footer");
    heightFooter = footer.clientHeight;
  }, []);

  // fetch basic facts (number of user who liked the statement)
  const [counterAgreement, setCounterAgreement] = useState(0);

  const fetchFacts = async () => {
    const cArray = await getFacts();
    const c = cArray[0].agreementCounter;
    // console.log("fetch: ", c);
    setCounterAgreement(c);
  };
  useEffect(() => {
    fetchFacts();
  }, []);

  // create animations
  const animateString = (text, element, intervalDuration) => {
    // wait until numbers are loaded
    setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        const part = text.substring(0, ++count);
        requestAnimationFrame(() => {
          element.textContent = part;
        });
        if (count === text.length) {
          clearInterval(interval);
        }
      }, intervalDuration);
    }, 2000);
  };
  const animateCounter = (countTo, step, element, totalDuration) => {
    let count = 0;
    let intervalDuration = totalDuration / (countTo / step);
    // console.log(intervalDuration, totalDuration, countTo / step);
    // total = interval * sumSteps
    // sumSteps = countTo / step
    // interval = total/sumSteps = total / (countTo / step)
    const interval = setInterval(() => {
      count += step;
      const part = count;
      requestAnimationFrame(() => {
        element.textContent = part;
      });
      if (count >= countTo) {
        clearInterval(interval);
      }
    }, intervalDuration);
  };
  const [greenString, setGreenString] = useState(true);
  const animateWords = (textArray, element, intervalDuration) => {
    let counter = 0;
    const interval = setInterval(() => {
      const part = textArray[counter];
      if (part.includes("alles machen")) {
        setGreenString(true);
      } else {
        setGreenString(false);
      }
      requestAnimationFrame(() => {
        element.textContent = part;
      });
      counter++;
      if (counter === textArray.length) {
        counter = 0;
      }
    }, intervalDuration);
    return interval;
  };
  const [viewFeature, setViewFeature] = useState("mp");
  const showFeatures = ["mp", "trp", "sp", "vp", "tap", "ep"];
  const picturesFeatures = [
    feature_mp,
    feature_trp,
    feature_sp,
    feature_vp,
    feature_tap,
    feature_ep,
  ];
  const [pictureFeatures, setPictureFeature] = useState(feature_mp);
  const [mouseOver, setMouseOver] = useState(false);
  const animateFeatures = (intervalDuration) => {
    let counter = showFeatures.findIndex((el) => el.includes(viewFeature));
    setPictureFeature(picturesFeatures[counter]);
    const interval = setInterval(() => {
      if (!mouseOver && window.innerWidth >= 600) {
        counter++;
        if (counter === showFeatures.length) {
          counter = 0;
        }
        setPictureFeature(picturesFeatures[counter]);
        setViewFeature(showFeatures[counter]);
      }
    }, intervalDuration);
    return interval;
  };
  useEffect(() => {
    animateString("Co-Trainer", document.getElementById("banner"), 200);

    animateCounter(
      6000,
      200,
      document.getElementById("facts-amount-coaches"),
      2000
    );
    animateCounter(
      5,
      1,
      document.getElementById("facts-amount-trainings"),
      2000
    );
    animateCounter(
      3000,
      100,
      document.getElementById("facts-amount-matches"),
      2000
    );

    const wordsInterval = animateWords(
      [
        "organisieren.",
        "kommunizieren.",
        "verwalten.",
        "analysieren.",
        "alles machen.",
        "schlichten.",
        "vorbereiten.",
        "planen.",
        "motivieren.",
        "alles machen.",
        "vermitteln.",
        "vorangehen.",
        "taktieren.",
        "trösten.",
        "alles machen.",
        "reagieren.",
        "entscheiden.",
        "dazulernen.",
        "erziehen.",
        "alles machen.",
      ],
      document.getElementById("coach-tasks"),
      1200
    );

    return () => {
      clearInterval(wordsInterval);
    };
  }, []);
  useEffect(() => {
    let featureInterval = animateFeatures(3000);
    if (mouseOver && featureInterval) {
      clearInterval(featureInterval);
    }
    return () => {
      clearInterval(featureInterval);
    };
  }, [mouseOver]);

  const isNarrow = window.innerHeight < 500; 

  return (
    <div
      style={{
        height: `calc(100vh - ${heightHeader}px)`, // full height - header
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {/* SEO using Helmet */}
      <SEO
      title="Matchplaner | Start"
      description="MatchPlaner ist dein Trainigsplaner für Amateurfußballer_innen. Als Trainer_in erhältst du mit
                  MatchPlaner ein hochwertiges Tool zur Erleichterung und Professionalisierung Deiner Trainerarbeit.
                  Ob es die Organisation von Trainingslagern und Teamevents, die Planung von Testspielen, Trainingseinheiten
                  oder gar einer ganzen Saison ist - MatchPlaner automatisiert zahlreiche Aufgaben!"
      name="Matchplaner" 
      type="article"
      url="www.matchplaner.com/"
      />
      {/* catcher */}
      <Catcher heightHeader={heightHeader} isNarrow={isNarrow}/>
      {/* agreement */}
      <Agreement color={greenString} 
        setCounterAgreement={setCounterAgreement}
        counterAgreement={counterAgreement}
        heightHeader={heightHeader}
        isNarrow={isNarrow}
        />
      {/* advantages */}
      <Advantages heightHeader={heightHeader} isNarrow={isNarrow}/>
      {/* description */}
      <Description heightHeader={heightHeader} isNarrow={isNarrow}/>
      {/* features */}
      <Box display={{xs: "none", sm: "block"}}>
        <Features
                  viewFeature={viewFeature}
                  setViewFeature={setViewFeature}
                  setMouseOver={setMouseOver}
                  pictureFeatures={pictureFeatures}
                  heightHeader={heightHeader}
                  isNarrow={isNarrow}/>
      </Box>
      <Box display={{xs: "block", sm: "none"}}>
        <FeaturesMobile
                  viewFeature={viewFeature}
                  setViewFeature={setViewFeature}
                  setMouseOver={setMouseOver}
                  pictureFeatures={pictureFeatures}
                  heightHeader={heightHeader}/>
      </Box>
      {/* pricing */}
      <Pricing heightHeader={heightHeader} isNarrow={isNarrow}/>
      {/* app */}
      {/* <Grid
        container
        height={`calc(100vh - ${heightHeader}px)`} // full height - header
        id="app"
        position="relative"
        sx={{ scrollSnapAlign: "start" }}
      >
        <Container>
          <Grid item xs={6}>
            <Box
              sx={{
                backgroundColor: theme.palette.customDark.main,
                borderRadius: "5px",
                height: "150px",
                padding: "10px",
              }}
            >
              <Grid container>
                <Grid item container justifyContent="space-between">
                  <Typography color="primary" fontWeight="bold">
                    Mega Trainingsplanung
                  </Typography>
                  <Grid item>
                    <Star color="primary" />
                    <Star color="primary" />
                    <Star color="primary" />
                    <Star color="primary" />
                    <Star color="primary" />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography textAlign="start">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt eligendi laborum sequi minima ipsa rerum a suscipit
                    illo? Repellat vel excepturi quas magni amet quam ducimus
                    iusto at voluptates saepe?
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Container>
        <Container>
          <Grid item xs={6}>
            <Box
              sx={{
                backgroundColor: theme.palette.customDark.main,
                borderRadius: "5px",
                height: "150px",
                padding: "10px",
              }}
            >
              <Grid container>
                <Grid item container justifyContent="space-between">
                  <Typography color="primary" fontWeight="bold">
                    Gut verknüpft
                  </Typography>
                  <Grid item>
                    <Star color="primary" />
                    <Star color="primary" />
                    <Star color="primary" />
                    <Star color="primary" />
                    <StarBorder color="primary" />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography textAlign="start">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt eligendi laborum sequi minima ipsa rerum a suscipit
                    illo? Repellat vel excepturi quas magni amet quam ducimus
                    iusto at voluptates saepe?
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Container>
        <Container>
          <Grid item xs={6}>
            <Box
              sx={{
                backgroundColor: theme.palette.customDark.main,
                borderRadius: "5px",
                height: "150px",
                padding: "10px",
              }}
            >
              <Grid container>
                <Grid item container justifyContent="space-between">
                  <Typography color="primary" fontWeight="bold">
                    Ich bin begeistert!
                  </Typography>
                  <Grid item>
                    <Star color="primary" />
                    <Star color="primary" />
                    <Star color="primary" />
                    <Star color="primary" />
                    <StarHalf color="primary" />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography textAlign="start">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt eligendi laborum sequi minima ipsa rerum a suscipit
                    illo? Repellat vel excepturi quas magni amet quam ducimus
                    iusto at voluptates saepe?
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Container>
        <Box
          position="absolute"
          top="50%"
          right="25%"
          sx={{ transform: "translate(50%, -50%)" }}
        >
          <Button size="large">Registrieren</Button>
          <Typography textTransform="uppercase">Oder hol die App!</Typography>
          image of app store and play store
        </Box>
      </Grid> */}
      {/* EXIST */}
      <div    
        sx={{
          minHeight: isNarrow ? "auto" : `calc(100vh - ${heightHeader}px)`, // full height - header
          height: isNarrow ? "auto" : `calc(100vh - ${heightHeader}px)`, // full height - header
          position: "relative",
      }}>
        <Exist heightFooter={heightFooter} heightHeader={heightHeader} isNarrow={isNarrow}/>
        <Footer 
          sx={{
            position: "absolute",
            left:"0",
            bottom:"0",
            right:"0",
          }}
        />
      </div>
    </div>
  );
}

export default Start;
