import { Typography, Grid, } from "@mui/material";
import { Box, Stack, } from "@mui/system";
import Votingbox from './Votingbox';
import handyBlank from '../../images/handy_empty.png';
import { BigGreenText, BigText, MessageText } from "./Fonts";
import { mainTheme } from "../../Themes/mainTheme";

/* Picture of blank smartphone */
function Handy(){
    return (
        <Box component="img" 
        alt="blank mobile phone"
        src={handyBlank}
        height="100%"
        width="auto"
        sx={{   padding:"10px", 
                alignItems: "center",
            }}/>
    )
}


const MessageBox = (props) => {
    return (
        <Box backgroundColor="white"
        sx={{textAlign: "center",
            borderRadius: "5px",
            maxWidth: "230px"}}>
            <Typography
                color="primary.contrastText"
                variant="smallLight"
                component="p"
                p={{sm: "4px", md:"5px"}}
                textAlign="start"
                >
                {props.message}
            </Typography>
        </Box>
    );
}

const MessageBoxText = (props) => {
    return (
        <MessageText
            lineheight={0.75}
            maxWidth="20%"
            width="20%"
            sx={{
                color: "white", 
                textAlign: "center", 
                overflow: "visible",
                display: {xs: "none", sm: "none", md: "block", lg: "block"}}} 
            >
                {props.text}
        </MessageText>
    );
}

const CustomStack = (props) => {
    return (
        <Stack 
            direction="row"
            alignItems="center"
            spacing={{sm: 1, md: 4}}
            justifyContent= "flex-start"
            height={{sm: "auto", md: "50px"}}
            maxHeight={{sm: "auto", md: "50px"}}
            sx={{margin:"2% 0%"}}
        >
            <MessageBoxText text={props.text}/>
            <MessageBox message={props.message}/>
    </Stack>
    );
}

const CustomReverseStack = (props) => {
    return (
        <Stack 
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent= "flex-end"
            height={{sm: "auto", md: "50px"}}
            maxHeight={{sm: "auto", md: "50px"}}
            sx={{margin:"2% 0%"}}
        >
            <MessageBox message={props.message}/>
            <MessageBoxText text={props.text}/>
    </Stack>
    );
}



const Agreement = (props) => {  

    return (
        <Grid 
            container
            height={{sm:"auto", md: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}} // full height - header
            sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start"}}}  
            position={{sm:"static", md:"relative"}}
            overflow="hidden"
            marginBottom={{xs: "30px", sm: "none"}}
        >
          <Grid item 
            container 
            direction="column" 
            alignItems={{sm: "center", md:"flex-start"}} 
            justifyContent="space-evenly"
            >
            
            {/** KOMMT DIR DAS BEKANNT VOR */}
            <Grid item marginLeft="2%">
                <BigGreenText 
                    variant="largeLight" 
                    color="primary"
                >
                    Kommt dir 
                    <BigGreenText component="span"
                            textTransform="uppercase"
                            variant="largeBold"
                    >
                        {" "}das{" "}
                    </BigGreenText> 
                    bekannt vor?</BigGreenText>
            </Grid>

            {/**    smartphone and messages */}
            <Grid item container justifyContent="center" position={{sm:"static", md:"relative"}} >
                <Grid item 
                    height="100%" 
                    minHeight="100%" 
                    position="absolute" 
                    top="0" 
                    left="center" 
                    zIndex="-1" display={{xs: "none", sm:"none", md:"block"}}>
                    <Handy />
                </Grid>

                <Grid item margin="2% 0">
                    <CustomStack 
                        message="ich packs wahrscheinlich nicht mehr bin spontan essen mit 
                                Oma Opa weil Opa B-day hatte vor paar Tagen" 
                        text="Kurzfristige Absagen"/>

                    <CustomReverseStack 
                        message="Servus, unser Plan steht schon. Wir haben leider keine
                                Kapazität mehr für ein Testspiel..."
                        text="Komplizierte Testspielsuche"/>

                    <CustomStack 
                        message="Hab vom Training gestern mega Muskelkater und würde lieber
                                Pause machen, damit ich fürs Spiel am Samstag fit bin" 
                        text="Schwere Entscheidungen bei der Belastungssteuerung"/>

                    <CustomReverseStack 
                        message="Hey, ihr habt heute erst ab 20 Uhr den ganzen Platz. Ab 19
                                Uhr nen halben" 
                        text="Eingeschränkte Trainingsmöglichkeiten"/>

                    <CustomStack 
                        message="Hallo Kollegen der E2. Wir (C2) haben am Montag um 19 Uhr
                        ein Spiel. Mit Alex hatte ich schon gesprochen. Ich wusste
                        nicht, dass ihr von der E2 auch drauf seid" 
                        text="Terminprobleme"/>

                </Grid>

            </Grid>

            {/**    ALS COACH MUSST DU */}
            <Grid item container direction={{xs:"column", sm:"row"}} marginLeft="2%" marginBottom="10px" justifyContent={{sm:"center", md:"left"}}>
                <BigText display="inline" variant="largeLight" marginRight="10px">Als Coach musst Du{" "}</BigText>
                <BigText 
                    display="inline"
                    textTransform="uppercase"
                    variant="largeLight"
                    color={props.color && "primary"}
                    id="coach-tasks"
                    sx={{fontWeight: "bold"}}>{" "}alles machen.
                </BigText>
            </Grid>


            { /** VOTING BOX */}
            <Grid item display={{xs: "none", sm:"none", md:"block"}}
                position="absolute"
                bottom="40px"
                right={{md:"45px", lg:"55px"}}
                backgroundColor={mainTheme.palette.secondary.main} /* in case text gets overlapped */
            >
                <Votingbox />  
            </Grid>

            <Grid item display={{sm:"block", md:"none"}} alignSelf="center">
                <Votingbox />
            </Grid>


          </Grid>
        </Grid>
    );
  };    

export default Agreement;
