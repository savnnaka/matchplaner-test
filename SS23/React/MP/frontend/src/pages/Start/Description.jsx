import { React } from "react";
import {
  Button,
  Typography,
  Grid,
  Box,
  Container,
  styled, 
  Stack,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import mobile from "../../images/handy.png";
import pc from "../../images/pc.png";

const DescriptionItem = (props) => {
  return (
    <Stack item container alignItems="center" direction="row" padding={{xs: "2%", sm: "0"}}>
      <CheckCircleOutline
        sx={{ marginRight: "10px", fontSize: {xs: 20, sm: 25, md: 35}}}
      />
      <Typography 
        fontSize={{xs: "0.75rem", xsm: "1rem", sm: "1.2rem"}}
        textAlign="left">
          {props.text}
        </Typography>
  </Stack>
  );
}

const TitleText = (props) => {
  return (
    <Grid item>
      <Typography
        textTransform="uppercase"
        variant="largeBold"
        lineHeight={1}
        color={props.color}
      >
        {props.text}
      </Typography>
    </Grid>
  );
}

const MobilePhone = styled(Box)(({theme}) => ({
  position: "absolute",
  top: "30vh",
  right: "1vh",
  // transform: "translate(-50%, -50%)",
  height: "50vh",
  maxWidth: "50vw",
  width: "50vh",
  backgroundImage: `url(${mobile})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  zIndex: 2,
  display: "block",
  [theme.breakpoints.down("lg")]:{
      top: "20vh",
      right: "-15vh",
      height: "50vh",
  },
  [theme.breakpoints.down("md")]:{
      top: "2vh",
      right: "-5vh",
      height: "40vh",
      width: "40vh",
  },
  [theme.breakpoints.down("700")]:{
    display: "none",
  },
}));

const Laptop = styled(Box)(({theme}) => ({
  position: "absolute",
  top: 80,
  right: 140,
  maxWidth: "80vh",
  height: "80vh",
  width: "100vh",
  backgroundImage: `url(${pc})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  display: {sm:"none", md:"block", lg:"block"},
  [theme.breakpoints.down("lg")]:{
    right: "40",
    width: "70vh",
  },
  [theme.breakpoints.down("md")]:{
    top: "8vh",
    right: "0",
    height: "40vh",
    width: "40vh",
  },
  [theme.breakpoints.down("1100")]:{
    top: "80",
    right: "40",
    height: "45vh",
    width: "45vh",
  },
  [theme.breakpoints.down("900")]: {
    display: "none",
  }
}));

const ButtonContainer = styled(Grid)(({theme}) => ({
  justifyContent: "flex-start",
  [theme.breakpoints.down("700")]: {
    justifyContent: "center",
  },
}));

export default function Description(props){

    return (
        <Grid
        container
        height={{sm: "auto", md: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}} // full height - header
        id="description"
        paddingY={2}
        direction="column"
        justifyContent="space-evenly"
        position="relative"
        sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start"}}}
        overflow="hidden"
      >
        {/* title */}
        <Container>
          <Grid container direction="column" alignItems={{xs: "center", sm: "flex-start"}}>
            <TitleText text="1 App"/>
            <TitleText text="6 Features" color="primary" />
          </Grid>
        </Container>

        {/* description list */}
        <Container>
          <Grid container direction="column" m={{xs: "20px", sm: "20px", md:"0"}}>
            <DescriptionItem text="Trainingseinheiten planen"/>
            <DescriptionItem text="Testspiele vereinbaren" />
            <DescriptionItem text="Belastung steuern"/>
            <DescriptionItem text="Platzbelegung kooridinieren"/>
            <DescriptionItem text="Taktiken entschlüsseln"/>
            <DescriptionItem text="Teamevents und Teamreisen buchen"/>
          </Grid>
        </Container>

        {/* button */}
        <Container>
          <ButtonContainer container>
            <Button size="large">Kostenlos testen</Button>
          </ButtonContainer>
        </Container>

        {/* mobile phone */}
        <MobilePhone/>
        {/* laptop */}
        <Laptop/>
      </Grid>
    )
}