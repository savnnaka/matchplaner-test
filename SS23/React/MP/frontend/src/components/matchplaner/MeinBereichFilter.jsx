import { Grid } from "@mui/material";
import { Bar } from "./Bar";
export function MeinBereichFilter(props) {
  return (
    <Grid container>
      <Grid container item>
        {props.filter.map((p, index) => (
          <Bar
            text={p.text}
            state={p.state}
            setter={p.setter}
            key={index}
            reset={props.reset}
          />
        ))}
      </Grid>
    </Grid>
  );
}
