import { Grid } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markFavorite, unmarkFavorite } from "../../features/team/teamAPI";
import {
  markFavoriteError,
  unmarkFavoriteError,
} from "../../features/team/teamActions";
import { months } from "../../utils/constants/months";
import { ReactComponent as InfoIcon } from "../../resources/icons/info-icon.svg";
import { ReactComponent as RequestIcon } from "../../resources/icons/agree-icon.svg";

export function MatchCard(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { teamId, favoriteMatches } = useSelector((state) => state.team);
  const match = props.match;
  const matchMonth = months[
    match.date.split("T")[0].split("-")[1].slice(1) - 1
  ].slice(0, 3);

  // if (props.matchesRequesting || props.matchesCreated) {
  //   const requestIcon = document.getElementById("requestIcon");
  //   requestIcon.classList.add("hidden");
  // }

  const [isFavorite, setIsFavorite] = useState(
    favoriteMatches.includes(match._id)
  );
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSetFavorite = async (e, match, isFavorite) => {
    // if match was made favorite it gets pushed to the Array
    const data = {
      matchId: match._id,
      teamId: teamId,
    };
    if (isFavorite) {
      try {
        const response = await markFavorite(data, token);
      } catch (err) {
        const errorMsg =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        dispatch(markFavoriteError(errorMsg));
      }
    } else {
      try {
        const response = await unmarkFavorite(data, token);
      } catch (err) {
        const errorMsg =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        dispatch(unmarkFavoriteError(errorMsg));
      }
    }
  };

  return (
    <>
      <Grid item container className="match-card" lg={5.8} md={12} sm={12}>
        <Grid
          container
          item
          direction="column"
          justifyContent="center"
          md={2}
          sm={2}
          xs={3}
          className="match-date"
        >
          <Grid item className="match-month bold">
            {matchMonth}
          </Grid>
          <Grid item className="match-day bold">
            {match.date.split("T")[0].split("-")[2]}
          </Grid>
          <Grid item className="match-time bold">
            {match.time}
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
          md={6.5}
          sm={7}
          xs={6}
        >
          <Grid item className="match-opponent bold">
            {/* Eigene Anfrage -> */}
            <p>
              {match.creator.team.id === teamId && match.status === "pending"
                ? "Meine Anfrage"
                : match.status === "matched" && match.creator.team.id === teamId
                ? match.opponent.club.name
                : match.creator.club.name}
            </p>
          </Grid>
          <Grid item className="match-info-sec">
            <p>
              {match.creator.team.id === teamId && match.status === "pending"
                ? match.creator.team.age.label
                : match.status === "matched" && match.creator.team.id === teamId
                ? match.opponent.team.age.label
                : match.creator.team.age.label}
            </p>
            <p>
              {" "}
              {match.creator.team.id === teamId && match.status === "pending"
                ? match.creator.team.league.label
                : match.status === "matched" && match.creator.team.id === teamId
                ? match.opponent.team.league.label
                : match.creator.team.league.label}
            </p>
            <p>
              Spielort:{" "}
              {match.home && match.creator.team.id === teamId
                ? "Heim"
                : "Auswärts"}
            </p>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justifyContent="space-between"
          alignItems="flex-end"
          md={3.5}
          sm={3}
          xs={3}
        >
          <Grid item>
            <svg
              alt="info icon"
              width="54px"
              height="50px"
              xmlns="http://www.w3.org/2000/svg"
              onClick={props.onClick}
              style={{ cursor: "pointer", borderRadius: "8px" }}
            >
              <InfoIcon />
            </svg>
          </Grid>
          <Grid item container justifyContent="flex-end" alignItems="center">
            <Grid
              item
              sx={{
                backgroundColor: "#161616",
                borderRadius: "10px",
              }}
            >
              <svg
                width="54px"
                height="50px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isFavorite ? "star-icon is-favorite" : "star-icon"
                }`}
                onClick={(e) => {
                  toggleFavorite();
                  handleSetFavorite(e, match, !isFavorite);
                }}
              >
                <path
                  d="M14.065 1.6174L16.8014 10.0356L16.9137 10.3811H17.2769H26.1316L18.9682 15.5833L18.6741 15.7969L18.7865 16.1425L21.5228 24.5602L14.3588 19.3575L14.065 19.1442L13.7712 19.3575L6.60717 24.5602L9.34346 16.1425L9.4558 15.7969L9.16176 15.5833L1.99836 10.3811H10.853H11.2163L11.3285 10.0356L14.065 1.6174Z"
                  stroke="#D2FF00"
                />
              </svg>
            </Grid>
            <Grid item>
              <svg
                id="requestIcon"
                width="54px"
                height="50px"
                xmlns="http://www.w3.org/2000/svg"
                onClick={props.handleRequest}
                style={{ cursor: "pointer", borderRadius: "8px" }}
              >
                <RequestIcon />
              </svg>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
