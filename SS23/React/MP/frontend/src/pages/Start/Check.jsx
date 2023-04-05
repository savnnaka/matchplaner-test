import { Stack } from "@mui/system";
import { CheckCircleOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function Check(props){
    return (
      <Stack alignItems="center" direction="row"
        padding={{xs: "2%", sm: 0}}>
        <CheckCircleOutline 
          sx={{fontSize:{xs: 10, xsm:20, sm: 30, md: 35},
             marginRight: {xs: "5px", sm: "16px" }}} />
        <Typography textAlign="start"
            fontSize={{xs: "0.75rem", xsm: "1rem"}}>
              {props.text}
        </Typography>
      </Stack>
    )
  };