import { Typography, Grid, SvgIcon, AppBar, Paper } from "@mui/material";
import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Copyright as CopyrightIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { AverageText } from "../pages/Start/Fonts";

function Footer() {
  const navigate = useNavigate();

  // reference theme to get access
  const theme = useTheme();

  return (
    <Paper id="footer" sx={{ padding: "20px" }}>
      <Grid container direction="row">
        {/* social media and copyright */}
        <Grid container item direction="column" xs={12} sm={12} md={4}>
          <Grid item>
            <AverageText variant="largeLight" color="primary">
              matchplaner.com
            </AverageText>
          </Grid>
          <Grid item container justifyContent="center">
            <a href="https://www.instagram.com/matchplaner">
              <SvgIcon fontSize="large">
                <InstagramIcon />
              </SvgIcon>
            </a>
            <a href="https://www.facebook.com/matchplaner">
              <SvgIcon fontSize="large">
                <FacebookIcon />
              </SvgIcon>
            </a>
          </Grid>
          <Grid item>
            <Typography>
              Copyright <CopyrightIcon /> 2023 <br />
              All rights reserved
            </Typography>
          </Grid>
        </Grid>
        {/* content links */}
        <Grid container item direction="column" xs={12} sm={6} md={4}>
          {/* <Grid item>
            <Link to="/about">
              <Typography>Über uns</Typography>
            </Link>
          </Grid> */}
          {/* <Grid item>
            <Link to="/contact">
              <Typography>Kontakt</Typography>
            </Link>
          </Grid> */}
          {/* <Grid item>
            <Link to="/jobs">
              <Typography>Jobs</Typography>
            </Link>
          </Grid> */}
          {/* <Grid item>
            <Link to="/privacypolicy">
              <Typography>Datenschutz</Typography>
            </Link>
          </Grid> */}
          {/* <Grid item>
            <Link to="/termsandcondition">
              <Typography>AGBs</Typography>
            </Link>
          </Grid> */}
          <Grid item>
            <Link to="/imprint">
              <Typography>Impressum</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/contact">
              <Typography>Kontakt</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/about">
              <Typography>Über uns</Typography>
            </Link>
          </Grid>
        </Grid>
        {/* action links */}
        <Grid container item direction="column" xs={12} sm={6} md={4}>
          <Grid item>
            <Link to="/login">
              <Typography>Login</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/register">
              <Typography>Registrierung</Typography>
            </Link>
          </Grid>
          {/* <Grid item>
            <Link to="/tutorials">
              <Typography>Tutorials</Typography>
            </Link>
          </Grid> */}
          <Grid item>
            <Link to="/faqs">
              <Typography>FAQs</Typography>
            </Link>
          </Grid>
          {/* <Grid item>
            <Link to="/help">
              <Typography>Hilfe</Typography>
            </Link>
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Footer;
