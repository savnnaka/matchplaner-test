import { useEffect } from "react";

import Catcher from "./Blog/Catcher";
import Footer from "../components/Footer"
import { useTheme } from "@emotion/react";
import SEO from "../components/SEO";
import { styled, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BlogData from "../components/data/BlogData";

function Blog() {

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

  const TruncatedText = styled(Typography)(({theme}) => ({
    textAlign: "start",
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
}));

  const BlogCard = (props) => {
    return (
      <Box
      marginBottom="30px"
      borderRadius="5px"
      padding="10px"
      style={{
        backgroundColor: "inherit",
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.7), 
          rgba(0, 0, 0, 0.7)
        ), url(${props.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",  
      }}>
        <Typography textAlign="start" fontSize={{xs: "0.75rem", xsm: "1rem", sm: "1.2rem"}}>{props.date}</Typography>
        <Link to={"/blog/" + props.id.toString()}>
          <Typography variant="largeLight">{props.title}.</Typography>
        </Link>
        {props.latest && <Typography textAlign="start" paddingBottom="2%" fontSize={{xs: "0.75rem", xsm: "1rem", sm: "1.2rem"}}>{props.abstract}</Typography>}
        {!props.latest && <TruncatedText fontSize={{xs: "0.75rem", xsm: "1rem", sm: "1.2rem"}}>{props.abstract}</TruncatedText>}
        {props.latest && <TruncatedText textAlign="start" fontSize={{xs: "0.75rem", xsm: "1rem", sm: "1.2rem"}}>{props.description}</TruncatedText>}
      </Box>
    );
  }

  {/* Map over BlogData */}
  {/* Reverse BlogData Array and highlight the newest one (highest id) */}
  const cards = BlogData.slice(0).reverse().map(item => {
    {/* latest id */}
    if(item == BlogData[BlogData.length - 1]){
      return(
        <BlogCard
        key={item.id}
        {...item}
        latest={true}
        />
      );
    }
    {/* other ids */}
    return (
      <BlogCard
      key={item.id}
      {...item}
      />
    );
  });

  return (
    <div
      style={{
        height: `calc(100vh - ${heightHeader}px)`, // full height - header
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        bgcolor: theme.palette.primary.main,
      }}
    >
      <SEO
      title="Matchplaner | Blog"
      description="Stöbere durch unseren Blog. Hier stehen unsere Neuigkeiten und Tipps fürs Training."
      name="Matchplaner" 
      type="article"
      url="www.matchplaner.com/blog"
      />

      <Catcher  heightHeader={heightHeader}
                isNarrow={isNarrow}/>

      <Container>
        {cards}
      </Container>

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

export default Blog;
