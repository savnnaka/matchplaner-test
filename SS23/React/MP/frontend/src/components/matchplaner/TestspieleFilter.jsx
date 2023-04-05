import { MenuItem, Button, TextField } from "@mui/material";
import { gamesTypes } from "../../utils/constants/gamesTypes";
import { fieldTypes } from "../../utils/constants/fieldTypes";
import { allAges } from "../../utils/ageAndLeague";

export function TestspieleFilter(props) {
  const filter = props.filterProps;

  /**
   * Handles the update of the age filter
   * @param {String} name String
   * @param {Number} value Number
   */
  const handleAgeChange = (name, value) => {
    if (value !== "") {
      filter.setAgeFilter({
        name: name,
        value: value,
        applied: true,
      });
    } else {
      filter.setAgeFilter({
        name: name,
        value: value,
        applied: false,
      });
    }
  };

  /**
   * Handles the update of the date filter
   * @param {String} name String
   * @param {Date} value Date
   */
  const handleDateChange = (name, value) => {
    if (value !== "") {
      filter.setDateFilter({
        name: name,
        value: value,
        applied: true,
      });
    } else {
      filter.setDateFilter({
        name: name,
        value: value,
        applied: false,
      });
    }
  };

  /**
   * Handles the update of the destination filter
   * @param {String} name String
   * @param {String} value String
   */
  const handleDestinationChange = (name, value) => {
    if (value !== "") {
      filter.setDestFilter({
        name: name,
        value: value,
        applied: true,
      });
    } else {
      filter.setDestFilter({
        name: name,
        value: value,
        applied: false,
      });
    }
  };

  /**
   * Handles the update of the typeOfField filter
   * @param {String} name String
   * @param {String} value String
   */
  const handleFieldChange = (name, value) => {
    if (value !== "") {
      filter.setTofFilter({
        name: name,
        value: value,
        applied: true,
      });
    } else {
      filter.setTofFilter({
        name: name,
        value: value,
        applied: false,
      });
    }
  };

  /**
   * Handles the update of the typeOfGame filter
   * @param {String} name String
   * @param {String} value String
   */
  const handleTypeChange = (name, value) => {
    if (value !== "") {
      filter.setTogFilter({
        name: name,
        value: value,
        applied: true,
      });
    } else {
      filter.setTogFilter({
        name: name,
        value: value,
        applied: false,
      });
    }
  };

  /**
   * Resets filter value to the initial state
   */
  const resetFilters = () => {
    filter.setAgeFilter({ name: "age", value: "", applied: false });
    filter.setDateFilter({
      name: "date",
      value: "",
      applied: false,
    });
    filter.setDestFilter({
      name: "destination",
      value: "",
      applied: false,
    });
    filter.setTofFilter({
      name: "typeOfField",
      value: "",
      applied: false,
    });
    filter.setTogFilter({
      name: "typeOfGame",
      value: "",
      applied: false,
    });
  };

  return (
    <ul className="filter-list">
      <li>
        <TextField
          select
          name="age"
          label="Spielklasse"
          variant="outlined"
          value={filter.ageFilter.value}
          onChange={(e) => {
            handleAgeChange(e.target.name, e.target.value);
          }}
        >
          <MenuItem key={0} value={""}>
            Wählen Sie eine Option
          </MenuItem>
          {allAges.map((option, idx) => (
            <MenuItem key={idx + 1} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </li>
      <li className="filter-li">
        <TextField
          inputProps={{ style: { textAlign: "center" } }}
          name="date"
          label="Datum"
          type="date"
          variant="outlined"
          value={filter.dateFilter.value}
          onChange={(e) => handleDateChange(e.target.name, e.target.value)}
        />
      </li>
      <li className="filter-li">
        <TextField
          select
          name="destination"
          label="Spielort"
          variant="outlined"
          value={filter.destFilter.value}
          onChange={(e) =>
            handleDestinationChange(e.target.name, e.target.value)
          }
        >
          <MenuItem key={0} value={""}>
            Wählen Sie eine Option
          </MenuItem>
          <MenuItem key="Heim" value="Heim">
            Heim
          </MenuItem>
          <MenuItem key="Auswärts" value="Auswärts">
            Auswärts
          </MenuItem>
        </TextField>
      </li>
      <li className="filter-li">
        <TextField
          select
          name="typeOfField"
          label="Rasenart"
          variant="outlined"
          value={filter.tofFilter.value}
          onChange={(e) => handleFieldChange(e.target.name, e.target.value)}
        >
          <MenuItem key={0} value={""}>
            Wählen Sie eine Option
          </MenuItem>
          {fieldTypes.map((option, idx) => (
            <MenuItem key={idx + 1} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </li>
      <li className="filter-li">
        <TextField
          select
          name="typeOfGame"
          label="Spielmodus"
          variant="outlined"
          value={filter.togFilter.value}
          onChange={(e) => handleTypeChange(e.target.name, e.target.value)}
        >
          <MenuItem key={0} value={""}>
            Wählen Sie eine Option
          </MenuItem>
          {gamesTypes.map((option, idx) => (
            <MenuItem key={idx + 1} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </li>
      <li>
        <Button
          // style={{ padding: "0 2.5rem" }}
          variant="contained"
          onClick={resetFilters}
        >
          {/* Reset */}
          Zurücksetzen
        </Button>
      </li>
    </ul>
  );
}
