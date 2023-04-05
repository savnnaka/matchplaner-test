import React from "react";
import {Box, styled, Button, Stack} from "@mui/material"
import Background from "../../images/background-image-catcher.jpg"
import {WhiteText, BigWhiteText, BigBlackText, StatsText} from './Fonts';
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";

/* Picture of Handy at top of the Catcher */
function Handy(){
    return (
        <Box component="img" 
        alt="example image"
        src={require("../../images/handy.png")}
        height="80vh"
        width="auto"
        sx={{   padding:"10px", 
                alignItems: "center",
            }}/>
    )
}

const CatcherButton = styled(Button)(({theme}) => ({
    size: "medium",
    [theme.breakpoints.up("xsm")]:{
        size: "large",
    }
}));

/* Call to action on main part of the Catcher */
function CallToAction(){
    return (
        <Stack sx={{  display:"flex", 
                    flexDirection:"column",
                    alignItems:
                        {sm: "center", md: "flex-end"}}}>
            <WhiteText fontStyle="italic">
                COACHING MADE EASY
            </WhiteText>
            <Box sx={{
                    display:{xs: "none", xsm: "flex"}, 
                    flexDirection:"column",
                }}>
                <BigWhiteText variant="largeLight">
                    MINIMALER AUFWAND.
                </BigWhiteText>
                <BigWhiteText variant="largeBold">
                    MAXIMALER ERFOLG.
                </BigWhiteText>
            </Box>
                <Link to="/register">
                    <CatcherButton>
                        Los geht's
                    </CatcherButton>
                </Link>
        </Stack>
    )
}

/* Stats at the bottom of the Catcher */
function Statistics(props){
    const Statistics = props.stats.map( stat => {
        return (
            <Stack key={stat.id} 
                direction="column"
                alignItems="center">
                <Box direction="row" display="flex">
                    <StatsText id={stat.id}/>
                    <StatsText>{stat.appendum}</StatsText>
                </Box>
                <WhiteText>
                    {stat.name}
                </WhiteText>
            </Stack>
        )
    })
    return (
        <Stack direction={{xs: "column", xsm: "row"}} 
            sx={{display:"flex", 
                flexDirection:"row",
                justifyContent:"space-between"}}>
            {Statistics}
        </Stack>
    )
}

/* Box that wraps the main part of the Catcher */
const RightOuterBox = styled(Box)(({theme}) => ({
    background: `linear-gradient(to left, rgba(20, 20, 20,0), rgba(20,20,20,1)),url(${Background})`,
    backgroundRepeat: "no-repeat",
    alignItems: "space-between",
    backgroundSize: "cover"
}));

export default function Catcher(props) {

    return (
        <Box bgcolor= "rgba(20,20,20,1)"
            position="relative"
            height={{xs:"auto", sm: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}}
            sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start"}}}
            overflow="hidden"
            marginBottom={{xs: "30px", sm: "none"}}
            >
            <Banner />
            <Stack direction={{sm:"row", xs:"column-reverse"}}>
                <Box flex={3} width="100%" display={{xs: "none", md: "block"}} 
                        sx={{zIndex: 2}}>
                    <Handy/>
                </Box>
                <Stack direction="column" flex={7}>
                    <RightOuterBox
                        height={{xs:"60%", sm: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}} >
                        <Box sx={{margin:"10%"}}>
                            <CallToAction {...props } />
                        </Box >
                        <Box sx={{margin:"10%"}}>
                        <Statistics stats={[
                                {
                                    name: "Trainer", 
                                    id:"facts-amount-coaches",
                                    appendum:"+",
                                },
                                {
                                    name: "Trainings", 
                                    id:"facts-amount-trainings",
                                    appendum: "Mio.",
                                },
                                {
                                    name: "Spiele", 
                                    id:"facts-amount-matches",
                                    appendum: "+",
                                },
                            ]} />
                        </Box>
                    </RightOuterBox>
                </Stack>
            </Stack>
        </Box>
    )
}