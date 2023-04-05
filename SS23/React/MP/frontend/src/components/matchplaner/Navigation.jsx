import { Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Testspielbörse } from "./Testspielbörse";
import { MeinBereich } from "./MeinBereich";

export function Navigation(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div style={{ width: "80%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor={"primary"}
          variant="fullWidth"
        >
          <Tab label="Testspielbörse" value={0} />
          <Tab label="Mein Bereich" value={1} />
        </Tabs>
      </div>
      <Grid container sx={{ marginTop: "1rem" }}>
        {value === 0 && <Testspielbörse />}
        {value === 1 && <MeinBereich />}
      </Grid>
    </>
  );
}
