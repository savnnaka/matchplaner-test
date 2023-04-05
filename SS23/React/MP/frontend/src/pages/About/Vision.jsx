import { Typography , Stack} from "@mui/material";
import { Box } from "@mui/system";
import { BigText ,LargeText} from "../Start/Fonts";

function Vision (props){
    return (
        <Stack height={{xs:"auto", sm: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}}
        sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start", lg: props.isNarrow ? "none" : "start"},
                p:"5% 7%",
                marginBottom: {xs: "5%", sm: "10%"}}}
            direction="column">
            <LargeText  color="primary" 
                        variant="largeLight" 
                        marginBottom="6%" 
                        textAlign={{xs: "center", sm: "left"}}>
                Unsere <LargeText color="primary" variant="largeBold">Vision</LargeText>
            </LargeText>
            <BigText  variant="largeLight" textAlign="left">
                "Coaches gehören auf den Platz!"
            </BigText>
            <Stack direction="column">
                <Box textAlign="left">
                    <Box margin="7px 0">
                        <Stack direction="row">
                            <Typography textAlign="left">
                                Dort können sie sich <Typography variant="normalBold">für andere engagieren</Typography> und das tun, was ihnen <Typography variant="normalBold">Spaß macht.</Typography>
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Typography>
                                Wir sind der Meinung, dass ihr freiwilliger Einsatz <Typography variant="normalBold">innovative Unterstützung</Typography> verdient.
                            </Typography>
                        </Stack>
                    </Box>
                    <Stack direction="column" margin="15px 0">
                        <Typography>
                            MatchPlaner wird den Amateursport revolutionieren!
                        </Typography>
                        <Typography>
                            Automatisierte Prozesse, schnelle und einfache Planung.
                        </Typography>
                        <Typography>
                            Mehr Zeit für die Arbeit auf dem Platz und mehr Spaß an der Tätigkeit!
                        </Typography>
                        <Typography>
                            Professionellere Ausbildung der Spieler*innen bei weniger Arbeitsaufwand.
                        </Typography>
                        <Typography>
                            Mehr Erfolg für die Vereine, mehr Motivation für die Freiwilligen!
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    )
};

export default Vision;