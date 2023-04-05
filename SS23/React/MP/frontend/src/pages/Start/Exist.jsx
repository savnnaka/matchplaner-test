import { Grid, Container, Typography } from "@mui/material"
import existLogos from "../../images/exist-logos.jpg";

export default function Exist(props) {
    return(
        <Grid
        container
        minHeight={props.isNarrow ? "auto" : `calc(100vh - ${props.heightFooter}px - ${props.heightHeader}px)`} // full height - header
        height={props.isNarrow ? "auto" : `calc(100vh - ${props.heightFooter}px) - ${props.heightHeader}px`} // full height - header
        id="exist"
        direction="column"
        justifyContent="space-evenly"
        margin="5% 0"
        sx={{scrollSnapAlign: {sm: "none", md: props.isNarrow ? "none" : "start"}}}
        >
        {/* description */}
        <Container>
          <Typography>
            Wir sind ein staatlich gefördertes Unternehmen.
          </Typography>
        </Container>
        {/* image */}
        <Container>
          <img src={`${existLogos}`} alt="EXIST Logo" width="100%"/>
        </Container>
      </Grid>
    )
};