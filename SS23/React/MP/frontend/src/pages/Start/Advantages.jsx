import { Grid , Typography, Container, Stack} from "@mui/material";
import backgroundAdvantages from "../../images/advantages.jpg";
import {AccessTime,
        School,
        AltRoute,
        TrendingUp,
        EmojiEvents } from "@mui/icons-material";
import { styled } from "@mui/system";
import { HugeText , WhiteText} from "./Fonts";

const AdvantagesGrid = styled(Grid)({
    backgroundColor: "inherit",
    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4) , rgba(0,0,0,0.4)), linear-gradient(to top, rgba(0,0,0,0.9) , rgba(0,0,0,0) 30%), linear-gradient(to bottom, rgba(0,0,0,0.9) , rgba(0,0,0,0) 30%), url(
        ${backgroundAdvantages}
        )`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
});

function TopText (){
    return (
        <Container>
            <Grid item container direction="column">
                <Stack>
                <Typography color="primary"
                    textAlign={{xs: "center", sm: "left"}}>
                    Wir bringen den Spaß am Trainerjob zurück!
                </Typography>
                </Stack>
                <Stack>
                <Typography textAlign={{xs: "center", sm: "left"}}>
                    Du erledigst die Arbeit auf dem Platz, wir übernehmen den Rest.
                </Typography>
                </Stack>
            </Grid>
            </Container>
    )
};

function MainText (){
    /** minheight statt minHeight wegen Warnung */
    return (
        <Container padding={{xs: "30%", sm: "20%", md: "0%"}}
            minheight={{xs: "80vh", sm: "80vh", md: "auto"}}> 
            <HugeText
                color="primary"
                textTransform="uppercase"
                variant="hugeBold"
                whiteSpace="nowrap"
            >
                Die Revolution <br /> des Amateursports
            </HugeText>
        </Container>
    )
};

const AdvantageStyling = {
    background: "rgba(0,0,0,0.3)",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "60px",
    verticalAlign: "middle",
    padding: "10px",
};

function AdvantageList (){
    return (
        <Container>
            <Grid item container justifyContent="space-evenly">
                <Grid item xs={2} container direction="column"
                    display={{xs: "none", xsm: "none", sm: "block"}}>
                    <Grid item>
                        <AccessTime 
                        style={AdvantageStyling}
                        fontSize="large"/>
                    </Grid>
                    <Grid item>
                        <WhiteText>weniger Zeitaufwand</WhiteText>
                    </Grid>
                </Grid>
                <Grid item xs={2} container direction="column"
                    display={{xs: "none", xsm: "none", sm: "block"}}>
                    <Grid item>
                        <TrendingUp
                        fontSize="large"
                        style={AdvantageStyling}
                        />
                    </Grid>
                    <Grid item>
                        <WhiteText>mehr Spaß</WhiteText>
                    </Grid>
                </Grid>
                <Grid item xs={2} container direction="column"
                    display={{xs: "none", xsm: "none", sm: "block"}}>
                    <Grid item>
                        <EmojiEvents
                        fontSize="large"
                        style={AdvantageStyling}
                        />
                    </Grid>
                    <Grid item>
                        <WhiteText>hochwertigere Ausbildung</WhiteText>
                    </Grid>
                </Grid>
                <Grid item xs={2} container direction="column"
                    display={{xs: "none", xsm: "none", sm: "block"}}>
                    <Grid item>
                        <School
                        fontSize="large"
                        style={AdvantageStyling}
                        />
                    </Grid>
                    <Grid item>
                        <WhiteText>mehr Wissen</WhiteText>
                    </Grid>
                </Grid>
                <Grid item xs={2} container direction="column"
                    display={{xs: "none", xsm: "none", sm: "block"}}>
                    <Grid item>
                        <AltRoute
                        fontSize="large"
                        style={AdvantageStyling}
                        />
                    </Grid>
                    <Grid item>
                        <WhiteText>höhere Flexibilität</WhiteText>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
};

export default function Advantages(props) {
    
    return (
        <AdvantagesGrid
            container
            height={{xs: "80vh", sm: "80vh", md: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}} // full height - header
            overflow="hidden"
            id="advantages"
            direction="column"
            justifyContent="space-between"
            paddingY={2}
            marginBottom={{xs: "30px", sm: "none"}}
            sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start"}}}
        >
            {/* text on top */}
            <TopText />
            {/* main text */}
            <MainText />
            {/* advantages */}
            <AdvantageList/>
        </AdvantagesGrid>
    )
}