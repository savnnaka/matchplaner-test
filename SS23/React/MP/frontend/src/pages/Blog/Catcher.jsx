import { Box } from "@mui/system";
import { Typography ,Stack} from "@mui/material";
import Banner from "../../components/Banner";
import Background from "../../images/background-image-catcher.jpg"
import { HugeText } from "../Start/Fonts";

function Catcher (props){
    return (
        <Box bgcolor= "rgba(20,20,20,1)"
            height={{xs:"80vh", sm: props.isNarrow ? "100vh" : `calc(100vh - ${props.heightHeader}px)`}}
            sx={{
                marginBottom: {xs:"10%", sm: "10%"},
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4) , rgba(0,0,0,0.4)), linear-gradient(to top, rgba(0,0,0,0.9) , rgba(0,0,0,0) 20%), linear-gradient(to bottom, rgba(0,0,0,0.9) , rgba(0,0,0,0) 20%), url(
                ${Background}
                )`,                
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",}}
            position="relative">
            <Banner/>
            <Stack position="relative" sx={{top: {xs: "30%", sm:"45%"}}}>
                <HugeText variant="largelight" 
                    color="primary" textTransform="uppercase">Trainerwissen</HugeText>
            </Stack>
        </Box>
    )
};

export default Catcher;