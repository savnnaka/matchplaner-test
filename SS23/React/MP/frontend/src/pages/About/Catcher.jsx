import { Box } from "@mui/system";
import { Typography ,Stack} from "@mui/material";
import Banner from "../../components/Banner";
import Background from "../../images/background-image-catcher.jpg"
import { HugeText } from "../Start/Fonts";
import { useTheme } from "@emotion/react";

function Catcher (props){
    const theme = useTheme();
    return (
        <Box bgcolor= "rgba(20,20,20,1)"
            height={{xs:"80vh", sm: props.isNarrow ? "100vh" : `calc(100vh - ${props.heightHeader}px)`}}
            sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start"},
                marginBottom: {xs:"10%", sm: "10%"},
                background: `linear-gradient(to bottom, white,black), url(${Background})`,
                backgroundBlendMode: "saturation",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",}}
            position="relative">
            <Banner/>
            <Stack position="relative" sx={{top: {xs: "30%", sm:"45%"}}}>
                <HugeText variant="largelight" 
                    color="primary">Über uns</HugeText>
            </Stack>
        </Box>
    )
};

export default Catcher;