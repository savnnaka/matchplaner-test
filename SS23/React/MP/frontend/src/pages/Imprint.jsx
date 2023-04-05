import { Grid, Typography, Container, Button, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import Footer from "../components/Footer";
import backgroundAdvantages from "../images/advantages.jpg";
import ContactData from "../components/data/ContactData";
import SEO from "../components/SEO";

const ImprintGrid = styled(Grid)({
  minHeight: "40vh",
  height: "40vh",
  backgroundColor: "inherit",
  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4) , rgba(0,0,0,0.4)), linear-gradient(to top, rgba(0,0,0,0.9) , rgba(0,0,0,0) 20%), linear-gradient(to bottom, rgba(0,0,0,0.9) , rgba(0,0,0,0) 20%), url(
      ${backgroundAdvantages}
      )`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

function Imprint() {

  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Impressum";
  }, []);

  // set reference for onClick function
  const ref = useRef(null);
  const scrollToDetails = () => {
    ref.current?.scrollIntoView({behaviour: "smooth"});
  }

  const AddressGrid = Object.keys(ContactData).map(key => {
    if(key === "people" || key === "email"){
      return null;
    }
    return (
      <Grid item key={key}>
        <Typography color={key === "name" && "primary"}>{ContactData[key]}</Typography>
      </Grid>
    );
  });

  const PeopleGrid = ContactData["people"].map(p => {
    return (
      <Grid item key={p}>
        <Typography>{p}</Typography>
      </Grid>
    );
  });

  return (
    <Box >
      <SEO
      title="Impressum"
      description="MatchPlaner Sport Solutions UG (haftungsbeschränkt) ist in 72760 
                  Reutlingen in der Holbeinstraße 13 ansäßig. Kontaktieren kannst du uns unter info@matchplaner.com. 
                  Geschäftsführer sind  Paul Prochiner, Philipp Saur, Jens Bintakies und Anton Kandlbinder."
      name="Matchplaner" 
      type="article"
      url="www.matchplaner.com/imprint"
      />

      <Box>
        <ImprintGrid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="mainHeader" textTransform="uppercase">Impressum</Typography>
          </Grid>
          <Grid item>
            <Button onClick={scrollToDetails} size="normal"> 
                mehr
            </Button>
          </Grid>
        </ImprintGrid>

        <Container 
          ref={ref} 
          sx={{padding:"5% 0%"/** container has default margin left/right */}} 
        > 
          <Grid container spacing={2} >

            <Grid item container direction="column" alignItems={{xs:"center", sm:"flex-start"}}>
              <Grid item>
                <Typography fontWeight="bold">Angaben gemäß § 5 TMG:</Typography>
              </Grid>
              {AddressGrid}
            </Grid>

            <Grid item container direction="column" alignItems={{xs:"center", sm:"flex-start"}}>
              <Grid item>
                <Typography color="primary">Kontakt:</Typography>
              </Grid>
              <Grid item>
                <Typography>{ContactData["email"]}</Typography>
              </Grid>
            </Grid>

            <Grid item container direction="column" alignItems={{xs:"center", sm:"flex-start"}}>
              <Grid item>
                <Typography color="primary">
                  Vertretungsberechtigte Geschäftsführer:
                </Typography>
              </Grid>
              {PeopleGrid}
            </Grid>

            <Grid item container direction="column" alignItems={{xs:"center", sm:"flex-start"}} marginBottom="2%">
              <Grid item>
                <Typography>Amtsgericht Stuttgart HRB 788023</Typography>
              </Grid>
            </Grid>

            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Typography>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit, die Sie hier finden: 
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                <a style={{textDecoration: "underline"}} href="https://ec.europa.eu/consumers/odr/">https://ec.europa.eu/consumers/odr/</a>
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Zur Teilnahme an einem
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle sind wir nicht verpflichtet und
                  nicht bereit.
                </Typography>
              </Grid>
            </Grid>
            
          </Grid>
        </Container>

        {/* <Grid container spacing={2} >

          <Grid item container>
          <Grid item xs={12}>
            <Typography>
              Umsatzsteuer-Identifikationsnummer nach § 27a UStG: DE777777777
            </Typography>
          </Grid>

          <Typography>
            Verantwortlich für den Inhalt [des Blogs o. ä.] nach § 55 Abs. 2
            RStV
          </Typography>
          <Typography>
            Geschäftsführer verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </Typography>
        </Grid> 
        </Grid>*/}


      </Box>
      <Footer />
    </Box>
  );
}

export default Imprint;
