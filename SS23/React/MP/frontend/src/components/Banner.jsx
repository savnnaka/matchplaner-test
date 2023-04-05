import { Stack ,Box} from "@mui/system";
import { BigBlackText } from "../pages/Start/Fonts";

export default function Banner(){
    return (
        <Stack direction="row"
            sx={{   alignItems: "center", 
                    whiteSpace: "nowrap",
                    padding: "0 7px",
                    zIndex: 1,
                    position: "absolute",
                    width: "100%",
                    backgroundColor: "#d4fc04",}}>
            <Box display={{xs: "none", sm: "none", md: "block"}}
                flex={3}/>
            <BigBlackText variant="largeLight" 
                flex={7} 
                paddingLeft="5%">
                Dein Digitaler <BigBlackText id="banner" component="span" variant="largeBold">
                Co-Trainer
                </BigBlackText>
            </BigBlackText>

        </Stack>
    )
}