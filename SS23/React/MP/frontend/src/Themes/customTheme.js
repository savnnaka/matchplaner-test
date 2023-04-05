import { createTheme } from "@mui/material";

// define all colors
let lightgreen = "#d2ff00";
let lightblack = "#161616";
let darkgray = "#353838";
let browngray = "rgb(30,30,30)";
let lightgray = "#7a7c7c";
let red = "#ba000d";

// define all props
let light = 100;
let bold = 700;
let small = 10;
let normal = 16;
let large = 40;
let huge = 100;
let largeButton = (2 * large) / 3;

// define breakpoints
let xs = 0;
let mobile = 0;
let xsm = 300;
let sm = 600;
let tablet = 640;
let md = 900;
let laptop = 1024;
let lg = 1200;
let desktop = 1200;
let xl = 1536;

let partialTheme = createTheme({
  // breakpoints
  // default: xs = 0px, sm = 600px, md = 900px, lg = 1200px, xl = 1536px
  // Media Queries: theme.breakpoint.up/down/only/not/between
  breakpoints: {
    values: {
      xs: xs,
      mobile: mobile,
      xsm: xsm,
      sm: sm,
      tablet: tablet,
      md: md,
      laptop: laptop,
      lg: lg,
      desktop: desktop,
      xl: xl,
    },
  },
});

export const customTheme = createTheme({
  ...partialTheme,
  // default colors for the whole website
  palette: {
    mode: "dark",
    // primary, secondary, error, warning, info, success
    // main, light, dark, contrastText (light and dark and contrastText will be calculated from main)
    primary: {
      main: lightgreen,
    },
    secondary: {
      main: lightgreen,
    },
  },

  // styles of typography (text)
  typography: {
    // all types
    fontFamily: ["Poppins", "Roboto", "sans-serif"].join(","),
    // fontSize: default is 14
    fontSize: normal,
    // variants
    // h1, h2, h3, h4, h5, h6, subtitle1, subtitle2, body1, body2, button, caption, overline
    // custom elements can be added (with the same structure)
    mainHeader: {
      fontSize: large,
      fontWeight: bold,
      marginBottom: "30px",
    },
    smallLight: {
      fontSize: small,
      fontWeight: light,
    },
    smallBold: {
      fontSize: small,
      fontWeight: bold,
    },
    normalBold: {
      fontSize: normal,
      fontWeight: bold,
    },
    largeLight: {
      fontSize: large,
      fontWeight: light,
    },
    largeBold: {
      fontSize: large,
      fontWeight: bold,
    },
    hugeLight: {
      fontSize: huge,
      fontWeight: light,
    },
    hugeBold: {
      fontSize: huge,
      fontWeight: bold,
    },
  },

  // spacing
  // default is 8px (={1})

  // density

  // transitions

  // components
  // customize styles, default props etc for every component
  // creating new component variants or modify existing ones
  components: {
    // TEXT
    // links
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          cursor: "pointer",
          paddingLeft: "2px",
        },
      },
    },
    // NAVIGATION
    // tab navigation wrapper
    MuiTabs: {
      defaultProps: {
        variant: "fullWidth",
      },
    },
    // tab navigation text
    MuiTab: {
      variants: [
        {
          props: { variant: "smallText" },
          style: {
            fontSize: small,
            padding: "5px",
            minWidth: 0,
            minHeight: 0,
          },
        },
      ],
    },
    // BUTTON
    // simple buttons
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: lightblack,
            color: lightgreen,
          },
        },
      },
      variants: [
        {
          props: { size: "large" },
          style: {
            fontSize: largeButton,
          },
        },
      ],
    },
    // icon buttons (inputAdornment (show/hide password), ...)
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: lightgreen,
        },
      },
    },
    // INPUT
    // textfield in general
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        root: {
          width: "100%",
          minWidth: "100px",
          maxWidth: "500px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // [partialTheme.breakpoints.up("xs")]: {
          //   width: "200px",
          // },
          // [partialTheme.breakpoints.up("sm")]: {
          //   width: "250px",
          // },
          // [partialTheme.breakpoints.up("md")]: {
          //   width: "300px",
          // },
          // [partialTheme.breakpoints.up("lg")]: {
          //   width: "400px",
          // },
          // [partialTheme.breakpoints.up("xl")]: {
          //   width: "500px",
          // },
        },
      },
    },
    // IMAGE LIST
    // item bar
    MuiImageListItemBar: {
      styleOverrides: {
        titleWrapActionPosRight: {
          display: "none",
        },
        actionIconActionPosRight: {
          margin: "auto",
        },
      },
    },
  },
});
