import {
    Button,
    Typography,
    Grid,
    Container,
    Card,
  } from "@mui/material";
  import { Link } from "react-router-dom";
import { LargeText ,AverageText, MediumText} from "./Fonts";
import { styled , Stack} from "@mui/system";

const PricingButton = styled(Button)(({theme}) => ({
    size: "small",
    [theme.breakpoints.up("xsm")]:{
        size: "medium",
    },
    [theme.breakpoints.up("sm")]:{
        size: "large",
    },
}));



const Pricing = (props) => {

    return (
      <Grid
        container
        overflow="hidden"
        height={{sm: "auto", md: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}} // full height - header
        id="pricing"
        // className="anchor"
        direction={{sm: "row", md: "column"}}
        justifyContent="space-evenly"
        paddingY={2}
        sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start",}, marginBottom: {xs: "2%", sm:"3%", md: "0%"}}}
        >

        {/**    100% Transparent und Registrieren Button */}
        <Container>
            <Stack direction={{xs: "column", sm: "row"}} 
                justifyContent="space-between" 
                alignItems="center"
            >
                <Grid
                    item
                    xs
                    container
                    direction="column"
                    // justifyContent="flex-start"
                    alignItems={{xs: "center", sm:"start"}}
                >
                    <LargeText
                    textTransform="uppercase"
                    textAlign="start"
                    variant="largeLight"
                    color="primary"
                    >
                    100% Transparent.
                    </LargeText>
                    <AverageText textAlign={{xs: "center", sm: "start"}}>
                    Keine versteckten Kosten, keine In-App-Käufe.
                    </AverageText>
                    <AverageText textAlign={{xs: "center", sm: "start"}}>
                    Uneingeschränkter Zugriff auf alle verfügbaren Features.
                    </AverageText>
                </Grid>
                <Grid item alignSelf={{xs: "center", sm: "left"}}
                    padding="2%">
                    <Link to="/register">
                    <PricingButton marginleft={{xs: "25%", sm: 0}}>Registrieren</PricingButton>
                    </Link>
                </Grid>
            </Stack>
        </Container>

        {/**        0€ Box */}
        <Container>
            <Grid container justifyContent="center">
            <Card sx={{ padding: "20px" }}>
                <Grid container direction="column">
                <Grid item>
                    <Typography fontSize={{xs: "0.75rem", sm: "1.25rem", md: "1.5rem"}}
                        color="primary">
                    Wir befinden uns aktuell in der Entwicklungsphase!
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography lineHeight={1} variant="hugeBold">
                    0€
                    </Typography>
                </Grid>
                <Grid item >
                    <LargeText
                    textTransform="uppercase"
                    variant="largeLight"
                    color="primary"
                    >
                    Registrieren &amp; Helfen
                    </LargeText>
                </Grid>
                </Grid>
            </Card>
            </Grid>
        </Container>
        
        {/**    Überzeuge dich selbst */}
        <Container>
            <Stack direction="column">
                <MediumText  color="primary"
                    textAlign={{xs: "center", sm: "left"}}>
                    MatchPlaner ist so gut, dass wir den Preis nicht verstecken
                    müssen!
                </MediumText>
                <AverageText textAlign={{xs: "center", sm: "left"}}>
                    Überzeuge Dich selbst, die ersten 2 Wochen kosten Dich nichts!
                </AverageText>
                <AverageText textAlign={{xs: "center", sm: "left"}}>
                    Du kannst jederzeit kündigen.
                </AverageText>
            </Stack>
        </Container>


    </Grid>
    );
}

export default Pricing;