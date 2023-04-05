import { ExpandMore } from '@mui/icons-material';
import { Typography, Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from 'react';

export const FAQs = () => {
    return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
          <Typography variant="h5white">
            Warum muss mein Verein erst aktiviert werden?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Typography variant="body1white">
              Zugegeben, im ersten Moment scheint dieser Weg der Registrierung
              etwas umständlich. Auf lange Sicht, bietet die
              2-Schritt-Verifizierung jedoch mehrere Vorteile für die Trainer:
            </Typography>
            <Typography variant="body2white">
              1. Alle Nutzer sind echte Trainer (keine Fake-Nutzer und kein Spam)
            </Typography>
            <Typography variant="body2white">
              2. Immer aktuelle Ansprechpartner
            </Typography>
            <Typography variant="body2white">
              3. Keine Kosten für die Trainer*
            </Typography>
            <Typography variant="body1white">*in der Basisversion</Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>
  
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
          <Typography variant="h5white">
            Wann erhalte ich meinen Zugangscode?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1white">
            Ein Vertreter Deines Vereins registriert den Verein in unserer
            Community. Innerhalb von wenigen Minuten wird Dein Verein in unserer
            Community aktiviert. Sobald die Mitgliedschaft des Vereins aktiviert
            ist, erhält der Vereinsvertreter die gebuchte Anzahl an Zugangscodes
            und kann sie an die Trainer vergeben.
          </Typography>
        </AccordionDetails>
      </Accordion>
  
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
          <Typography variant="h5white">
            Kann ich mich als Trainer und als Vereinsvertreter registrieren?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1white">
            Grundsätzlich ja. Bei der Registrierung ist jedoch immer (sowohl als
            Trainer, als auch als Vereinsvertreter) die Angabe einer
            E-Mail-Adresse zur Verifizierung erforderlich. Da jede E-Mail-Adresse
            im System nur einmal hinterlegt sein darf, muss die Registrierung mit
            verschiedenen E-Mail-Adressen erfolgen. Du kannst beispielsweise für
            die Registrierung als Vereinsvertreter die E-Mail-Adresse Deines
            Vereins verwenden und bei der Registrierung als Trainer Deine eigene
            E-Mail-Adresse angeben.
          </Typography>
        </AccordionDetails>
      </Accordion>
  
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
          <Typography variant="h5white">
            Welche Kosten kommen auf mich und meinen Verein zu?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Typography variant="body2white">
              Unsere Features überzeugen durch Qualität – ohne Tricks. Deshalb
              kannst Du jedes Feature 30 Tage kostenlos testen. Einige Features
              sind sogar unbegrenzt kostenlos nutzbar! Probier&apos; es kostenlos
              aus!
            </Typography>
            <Typography variant="body1white">
              Im Anschluss an die kostenlose Testphase fällt für den Verein eine
              Aktivierungs-/Verwaltungsgebühr in Höhe von 0,25&euro;/Monat pro
              Trainer an. Als Trainer hast Du die Wahl zwischen unserer
              kostenlosen Basisversion und verschiedenen Premium-Features. Eine
              Übersicht findest Du hier.
            </Typography>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
