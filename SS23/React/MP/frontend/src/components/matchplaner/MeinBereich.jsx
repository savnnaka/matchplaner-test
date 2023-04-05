import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MeinBereichFilter } from "./MeinBereichFilter";
import { MatchCard } from "./MatchCard";
import { RequestMatchModal } from "../modals/RequestMatchModal";
import { MatchInfoModal } from "../modals/MatchInfoModal";
export function MeinBereich() {
  const { matchesCreated, matchesApplied, matchesFixed, matchesFavorite } =
    useSelector((state) => state.matchplaner);

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

  // Deklaration der Filter states
  const [allGames, setAllGames] = useState(true);
  const [fixedGames, setFixedGames] = useState(false);
  const [gamesInNegotiation, setGamesInNegotiation] = useState(false);
  const [favoriteGames, setFavoriteGames] = useState(false);
  const [ownGames, setOwnGames] = useState(false);
  const [pastGames, setPastGames] = useState(false);

  // Objekt mit den relevanten Eigenschaften der Filter für onpassing als Prop
  const filterProps = [
    { state: allGames, setter: setAllGames, text: "Alle" },
    { state: fixedGames, setter: setFixedGames, text: "Vereinbarte Spiele" },
    {
      state: gamesInNegotiation,
      setter: setGamesInNegotiation,
      text: "In Verhandlung",
    },
    { state: favoriteGames, setter: setFavoriteGames, text: "Auf Merkliste" },
    { state: ownGames, setter: setOwnGames, text: "Eigene Anfragen" },
    { state: pastGames, setter: setPastGames, text: "Vergangene Spiele" },
  ];

  // Reset Funktion für alle Filter
  const resetFilter = () => {
    for (var f in filterProps) {
      filterProps[f].setter(false);
    }
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
          <MeinBereichFilter filter={filterProps} reset={resetFilter} />
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
          {fixedGames &&
            matchesFixed.map((match, idx) => (
              <MatchCard key={idx} idx={idx} match={match} />
            ))}
          {ownGames &&
            matchesCreated.map((match, idx) => (
              <MatchCard key={idx} idx={idx} match={match} />
            ))}
          {favoriteGames &&
            matchesFavorite.length > 0 &&
            matchesFavorite.map((match, idx) => (
              <MatchCard
                key={idx}
                idx={idx}
                match={match}
                handleRequest={(e) => handleRequestOpen(e, match)}
                onClick={(e) => handleInfoOpen(e, match)}
              />
            ))}
          {gamesInNegotiation &&
            matchesApplied.map((match, idx) => (
              <MatchCard key={idx} idx={idx} match={match} />
            ))}
          {/* {((gamesCreated && !matchesCreated) ||
            (gamesRequesting && !matchesApplied) ||
            (gamesFixed && !matchesFixed)) &&
            "Es sind derzeit keine Spiele verfügbar..."} */}
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
