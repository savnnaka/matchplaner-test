import { createTheme } from "@mui/material";

// TODO: schauen, wann die farben von theme.mainColors genommen werden, und wann die palette.primary/secondary

// "&.className" kein Leerzeichen zwischen & und .
// außer wenn man schauen will, dass mehrere Klassen vorhanden sind, dann natürlich Leerzeichen

let theme = createTheme({
  mainColors: {
    lightgreen: "#d2ff00",
    lightblack: "#161616",
    darkgray: "#353838",
    lightgray: "#7a7c7c",
  },
});

// default values of theme
// https://mui.com/material-ui/customization/default-theme/

export const mainTheme = createTheme({
  // same values as bootstrap (for the slider)
  breakpoints: {
    values: {
      xs: 0,
      tiny: 360,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  // defining the colors (that appear automatic)
  // https://mui.com/material-ui/customization/palette/
  palette: {
    primary: {
      main: "#d2ff00",
    },
    secondary: {
      main: "#161616",
      light: "#7a7c7c",
    },
    disabledIcon: {
      main: "rgba(255,150,150,0.5)",
    },
  },
  // customize any (mui) component
  components: {
    MuiMenu: {
      styleOverrides: {
        root: {
          maxHeight: "400px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: theme.mainColors.lightblack,
          backgroundColor: theme.mainColors.lightgreen,
          fontSize: "1em",
          textTransform: "uppercase",
          fontWeight: "800",
          borderRadius: "30px",

          border: "1px solid" + theme.mainColors.lightgreen,

          // minWidth: "150px",
          // paddingLeft: "30px",
          // paddingRight: "30px",
          margin: "10px",

          // on hover
          "&:hover": {
            backgroundColor: theme.mainColors.lightblack,
            color: theme.mainColors.lightgreen,
          },
          "&:disabled": {
            backgroundColor: theme.mainColors.lightgray,
            color: theme.mainColors.lightblack,
            border: "1px solid " + theme.mainColors.lightgray,
          },
        },
      },
      variants: [
        {
          props: { variant: "wide" },
          style: {
            minWidth: "150px",
          },
        },
      ],
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // border: "1px solid gray",
        },
      },
      variants: [
        {
          props: { variant: "enabled" },
          style: {
            // backgroundColor: "rgba(0,0,0,0.5)",
            ":hover": {
              // backgroundColor: "rgba(0,200,0,0.5)",
              // backgroundColor: "rgba(255,255,255,0.5)",
              backgroundColor: "rgba(0,0,0,0.5)",
            },
          },
        },
        {
          props: { variant: "disabled" },
          style: {
            backgroundColor: "rgba(0,0,0,0.5)",
            ":hover": {
              backgroundColor: "rgba(255,0,0,0.5)",
            },
          },
        },
        {
          props: { variant: "comingSoon" },
          style: {
            backgroundColor: "rgba(200,200,200,0.5)",
            ":hover": {
              // converted #d2ff00 to rgb(210,255,0)
              backgroundColor: "rgba(210,255,0,0.8)",
            },
          },
        },
        {
          props: { variant: "about" },
          style: {
            // backgroundColor: "rgba(200,200,200,0.5)",
            ":hover": {
              backgroundColor: "rgba(210,255,0,0.3)",
            },
          },
        },
        {
          props: { variant: "register-active" },
          style: {
            backgroundColor: theme.mainColors.darkgray,
            border: "2px solid " + theme.mainColors.lightgreen,
            color: "white",
          },
        },
        {
          props: { variant: "register-inactive" },
          style: {
            backgroundColor: theme.mainColors.lightgreen,
            border: "none",
            color: theme.mainColors.lightblack,
          },
        },
      ],
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          // "& MuiStepLabel-label.Mui-active": {
          //   color: "red",
          // },
          // color for the active label
          // "& .Mui-active": {
          //   color: theme.mainColors.lightgreen,
          // },
          // // color for the label in general
          // "& .MuiStepLabel-label": {
          //   // color: theme.mainColors.lightgreen,
          //   color: "red",
          // },
          // // color for the disabled label (exclude the button, otherwise will the disabled button be colored like this too)
          // "& .Mui-disabled:not(button)": {
          //   color: theme.mainColors.lightgray,
          // },
          // // color of the step icons in general
          // "& .MuiStepIcon-root": {
          //   color: theme.mainColors.lightgray,
          // },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          "& .Mui-disabled": {
            color: theme.mainColors.lightgray,
          },
          "& .Mui-completed": {
            color: "white",
          },
        },
        label: {
          "&.Mui-active": {
            color: theme.mainColors.lightgreen,
          },
          "&.Mui-completed": {
            color: "white",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: theme.mainColors.lightgray,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: theme.mainColors.lightgray,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: theme.mainColors.darkgray,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 30,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          // maxHeight: "2rem"
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // marginBottom: "10px",
          // marginRight: "10px",
          // width: "300px",
          // width: "220px", //sodass alle gleiche Breite
          // minWidth: "150px",

          "& .MuiSelect-select": {
            padding: "10px",
          },

          // color of the label when clicked/focused in this field (label switch to top of field)
          "& label.Mui-focused": {
            color: "white",
          },
          // label in general of textfield
          "& label": {
            // color: theme.mainColors.lightgray,
          },
          // affects the outline (border) of the input field
          "& .MuiOutlinedInput-root": {
            // width: "150px",
            "& fieldset": {
              borderColor: theme.mainColors.lightgray,
              legend: {
                width: "unset",
                span: {
                  fontSize: "12px",
                },
              },
            },

            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.mainColors.lightgreen,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          // border: "1px solid" + theme.mainColors.lightgray,
          "& fieldset": {
            borderColor: theme.mainColors.lightgray,
          },
          "&&:hover fieldset": {
            borderColor: "white",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.mainColors.lightgray,
          "&.Mui-focused": {
            color: "white",
          },
        },
      },
    },
    // MuiFormControl: {
    //   styleOverrides: {
    //     root: {
    //       // border: "1px solid " + theme.mainColors.lightgray,
    //       // borderRadius: "4px",
    //       "& fieldset": {
    //         borderColor: theme.mainColors.lightgray,
    //         // to remove the space if there is no label
    //         legend: {
    //           width: "unset",
    //         },
    //         "&:hover": {
    //           borderColor: "white",
    //         },
    //       },
    //       "&:hover fieldset": {
    //         borderColor: "white",
    //       },
    //       "&.Mui-focused fieldset": {
    //         borderColor: theme.mainColors.lightgreen,
    //       },
    //     },
    //   },
    // },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // minHeight: "50px",
          // height: "50px",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.mainColors.darkgray,
          padding: "10px",
          // boxShadow: "5px 5px 5px var(--lightgreen)",
          border: "2px outset var(--lightgreen)",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          // 50px of appbar and - (2*5px padding)
          minHeight: "40px",
          // height: "40px",
          "@media (min-width:0px) and (orientation: landscape)": {
            minHeight: "40px",
          },
          "@media (min-width:600px)": {
            minHeight: "40px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // backgroundColor: "#222222",
          backgroundColor: theme.mainColors.darkgray,
          margin: "10px",
          padding: "6px",
          // border: "2px solid white",
          border: "none",
          boxShadow: "none",
          // maxWidth: "250px",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        avatar: {
          margin: 0,
        },
        action: {
          margin: 0,
        },
        title: {
          fontSize: "15px",
          fontWeight: "bolder",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    // affects all inputs
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: theme.mainColors.darkgray,
          color: "white",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.mainColors.lightblack,
          padding: "10px",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: theme.mainColors.lightgreen,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    // affects accordion
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: theme.mainColors.lightblack,
          color: "white",
        },
      },
    },
  },

  // customize all text settings
  // https://mui.com/material-ui/customization/typography/
  typography: {
    fontFamily: [
      "Poppins",
      "Roboto",
      "sans-serif",
      "Montserrat",
      "Raleway",
      '"Robote Condensed"',
    ].join(","),
    fontSize: 16,
    largeAndBold: {
      fontSize: "2.5em",
      fontWeight: "700",
    },
    largeAndThin: {
      fontSize: "2.5em",
      fontWeight: "200",
    },
    smallAndBold: {
      fontSize: "1em",
      fontWeight: "700",
    },
    smallAndThin: {
      fontSize: "1em",
      fontWeight: "200",
    },
    // mainHeader is used on top of each site with a header
    mainHeader: {
      color: theme.mainColors.lightgreen,
      marginBottom: "20px",
      fontSize: "2em",
      fontWeight: "700",
      display: "block", // otherwise will the marginBottom be ignored
    },
    h1: {
      color: theme.mainColors.lightgreen,
      marginBottom: "10px",
    },
    h1green: {
      color: theme.mainColors.lightgreen,
      fontSize: "4em",
      fontWeight: "800",
      display: "block",
    },
    h1white: {
      color: "white",
      fontSize: "4em",
      fontWeight: "800",
      display: "block",
    },
    h2: {
      color: theme.mainColors.lightgreen,
      // marginBottom: "10px",
    },
    h2green: {
      color: theme.mainColors.lightgreen,
      fontSize: "1.4em",
      fontWeight: "800",
      textTransform: "uppercase",
      display: "block",
    },
    h2white: {
      color: "white",
      fontSize: "1.4em",
      fontWeight: "800",
      textTransform: "uppercase",
      display: "block",
    },
    h3: {
      color: theme.mainColors.lightgreen,
      // marginBottom: "10px",
    },
    h3green: {
      color: theme.mainColors.lightgreen,
      fontSize: "1.4em",
      fontWeight: "800",
      display: "block",
    },
    h3white: {
      color: "white",
      fontSize: "1.4em",
      fontWeight: "800",
      display: "block",
    },
    h4: {
      color: theme.mainColors.lightgreen,
      marginBottom: "10px",
    },
    h4green: {
      color: theme.mainColors.lightgreen,
      fontSize: "1.2em",
      fontWeight: "200",
      display: "block",
    },
    h4white: {
      color: "white",
      fontSize: "1.2em",
      fontWeight: "200",
      display: "block",
    },
    h5: {
      color: theme.mainColors.lightgreen,
      // marginBottom: "10px",
      fontWeight: "bold",
    },
    h5green: {
      color: theme.mainColors.lightgreen,
      fontSize: "1em",
      fontWeight: "200",
      display: "block",
    },
    h5white: {
      color: "white",
      fontSize: "1em",
      fontWeight: "200",
      display: "block",
    },
    h6: {
      color: "white",
      marginBottom: "10px",
    },
    h6green: {
      color: theme.mainColors.lightgreen,
      fontSize: "0.6em",
      fontWeight: "800",
      textTransform: "uppercase",
      display: "block",
    },
    h6white: {
      color: "white",
      fontSize: "0.6em",
      fontWeight: "800",
      textTransform: "uppercase",
      display: "block",
    },
    body1white: {
      color: "white",
      fontSize: "0.9em",
      // fontWeight: "200",
      fontWeight: "400",
    },
    body1green: {
      color: theme.mainColors.lightgreen,
      fontSize: "0.9em",
      // fontWeight: "200",
      fontWeight: "400",
    },
    body2white: {
      color: "white",
      fontSize: "0.9em",
      fontWeight: "600",
    },
    subtitle1: {
      color: theme.mainColors.lightgreen,
      fontWeight: "bold",
    },
    subtitle2: {
      color: "white",
    },
    body2: {
      color: "white",
    },
  },
});
