import BlogData from "../../components/data/BlogData";
import Banner from "../../components/Banner";
import { HugeText , WhiteText} from "../Start/Fonts";
import { Box } from "@mui/system";
import { Divider, Stack, Typography, Container } from "@mui/material";
import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { customTheme } from "../../Themes/customTheme";
import { useTheme } from "@emotion/react";
import { Opacity } from "@mui/icons-material";

function Title(props){

    let lightblack = "#161616";

    const hashtags = props.tags.map(tag => {
        return "#" + tag + " "
    })

    return (
        <Stack
        minHeight="90vh"
        display="flex"
        direction="column"
        justifyContent="flex-end" 
        paddingTop= "5%"
        style={{
            backgroundColor: "inherit",
            background: `linear-gradient(to bottom, transparent ,#161616 90% 10%), url(${props.img})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
            <Stack>
                <HugeText variant="largelight" 
                    color="primary" textTransform="uppercase">{props.title}</HugeText>
            </Stack>
            <Stack item
                margin="5%">
                <WhiteText variant="normalBold"
                sx={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    textAlign: "left"}}>
                    {props.abstract}
                </WhiteText>
                <WhiteText variant="normalLight" textAlign="left">
                    {props.date} - {hashtags}
                </WhiteText>
            </Stack>

        </Stack>
    )
};

function BlogPage (){

    // get BlogData, where id=props.id
    const  {id}  = useParams()
    const data = BlogData.find((element) => {
        return element.id.toString() === id
    });

    
    // get height of header
    let heightHeader = 64;
    useEffect(() => {
        let header = document.getElementById("header");
        heightHeader = header.clientHeight;
    }, []);
    
    const isNarrow = window.innerHeight < 500; 
    const theme = useTheme();
    
    // scroll to top at first visit
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    // redirect to /blog for undefined ids
    if(!data) {
        console.log("navitage");
        return(
            <Navigate to="/blog" />
        );
    }

    return(
        <Stack 
            style={{
            height: "auto",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            bgcolor: theme.palette.primary.main,}}>
            <SEO
            title="Matchplaner | Blog"
            description={data.abstract}
            name="Matchplaner" 
            type="article"
            url={"www.matchplaner.com/blog" + data.id.toString()}
            />
            <Title  heightHeader={heightHeader}
                    isNarrow={isNarrow}
                    id={data.id}
                    title={data.title}
                    abstract={data.abstract}
                    description={data.description}
                    date={data.date}
                    tags={data.tags}
                    img={data.img}
                    />
            <Divider item
                sx={{ borderBottomWidth: 5,
                    marginLeft:"5%",
                    marginRight:"5%"}}
                variant="middle" 
                fontSize="3px"
                color={theme.palette.primary.main}
                width="90%"
                light={false}/>
            <Box padding="5%">
                <Typography>
                    {data.description}
                </Typography>
            </Box>
        </Stack>
    )
    
}

export default BlogPage;