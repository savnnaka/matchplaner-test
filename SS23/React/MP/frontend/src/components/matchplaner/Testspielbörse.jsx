import { TestspieleFilter } from "./TestspieleFilter";
import { MatchCard } from "./MatchCard";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MatchInfoModal } from "../modals/MatchInfoModal";
import { RequestMatchModal } from "../modals/RequestMatchModal";
import moment from "moment";
import { Grid } from "@mui/material";

export function Testspielbörse(props) {
  // set custom title (for google analytics)
  // useEffect(() => {
  //   document.title = "Matchplaner - Börse";
  // }, []);

  // getting the necessary state information
  const { matchesAvailable } = useSelector((state) => state.matchplaner);
  const { age, league, favoriteMatches } = useSelector((state) => state.team);
  let matches = matchesAvailable;

  // init filter states
  const [ageFilter, setAgeFilter] = useState({
    name: "age",
    value: age.value,
    applied: true,
  });

  const [dateFilter, setDateFilter] = useState({
    name: "date",
    value: "",
    applied: false,
  });

  const [destFilter, setDestFilter] = useState({
    name: "destination",
    value: "",
    applied: false,
  });

  const [tofFilter, setTofFilter] = useState({
    name: "typeOfField",
    value: "",
    applied: false,
  });

  const [togFilter, setTogFilter] = useState({
    name: "typeOfGame",
    value: "",
    applied: false,
  });

  // init filterProps object which is passed on to the TestspielFilter component
  const filterProps = {
    ageFilter,
    setAgeFilter,
    dateFilter,
    setDateFilter,
    destFilter,
    setDestFilter,
    tofFilter,
    setTofFilter,
    togFilter,
    setTogFilter,
  };

  // filters array
  const filters = [ageFilter, dateFilter, destFilter, tofFilter, togFilter];

  // iterating the filters array in order to filter the matches according to the applied filter values
  for (const [idx, filter] of Object.entries(filters)) {
    if (filter.applied && matches) {
      switch (filter.name) {
        case "date":
          matches = matches.filter(
            (match) => moment(match.date).format("YYYY-MM-DD") === filter.value
          );
          break;
        case "destination":
          matches = matches.filter((match) =>
            filter.value === "Heim" ? !match.home : match.home
          );
          break;
        case "age":
          matches = matches.filter(
            (match) => match.creator.team[filter.name].value === filter.value
          );
          break;
        default:
          matches = matches.filter(
            (match) => match[filter.name] === filter.value
          );
          break;
      }
    }
  }

  // init match infos for opening the modals
  const [matchId, setMatchId] = useState();
  const [matchDate, setMatchDate] = useState();
  const [matchTime, setMatchTime] = useState();
  const [matchType, setMatchType] = useState();
  const [matchDestination, setMatchDestination] = useState();
  const [matchField, setMatchField] = useState();
  const [matchInfo, setMatchInfo] = useState();
  const [matchOpponent, setMatchOpponent] = useState();
  const [matchOpponentAge, setMatchOpponentAge] = useState();
  const [matchOpponentLeague, setMatchOpponentLeague] = useState();
  // TODO_KM: Wenn wir den Coach des Gegners auch setzen wollen,
  // müssen wir die Coach-Namen im Team speichern,
  // ansonsten DB-Aufrufe des Zorns
  // const [matchOpponentCoach, setMatchOpponentCoach] = useState("");

  // match info object which is passed on to the modals
  const matchData = {
    _id: matchId,
    date: matchDate,
    time: matchTime,
    typeOfGame: matchType,
    destination: matchDestination,
    typeOfField: matchField,
    info: matchInfo,
    matchOpponent: matchOpponent,
    matchOpponentAge: matchOpponentAge,
    matchOpponentLeague: matchOpponentLeague,
  };

  // init info modal state
  const [infoOpen, setInfoOpen] = useState(false);

  /**
   * Handles opening the match info modal and
   * sets the necessary match info which is passed on to the modal
   * @param {Event} e Event
   * @param {Object} match Object
   */
  const handleInfoOpen = (e, match) => {
    setInfoOpen(true);
    setMatchId(match._id);
    setMatchDate(match.date);
    setMatchTime(match.time);
    setMatchType(match.typeOfGame);
    setMatchField(match.typeOfField);
    setMatchDestination(match.destination);
    setMatchInfo(match.info);
    setMatchOpponent(match.creator.club.name);
    setMatchOpponentAge(match.creator.team.age.label);
    setMatchOpponentLeague(match.creator.team.league.label);
  };

  /**
   * Handles closing the match info modal
   */
  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  // init request modal state
  const [requestOpen, setRequestOpen] = useState(false);

  // handler function for opening the request modal and setting the match info
  /**
   * Handles opening the request match modal and
   * sets the necessary match info which is passed on to the modal
   * @param {Event} e Event
   * @param {Object} match Object
   */
  const handleRequestOpen = (e, match) => {
    setRequestOpen(true);
    setMatchId(match._id);
    setMatchDate(match.date);
    setMatchTime(match.time);
    setMatchType(match.typeOfGame);
    setMatchField(match.typeOfField);
    setMatchDestination(match.destination);
    setMatchInfo(match.info);
    setMatchOpponent(match.creator.club.name);
    setMatchOpponentAge(match.creator.team.age.label);
  };

  /**
   * Handles closing the request match modal
   */
  const handleRequestClose = () => {
    setRequestOpen(false);
  };

  /**
   * Handling the info update of the requested match
   * @param {String} name String
   * @param {any} value any
   */
  const handleUpdate = (name, value) => {
    switch (name) {
      case "date": {
        setMatchDate(value);
        break;
      }
      case "time": {
        setMatchTime(value);
        break;
      }
      case "modus": {
        setMatchType(value);
        break;
      }
      case "field": {
        setMatchField(value);
        break;
      }
      case "destination": {
        setMatchDestination(value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <Grid container gap={1}>
        <Grid
          item
          container
          lg={2.5}
          md={4}
          sm={12}
          className="container-bg"
          sx={{ justifyContent: "center", alignContent: "flex-start" }}
        >
          <TestspieleFilter filters={filters} filterProps={filterProps} />
        </Grid>
        <Grid
          item
          container
          lg={8.5}
          md={7}
          sm={12}
          className="container-bg"
          gap={2}
          sx={{ height: "max-content", padding: "1rem" }}
        >
          {matchesAvailable
            ? matches.map((match, index) => (
                <MatchCard
                  key={index}
                  index={index}
                  match={match}
                  onClick={(e) => handleInfoOpen(e, match)}
                  handleRequest={(e) => handleRequestOpen(e, match)}
                />
              ))
            : "Es sind derzeit keine Spiele verfügbar... "}
        </Grid>
      </Grid>
      <MatchInfoModal
        open={infoOpen}
        match={matchData}
        handleClose={handleInfoClose}
        hideRequestBtn={false}
      />
      <RequestMatchModal
        open={requestOpen}
        match={matchData}
        handleClose={handleRequestClose}
        handleUpdate={handleUpdate}
      />
    </>
  );
}
