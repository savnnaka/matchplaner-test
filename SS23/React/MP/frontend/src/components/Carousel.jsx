import {
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CImage,
} from "@coreui/react";
import { Button, Typography } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import imageMatchplaner from "../images/tool-matchplaner-color-without-border.jpg";
import imageEventplaner from "../images/tool-eventplaner-color-without-border.jpg";
import imageReiseplaner from "../images/tool-reiseplaner-color-without-border.jpg";
import imageTrainingsplaner from "../images/tool-trainingsplaner-color-without-border.jpg";
import imageTaktikplaner from "../images/tool-taktikplaner-color-without-border.jpg";
import imageSaisonplaner from "../images/tool-saisonplaner-color-without-border.jpg";

export const Carousel = () => {
  // basic settings for calc of offset
  const headerOffset = 84;
  const spaceOffset = 40;

  return (
    <>
      <CCarousel
        controls
        indicators
        transition="crossfade"
        className="d-none d-lg-block"
        style={{
          width: "100%",
          height: "100%",
        }}
        pause="hover"
        // interval={false}
      >
        <CCarouselItem className="h-100">
          <CImage
            className="d-block w-100 h-100"
            src={imageMatchplaner}
            alt="slide 1"
            style={{
              objectFit: "cover",
              backgroundColor: "var(--lightblack)", // backup, if img does not load
            }}
          />

          <CCarouselCaption className="d-none d-md-block">
            {/* <Typography variant="h3green">1.000+ Vereine</Typography> <br /> */}
            <Typography variant="h4green">
              sind bereit Teil der Community
            </Typography>
            <br />
            <Typography variant="h5white">Testspielgegner gesucht?</Typography>
            <br />
            <Typography variant="h1green">MatchPlaner</Typography> <br />
            <Typography variant="h2white">Testspielbörse</Typography> <br />
            <Typography variant="body1white">
              eigene Testspielanfragen erstellen <br />
              Gegner finden in 30 Sekunden <br />
              direkte Kommunikation <br />
              regional &amp; national <br />
              kostenloser Zugang
            </Typography>
            <br />
            <HashLink
              // to="/features#matchplaner"
              to="/login"
              scroll={(el) => {
                // get position of element (in feature site)
                const elPosition = el.getBoundingClientRect().top;
                // include the offsets (header, whitespace)
                const offsetPosition =
                  elPosition + window.pageYOffset - headerOffset - spaceOffset;
                // scroll to the calculated value
                window.scrollTo({
                  behavior: "smooth",
                  // block: "start",
                  top: offsetPosition,
                });
              }}
            >
              <Button>Los geht&apos;s!</Button>
            </HashLink>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem className="h-100">
          <CImage
            className="d-block w-100 h-100"
            src={imageReiseplaner}
            alt="slide 2"
            style={{
              objectFit: "cover",
              backgroundColor: "var(--lightblack)", // backup, if img does not load
            }}
          />

          <CCarouselCaption className="d-none d-md-block carousel-container ">
            {/* <Typography variant="h3green">3.000+ Unterkünfte</Typography> <br /> */}
            <Typography variant="h4green">
              in Deutschland, Österreich &amp; Schweiz
            </Typography>{" "}
            <br />
            <Typography variant="h5white">
              Auf der Suche nach der perfekten Unterkunft für ein Trainingslager
              oder die Abschlussfahrt?
            </Typography>{" "}
            <br />
            <Typography variant="h1green">ReisePlaner</Typography> <br />
            <Typography variant="h2white">Buchungsportal</Typography> <br />
            <Typography variant="body1white">
              Angebote mit Gruppenrabatt &amp; Stornierungsoption <br />
              ausgewählte Sportunterkünfte <br />
              direkter Zugang zu Sportanlagen <br />
              Sofortbuchung möglich
              <br />
              kostenloser Zugang
            </Typography>
            <br />
            <HashLink
              // to="/features#reiseplaner"
              to="/login"
              scroll={(el) => {
                const elPosition = el.getBoundingClientRect().top;

                const offsetPosition =
                  elPosition + window.pageYOffset - headerOffset - spaceOffset;
                // el.scrollIntoView({
                window.scrollTo({
                  behavior: "smooth",
                  // block: "start",
                  top: offsetPosition,
                });
              }}
            >
              <Button>Los geht&apos;s!</Button>
            </HashLink>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem className="h-100">
          <CImage
            className="d-block w-100 h-100"
            src={imageEventplaner}
            alt="slide 3"
            style={{
              objectFit: "cover",
              backgroundColor: "var(--lightblack)", // backup, if img does not load
            }}
          />

          <CCarouselCaption className="d-none d-md-block carousel-container">
            {/* <Typography variant="h3green">500+ Locations</Typography> <br /> */}
            <Typography variant="h4green">
              in Deutschland, Österreich &amp; Schweiz
            </Typography>{" "}
            <br />
            <Typography variant="h5white">
              Bock auf ein Teamevent? Bowling, Soccerhall, LaserTag, uvm.
            </Typography>{" "}
            <br />
            <Typography variant="h1green">EventPlaner</Typography> <br />
            <Typography variant="h2white">Buchungsportal</Typography> <br />
            <Typography variant="body1white">
              Angebote mit Gruppenrabatt &amp; Stornierungsoption <br />
              ausgewählte Teamevent-Locations <br />
              Fun mit Deiner Mannschaft <br />
              Sofortbuchung möglich <br />
              kostenloser Zugang
            </Typography>{" "}
            <br />
            <HashLink
              // to="/features#eventplaner"
              to="/login"
              scroll={(el) => {
                const elPosition = el.getBoundingClientRect().top;

                const offsetPosition =
                  elPosition + window.pageYOffset - headerOffset - spaceOffset;
                // el.scrollIntoView({
                window.scrollTo({
                  behavior: "smooth",
                  // block: "start",
                  top: offsetPosition,
                });
              }}
            >
              <Button>Los geht&apos;s!</Button>
            </HashLink>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem className="h-100">
          <CImage
            className="d-block w-100 h-100"
            src={imageTrainingsplaner}
            alt="slide 4"
            style={{
              objectFit: "cover",
              backgroundColor: "var(--lightblack)", // backup, if img does not load
            }}
          />

          <CCarouselCaption className="d-none d-md-block carousel-container">
            {/* <Typography variant="h3green">10.000+ Übungen</Typography> <br /> */}
            <Typography variant="h4green">
              aus verschiedensten Kategorien
            </Typography>{" "}
            <br />
            <Typography variant="h5white">
              Trainingseinheiten wie bei den Profis?
            </Typography>{" "}
            <br />
            <Typography variant="h1green">TrainingsPlaner</Typography> <br />
            <Typography variant="h2white">Übungsdatenbank</Typography> <br />
            <Typography variant="body1white">
              hochautomatisierte Trainingsplanung <br />
              KI-Algorithmus mit Feedbacksystem <br />
              einzelne Übungen &amp; ganze Einheiten <br />
              zahlreiche Einstellungsoptionen <br />
              individuell &amp; anpassbar
            </Typography>{" "}
            <br />
            <HashLink
              // to="/features#trainingsplaner"
              to="/login"
              scroll={(el) => {
                const elPosition = el.getBoundingClientRect().top;

                const offsetPosition =
                  elPosition + window.pageYOffset - headerOffset - spaceOffset;
                // el.scrollIntoView({
                window.scrollTo({
                  behavior: "smooth",
                  // block: "start",
                  top: offsetPosition,
                });
              }}
            >
              <Button>Los geht&apos;s!</Button>
            </HashLink>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem className="h-100">
          <CImage
            className="d-block w-100 h-100"
            src={imageSaisonplaner}
            alt="slide 5"
            style={{
              objectFit: "cover",
              backgroundColor: "var(--lightblack)", // backup, if img does not load
            }}
          />

          <CCarouselCaption className="d-none d-md-block carousel-container">
            <Typography variant="h4green">Belastungssteuerung</Typography>{" "}
            <br />
            <Typography variant="h5white">
              Du willst ein fittes Team ohne anstrengende Konditionseinheiten?
            </Typography>{" "}
            <br />
            <Typography variant="h1green">SaisonPlaner</Typography> <br />
            <Typography variant="h2white">Trainingskalender</Typography> <br />
            <Typography variant="body1white">
              langfristige &amp; professionelle Belastungssteuerung <br />
              basierend auf sportwissenschaftlichen Erkenntnissen <br />
              KI-Algorithmus mit Feedbacksystem <br />
              zahlreiche Einstellungen <br />
              individuell &amp; anpassbar
            </Typography>{" "}
            <br />
            <HashLink
              // to="/features#saisonplaner"
              to="/login"
              scroll={(el) => {
                const elPosition = el.getBoundingClientRect().top;

                const offsetPosition =
                  elPosition + window.pageYOffset - headerOffset - spaceOffset;
                // el.scrollIntoView({
                window.scrollTo({
                  behavior: "smooth",
                  // block: "start",
                  top: offsetPosition,
                });
              }}
            >
              <Button>Los geht&apos;s!</Button>
            </HashLink>
          </CCarouselCaption>
        </CCarouselItem>
        <CCarouselItem className="h-100">
          <CImage
            className="d-block w-100 h-100"
            src={imageTaktikplaner}
            alt="slide 6"
            style={{
              objectFit: "cover",
              backgroundColor: "var(--lightblack)", // backup, if img does not load
            }}
          />

          <CCarouselCaption className="d-none d-md-block carousel-container">
            <Typography variant="h4green">Strategie</Typography> <br />
            <Typography variant="h5white">
              Dein Team tut sich im Spiel schwer gegen einen Gegner? Du willst
              taktische Veränderungen vornehmen, weißt aber nicht welche?
            </Typography>{" "}
            <br />
            <Typography variant="h1green">TaktikPlaner</Typography> <br />
            <Typography variant="h2white">Analysetool</Typography> <br />
            <Typography variant="body1white">
              In-Game-Analyse <br />
              Aufbereitung verschiedenster Formationen <br />
              KI-Algorithmus mit Feedbacksystem <br />
              zahlreiche Eintellungsoptionen <br />
              individuell &amp; anpassbar
            </Typography>{" "}
            <br />
            <HashLink
              // to="/features#taktikplaner"
              to="/login"
              scroll={(el) => {
                const elPosition = el.getBoundingClientRect().top;

                const offsetPosition =
                  elPosition + window.pageYOffset - headerOffset - spaceOffset;
                // el.scrollIntoView({
                window.scrollTo({
                  behavior: "smooth",
                  // block: "start",
                  top: offsetPosition,
                });
              }}
            >
              <Button>Los geht&apos;s!</Button>
            </HashLink>
          </CCarouselCaption>
        </CCarouselItem>
      </CCarousel>
    </>
  );
};
