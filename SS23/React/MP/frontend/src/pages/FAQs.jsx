import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ExpandMore } from "@mui/icons-material";
import Footer from "../components/Footer";

function FAQs() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | FAQs";
  }, []);

  return (
    <>
      <Typography variant="mainHeader">FAQs</Typography>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      <Container>
        <Typography display="inline" color="var(--lightgreen)">
          Du bist noch unsicher?
        </Typography>
        <Typography display="inline">
          {" "}
          Vielleicht helfen Dir diese häufig gestellten Fragen. Ansonsten
          probier es doch einfach mal aus. Die ersten 14 Tage sind kostenlos!
        </Typography>
      </Container>
      <Container sx={{ p: 2 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            Wie kann ich mich bei MatchPlaner registrieren?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              omnis quia consequuntur eius aperiam architecto necessitatibus
              neque. Odit, atque tempore voluptas maxime, rem iusto dolore ea
              repudiandae velit et sunt!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            Welche Preismodelle gibt es?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              omnis quia consequuntur eius aperiam architecto necessitatibus
              neque. Odit, atque tempore voluptas maxime, rem iusto dolore ea
              repudiandae velit et sunt!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            Kann ich MatchPlaner auch günstiger bekommen?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              omnis quia consequuntur eius aperiam architecto necessitatibus
              neque. Odit, atque tempore voluptas maxime, rem iusto dolore ea
              repudiandae velit et sunt!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            Mein Verein macht nicht mit. Kann ich MatchPlaner auch ohne Verein
            nutzen?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              omnis quia consequuntur eius aperiam architecto necessitatibus
              neque. Odit, atque tempore voluptas maxime, rem iusto dolore ea
              repudiandae velit et sunt!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            Was ist ein Zugangscode und wie bekomme ich einen?
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              omnis quia consequuntur eius aperiam architecto necessitatibus
              neque. Odit, atque tempore voluptas maxime, rem iusto dolore ea
              repudiandae velit et sunt!
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Footer />
    </>
  );
}

export default FAQs;
