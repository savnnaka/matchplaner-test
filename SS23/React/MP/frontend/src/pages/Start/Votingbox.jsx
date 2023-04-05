import { Typography , Grid ,IconButton} from "@mui/material";
import { Box } from "@mui/system";
import {Favorite, FavoriteBorder} from "@mui/icons-material"
import { useState } from "react";
import { setFacts } from "../../features/user/userAPI";
import { GreenText } from "./Fonts";

const Votingbox = (props) => {
    // handle interaction (like/unlike) the statement/agreement
  const [clickedAgreement, setClickedAgreement] = useState(false);
  const likeAgreement = () => {
    // console.log("+1");
    setClickedAgreement(true);
    setFacts(props.counterAgreement + 1);
    props.setCounterAgreement(props.counterAgreement + 1);
  };
  const dislikeAgreement = () => {
    // console.log("-1");
    setClickedAgreement(false);
    setFacts(props.counterAgreement - 1);
    props.setCounterAgreement(props.counterAgreement - 1);
  };

    return (
        <Box sx={{
                width: "175px",
                borderRadius: "5px", 
                border: '1px solid #d4fc04', 
                p: "5px 13px", 
                textAlign:"center",
                alignItems: "center",}}
        >
            <GreenText>Geht's Dir auch so?</GreenText>
            <Grid item container justifyContent="center">
                <Grid item alignSelf="center">
                  {clickedAgreement ? (
                    <IconButton onClick={dislikeAgreement}>
                      <Favorite color="error" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={likeAgreement}>
                      <FavoriteBorder color="error" />
                    </IconButton>
                  )}
                </Grid>
                <Grid item alignSelf="center">
                  <Typography color="error" paddingLeft={1}>
                    {props.counterAgreement}
                  </Typography>
                </Grid>
              </Grid>
        </Box>
    );
}

export default Votingbox;