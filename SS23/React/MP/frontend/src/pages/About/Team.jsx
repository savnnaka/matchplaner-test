import { Box } from "@mui/system";
import { Stack ,Typography} from "@mui/material";
import { MediumText, BigText, LargeText } from "../Start/Fonts";
import Picture from "../../images/FootballMan.png"

function TeamMember (props){
    return (
        <Stack direction="column">
            <Box component="img"
                alt="Teammember"
                src={props.img}
                height="auto"
                width={{xs: "45vw", xsm: "30vw", sm:"15.5vw"}}
                m={{xs: 0, xsm:"0vw 1vw"}}/>
            <MediumText color="primary" variant="LargeLight"
                textTransform="uppercase">
                {props.name}
            </MediumText>
            <MediumText color="primary" variant="LargeLight">
                {props.position}
            </MediumText>
        </Stack>
    )
};

function Team (props){
    return (
        <Box height={{xs:"auto", sm: props.isNarrow ? "auto" : `calc(100vh - ${props.heightHeader}px)`}}
            sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start", lg: props.isNarrow ? "none" : "start"}}}
            paddingTop={{xs: "10%", sm:"2%"}}
            justifyContent="center">
            <Stack direction="row" m="0% 7% 1% 7%"
                justifyContent={{xs: "center", sm: "left"}}>
                <LargeText variant="largeLight" color="primary">Das {" "}
                <LargeText variant="largeBold" color="primary">Team</LargeText></LargeText>
            </Stack>
            <Stack direction={{xs: "column", sm: "row"}}
                justifyContent="center"
                padding={{xs: "2% 23%", xsm: "2% 17%"}}>
                <Stack 
                    flex={1}
                    direction={{xs: "column", xsm: "row"}}
                    justifyContent="center">
                    <TeamMember img={Picture}
                                name="Name"
                                position="Position"/> 
                    <TeamMember img={Picture}
                                name="Name"
                                position="Position"/> 
                </Stack>
                <Stack 
                    flex={1}
                    direction={{xs: "column", xsm: "row"}}
                    justifyContent="center">
                    <TeamMember img={Picture}
                                name="Name"
                                position="Position"/> 
                    <TeamMember img={Picture}
                                name="Name"
                                position="Position"/> 
                </Stack>
            </Stack>
        </Box>
    )
};

export default Team;