import { Typography , Stack} from "@mui/material";
import { Box } from "@mui/system";
import { BigText ,LargeText} from "../Start/Fonts";
import { AccessTime, EmojiObjectsOutlined, RocketLaunchOutlined} from "@mui/icons-material";

const IconStyling = {
    lineHeight: "60px",
    width: "18vw",
    height: "18vw",
    textAlign: "center",
    lineHeight: "60px",
    verticalAlign: "middle",
};

function Idea (props){
    return (
        <Stack height={{xs:"auto", sm: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}}
                sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start"},
                    p:"3% 7%",
                    marginBottom: {xs: "15%", sm: "10%", md:"5%"}}}
            direction="column">
            <LargeText  color="primary" 
                        variant="largeLight" 
                        marginBottom="1%" 
                        textAlign={{xs: "center", sm:"left"}}
                        textTransform="uppercase">
                Die <LargeText color="primary" variant="largeBold">Idee</LargeText>
            </LargeText>
            <Typography marginBottom="4%"
                textAlign={{xs: "center", sm:"left"}}>
                Von Trainern für Trainer!
            </Typography>
            <Stack direction="column">
                <Typography textAlign="left">
                    Wir vereinen über 40 Jahre Trainererfahrung in verschiedenen 
                    Altersklassen und wissen, wo die Probleme ehrenamtlicher
                    Trainer*innen liegen. Diese Probleme wollen wir zielgerichtet
                    lösen.
                </Typography>
                <Stack  direction="row" 
                        display="flex" 
                        justifyContent="space-between"
                        padding="3% 10%">
                    <Stack item>
                        <AccessTime 
                            fontSize="huge"
                            style={IconStyling}/>
                    </Stack>
                    <Stack item>
                        <EmojiObjectsOutlined 
                            fontSize="huge"
                            style={IconStyling}/>
                    </Stack>
                    <Stack item>
                        <RocketLaunchOutlined 
                            fontSize="huge"
                            style={IconStyling}/>
                    </Stack>
                </Stack>
                <Typography color="primary">
                    Zeit sparen, Kompetenzen fördern, Motivation boosten!
                </Typography>
            </Stack>
        </Stack>
    )
};

export default Idea;