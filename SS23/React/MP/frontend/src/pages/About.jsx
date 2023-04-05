import { useEffect } from "react";

import Catcher from "./About/Catcher";
import Vision from "./About/Vision"
import Team from "./About/Team"
import Idea from "./About/Idea"
import Footer from "../components/Footer"
import Exist from "./Start/Exist";
import { useTheme } from "@emotion/react";

function About() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Über uns";
  }, []);

  // scroll to top at first visit
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isNarrow = window.innerHeight < 500; 

  const theme= useTheme();

  // get height of header
  let heightHeader = 64;
  useEffect(() => {
    let header = document.getElementById("header");
    heightHeader = header.clientHeight;
  }, []);

  let heightFooter;
  useEffect(() => {
    let footer = document.getElementById("footer");
    heightFooter = footer.clientHeight;
  }, []);

  return (
    <div
      style={{
        height: `calc(100vh - ${heightHeader}px)`, // full height - header
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        bgcolor: theme.palette.primary.main,
      }}
    >
      <Catcher  heightHeader={heightHeader}
                isNarrow={isNarrow}/>
      <Vision   heightHeader={heightHeader}
                isNarrow={isNarrow}/>
      <Team     heightHeader={heightHeader}
                isNarrow={isNarrow}/>
      <Idea     heightHeader={heightHeader}
                isNarrow={isNarrow}/>
        <Exist  heightFooter={heightFooter} 
                heightHeader={heightHeader}
                isNarrow={isNarrow}/>
      <Footer 
          sx={{
            position: "absolute",
            left:"0",
            bottom:"0",
            right:"0",
          }}
        />
    </div>
  );
}

export default About;
