import { Container, 
          Typography, 
          Grid, 
          TextField, 
          Button , 
          Stack, 
          Box,} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ContactData from "../components/data/ContactData";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HouseIcon from '@mui/icons-material/House';
import Footer from "../components/Footer";
import SEO from "../components/SEO";

function Contact() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    if (!title || !message || !name || !email) {
      toast.error("Bitte alle Felder ausfüllen",
        {
          theme: "dark",
        });
    }
    else (
      toast.success(title)
    )
    console.log("send Email");
  };

  const AddressGrid = Object.keys(ContactData).map(key => {
    if(key === "people" || key === "email"){
      return null;
    }
    return (
      <Grid item key={key}>
        <Typography>{ContactData[key]}</Typography>
      </Grid>
    );
  });

  const ContactForm = () => {
    return (
      <form action="">
        <Stack direction="column">
          {/* Betreff */}
          <Grid item>
            <TextField 
              label="Betreff" 
              required/>
          </Grid>
          {/* Name */}
          <Grid item>
            <TextField 
              label="Dein Name" 
              required/>
          </Grid>
          {/* E-Mail */}
          <Grid item>
            <TextField label="Deine E-Mail-Adresse" 
              required/>
          </Grid>
          {/* Nachricht */}
          <Grid item>
            <TextField label="Nachricht" 
              required multiline rows={7}/>
          </Grid>
        </Stack>
        {/* button */}
        <Grid item p="10px">
          <Button onClick={onSubmit}>Nachricht senden</Button>
        </Grid>
      </form>
    );
  }

  return (
    <div>
      <SEO
      title="Matchplaner | Kontakt"
      description="Du willst mit uns in Kontakt treten? 
                  Schreib uns eine Email an info@matchplaner.com oder nutze unser Kontaktformular. 
                  In Person findest du MatchPlaner Sport Solutions UG (haftungsbeschränkt) in der Holbeinstraße 13
                  in 72760 Reutlingen."
      name="Matchplaner" 
      type="article"
      url="www.matchplaner.com/contact"
      />

      <Container>

      <Typography variant="mainHeader">Kontakt</Typography>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />
      <Grid marginBottom="7%">
        <Typography>Diese Seite ist noch in der Entwicklung.</Typography>
        <Link to="/">Zurück zur Startseite</Link>
        <Typography>Fragen, Anregungen, Wünsche?</Typography>
      </Grid>

      <Grid container spacing={2} >

        <Grid item xs={12} sm={5}>
          <Grid item marginBottom="5%">
            
            <Typography><MailOutlineIcon/> Schreib uns eine Email!</Typography>
            <Typography>{ContactData["email"]}</Typography>
          </Grid>   
          <Grid item container direction="column">
            <Typography><HouseIcon/> Uns findest du hier:</Typography>
            {AddressGrid}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={7}>
        <Typography>Oder nutze unser Kontaktformular:</Typography>
          <ContactForm />
        </Grid>
      </Grid>

      <Grid container justifyContent="center">

      </Grid>

      <Box m="2% 0">
        
      </Box>

      <Footer 
          sx={{
            position: "absolute",
            left:"0",
            bottom:"0",
            right:"0",
          }}
        />
    </Container>
    </div>
    
  );
}

export default Contact;
