import { Grid, Typography } from "@mui/material";

export function Bar(props) {
  const handleClick = () => {
    props.reset();
    props.setter(true);
  };

  return (
    <>
      <Grid
        container
        item
        sx={{
          border: "1px solid #353838",
          borderRadius: "10px",
          margin: "1rem 1.5rem",
          cursor: "pointer",
        }}
        className={` ${props.state ? "bg-yellow" : ""}`}
        onClick={handleClick}
      >
        <Grid item container xs={10}>
          <Typography noWrap align="left" sx={{ paddingLeft: "1rem" }}>
            {props.text}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={2}
          justifyContent="flex-end"
          sx={{
            backgroundColor: "#353838",
            border: "1px solid #353838",
            borderRadius: "5px",
          }}
        >
          <Grid item container justifyContent="center" alignItems="center">
            {props.state ? (
              <img
                src={
                  require("../../resources/icons/arrowsquaredown_yellow.svg")
                    .default
                }
                alt="arrow down"
                style={{}}
              />
            ) : (
              <img
                src={
                  require("../../resources/icons/arrowsquaredown_white.svg")
                    .default
                }
                alt="arrow down"
                style={{}}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
