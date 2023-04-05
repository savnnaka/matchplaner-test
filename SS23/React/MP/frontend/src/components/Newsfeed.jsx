import { Grid, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Newsfeed() {
  const { user } = useSelector((state) => state.user);

  return (
    <Card
      sx={{
        border: "1px solid var(--lightgray)",
        height: "250px",
        margin: "0px",
      }}
    >
      <Grid
        container
        justifyContent="center"
        sx={{
          paddingX: "5px",
          overflowY: "scroll",
          height: "100%",
          cursor: "ns-resize",
        }}
      >
        {user.messages.length > 0 ? (
          user.messages.map((obj, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{
                borderBottom: "1px solid var(--lightgreen)",
                color: "white",
                fontSize: "12px",
                padding: "5px",
              }}
            >
              {obj.message}
              {/* <Divider /> */}
            </Grid>
          ))
        ) : (
          <Grid item xs={12} container justifyContent="center" alignContent="center">
            <Typography fontStyle="italic" sx={{ color: "white" }}>
              Keine News
            </Typography>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

export default Newsfeed;
