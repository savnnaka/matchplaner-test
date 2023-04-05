import { Grid, Card, Typography } from "@mui/material";

function Calendar() {
  const today = new Date();
  const todayDay = today.toLocaleDateString("de-DE", { weekday: "long" });
  const todayDate = today.toLocaleDateString("de-DE", { day: "2-digit" });
  const todayMonth = today.toLocaleDateString("de-DE", { month: "long" });
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowDay = tomorrow.toLocaleDateString("de-DE", {
    weekday: "short",
  });
  const tomorrowDate = tomorrow.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  let inTwoDays = new Date();
  inTwoDays.setDate(tomorrow.getDate() + 1);
  const inTwoDaysDay = inTwoDays.toLocaleDateString("de-DE", {
    weekday: "short",
  });
  const inTwoDaysDate = inTwoDays.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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
          height: "100%",
        }}
      >
        {/* recent day */}
        <Grid
          item
          xs={12}
          container
          alignContent="center"
          sx={{ borderBottom: "solid 1px var(--lightgray)" }}
        >
          <Grid
            item
            xs={4}
            container
            direction="column"
            sx={{ lineHeight: "0.9" }}
          >
            <Grid item>
              <Typography color="var(--lightgreen)">{todayDay}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2green" sx={{ fontSize: "50px" }}>
                {todayDate}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="var(--lightgreen)">{todayMonth}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={8}
            container
            alignSelf="center"
            justifyContent="flex-start"
          >
            <Grid item>
              <Typography>Einträge</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* tomorrow */}
        <Grid item xs={12} container alignSelf="center">
          <Grid item xs={4}>
            <Typography color="var(--lightgreen)">
              {tomorrowDay}, {tomorrowDate}
            </Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="flex-start">
            <Grid item>
              <Typography>Einträge</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* in 2 days */}
        <Grid item xs={12} container alignSelf="center">
          <Grid item xs={4}>
            <Typography color="var(--lightgreen)">
              {inTwoDaysDay}, {inTwoDaysDate}
            </Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="flex-start">
            <Grid item>
              <Typography>Einträge</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Calendar;
