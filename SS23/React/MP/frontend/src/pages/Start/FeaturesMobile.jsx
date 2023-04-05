import { Grid , Container} from "@mui/material";
import { Typography , Stack} from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@emotion/react";

import {LargeText} from "./Fonts";
import Check from "./Check";

import feature_mp from "../../images/feature_mp.jpg";
import feature_trp from "../../images/feature_trp2.jpg";
import feature_sp from "../../images/feature_sp.jpg";
import feature_vp from "../../images/feature_vp.png";
import feature_tap from "../../images/feature_tap.jpg";
import feature_ep from "../../images/feature_ep.jpg";
import { Opacity } from "@mui/icons-material";

function Feature(props){
  const Checks = props.checks.map(item => {
    return (
      <Check text={item} id={item} key={item}/>
    );
  })

  const theme = useTheme();
  return (
    <Grid item marginBottom={{xs: "10px", sm: "none"}}
    >
      <Stack direction="column"
          alignItems="center">
        <LargeText color="white">
          {props.title}
        </LargeText>
        <Grid
            item
            container
            direction="column"
            justifyContent="space-evenly"
            >
            
          <Box 
            sx={{backgroundColor: "var(--lightblack)", 
                background: `linear-gradient(to left, transparent ,black 30% 100%), url(${props.picture})`,

                backgroundSize:"cover",
                backgroundReapeat: "no-repeat"}}
            alignItems="center"
            padding="3%"
            borderRadius="3%">
          <Grid item container direction="column" alignItems="center">
            <Typography
              textTransform="uppercase"
              textAlign="center"
              fontWeight={700}
              fontSize={{xs:20, xsm:25}}
              lineHeight={1}
            >
              {props.headline}
            </Typography>
            <Typography
              color="primary"
              fontWeight={700}
              fontSize={{xs:16, xsm:20}}
              textAlign="center"
              lineHeight={1}
            >
              {props.subline}
            </Typography>
          </Grid>
          <Grid container direction="column">
            {Checks}
          </Grid>
          </Box>
        </Grid>
      </Stack>
    </Grid>
  )
}

export default function Features (props){
    return (
        <Grid
        container
        height="auto" // full height - header
        id="features-overview"
        className="anchor"
        overflow="hidden"
        paddingY={2}
        justifyContent="center"
        marginBottom={{xs: "30px", sm: "none"}}
      >
        <Container>
          <Grid container sx={{ height: "100%" }}
            item
            direction="column"
            justifyContent="space-evenly"
          >
            <Grid item>
              <Typography textTransform="uppercase"
                fontWeight={700}
                fontSize={{sm:40, xs:30}}>
                Features
              </Typography>
            </Grid>
            <Feature title="MatchPlaner"
              headline="Testspiele"
              subline="Netzwerk mit Vereinen aus ganz Deutschland."
              checks={[
              "schnelle Kommunikation",
              "zahlreiche Filter",
              "an alles gedacht (sogar Trikotfarben)",
              "übersichtlicher Kalender zur Planung",
              "Fairplay-Rating",
              "Anfragen erstellen in unter 30 Sekunden",
              ]} 
              picture={feature_mp}/>
            <Feature title="TrainingsPlaner"
                headline="Training"
                subline="Perfekt abgestimmte Einheiten mithilfe von künstlicher
                Intelligenz."
                checks={[
                "5 Mio.+ Trainingseinheiten",
                "abgestimmt auf die Spielerzahl",
                "altersgerechtes Training",
                "passend zur Leistungsstärke",
                "maximale Flexibilität",
                "KI lernt durch Dein Feedback",
                ]} 
                picture={feature_trp}/>
            <Feature title="SaisonPlaner"
              headline="Fitness"
              subline="Optimale Belastungssteuerung angepasst an Dein Team."
              checks={[
                "modernes Konditionstraining",
                "sportwissenschaftliche Erkenntnisse",
                "alters- und leistungsgerecht",
                "angepasst an Deinen Trainingsrhythmus",
                "KI lernt durch Dein Feedback",
                "automatisch verknüpft mit TrainingsPlaner",
              ]} 
              picture={feature_sp}/>
            <Feature title="VereinsPlaner"
              headline="Platzbelegung"
              subline="Optimierter Belegungsplan dank automatisiertem
              Vereinskalender."
              checks={[
              "alle Termine auf einen Blick",
              "Spiele und Trainings aller Teams",
              "alle Sportstätten Deines Vereins",
              "schnelle Koordination",
              "optimal für Vereinsfunktionäre",
              ]} 
              picture={feature_vp}/>
              <Feature title="TaktikPlaner"
                headline="Analyse"
                subline="Gegnerische Taktiken entschlüsseln und Spiele gewinnen."
                checks={[
                "IN-GAME-Analyse",
                "erhöhe Deine Erfolgschancen",
                "Verknüpfung des TrainingsPlaner mit Taktik",
                "Tipps für Standardsituationen",
                "Spezialtraining (Torspieler, Standards)",
                "Coachingtipps fürs Spiel"
                ]} 
                picture={feature_tap}/>
            <Feature title="EventPlaner"
              headline="Buchungsportal"
              subline="Günstige Gruppenangebote für Teamevents und Trainingslager"
              checks={[
              "ausgewählte Unterkünfte",
              "alle Eventlocations auf einen Blick",
              "spezielle Gruppenangebote",
              "Bestpreisgarantie",
              "MP-Treuepunkte",
              "Verknüpfung mit Saison- und TrainingsPlaner"
              ]} 
              picture={feature_ep}/>
        </Grid>
        </Container>
      </Grid>
    )
}