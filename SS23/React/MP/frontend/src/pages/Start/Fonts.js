import { Typography , styled} from "@mui/material";

/* Styled Texts */
export const WhiteText = styled(Typography)(({theme}) => ({
    color: "white",
    marginTop: "5px",
    fontSize: "0.75rem",
    [theme.breakpoints.up("xsm")]:{
        fontSize: "1rem",
    },
}));

export const BigBlackText = styled(Typography)(({theme}) => ({
    color:"black",
    whiteSpace:"nowrap",
    fontSize: "1rem",
    [theme.breakpoints.up("xsm")]: {
        fontSize: "1.25rem",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "2.5rem",
    },
}));

export const MediumText = styled(Typography)(({theme}) => ({
    fontSize: "1rem",
    [theme.breakpoints.up("sm")]: {
        fontSize: "1.25rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
    },
}));

export const AverageText = styled(Typography)(({theme}) => ({
    marginTop: "5px",
    fontSize: "1.25rem",
    [theme.breakpoints.up("sm")]: {
        fontSize: "1.6rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "1.6rem",
    },
}));

export const BigText = styled(Typography)(({theme}) => ({
    marginTop: "5px",
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
    },
}));

export const LargeText = styled(Typography)(({theme}) => ({
    marginTop: "5px",
    fontSize: "1.5rem",
    [theme.breakpoints.up("xsm")]: {
        fontSize: "2rem",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "2.5rem",
    },
}));

export const BigWhiteText = styled(WhiteText)(({theme}) => ({
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
        fontSize: "2.5rem",
    },
}));

export const BigGreenText = styled(Typography)(({theme}) => ({
    color: "#d4fc04",
    fontSize: "1.5rem",
    [theme.breakpoints.up("md")]:{
        textAlign: "left",
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: "2.5rem",
    },
}));

export const MessageText = styled(Typography)(({theme}) => ({
    color: "white",
    textAlign: "center", 
    [theme.breakpoints.down("lg")]:{
        fontSize: "1rem",
    },
    [theme.breakpoints.down("md")]:{

        display: "none",
    },
}));

export const StatsText = styled(Typography)(({theme}) => ({
    color: "white",
    whiteSpace:"nowrap",
    marginTop: "5px",
    fontWeight: "bold", 
    fontSize: "1rem",
    [theme.breakpoints.up("xsm")]:{
        fontSize: "1.5rem",
    },
}));

export const GreenText = styled(Typography)({
    color: "#d4fc04",
    marginTop: "5px",
});

export const HugeText = styled(Typography)(({theme}) => ({
    fontSize: 20,
    color: theme.palette.primary,
    [theme.breakpoints.up("xsm")]:{
        fontSize: 23,
    },
    [theme.breakpoints.up(400)]:{
        fontSize: 30,
    },
    [theme.breakpoints.up("sm")]:{
        fontSize: 40,
    },
    [theme.breakpoints.up("md")]:{
        fontSize: 70,
    },
    [theme.breakpoints.up("lg")]:{
        fontSize: 80,
    }
}));