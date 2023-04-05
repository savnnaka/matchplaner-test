import { Button , styled} from "@mui/material";

export const FeatureButton = styled(Button)(({theme}) => ({
    backgroundColor:"inherit",
    color:"white",
    borderColor:"black",
    fontSize: 16,
    width: "100%",
    [theme.breakpoints.up("md")]:{
      fontSize: 20,
    },
    borderRadius: "5px",
    ":hover": {
      backgroundColor: "white",
      color: "black",
      borderColor: "black",
    }
  }));