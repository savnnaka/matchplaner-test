import { TextField } from "@mui/material";
import moment from "moment";

export function InputField(props) {
  switch (props.fieldName) {
    case "directRequest":
      return (
        <div style={{ display: "inline" }}>
          <TextField name={props.fieldName} type="checkbox" />
          <label style={{ marginLeft: "1rem" }} htmlFor={props.fieldName}>
            Direktanfrage
          </label>
        </div>
      );

    case "matchDate":
      return (
        <TextField
          name={props.fieldName}
          type="date"
          required
          value={moment(new Date()).format("YYYY-MM-DD")}
        ></TextField>
      );

    case "matchTime":
      return (
        <TextField name={props.fieldName} type="time" required></TextField>
      );

    case "matchLocation":
      return (
        <TextField
          name={props.fieldName}
          type="select"
          required
          placeholder="Spielstätte"
        ></TextField>
      );
    default:
      return (
        <>
          <TextField
            name={props.fieldName}
            type="text"
            className="filter-input"
          />
        </>
      );
  }
}
