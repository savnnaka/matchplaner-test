import {
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Menu,
  Notifications,
  Close as CloseIcon,
  NavigateBefore,
  Logout,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  SvgIcon,
  IconButton,
  Grid,
  Collapse,
  Tooltip,
  Popover,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  Link as MuiLink,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "../images/mp-logo.png";
import LogoutButton from "./LogoutButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { updateUser } from "../features/user/userAPI";
import {
  updateLoading,
  updateSuccess,
  updateError,
} from "../features/user/userActions";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { useLocation } from "react-router-dom";

function Header({ handleLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState("MatchPlaner");

  useEffect(() => {
    const path = location.pathname;
    if (user && path === "/" + user.role) {
      setTitle("Dashboard");
    } else if (path.includes("matchplaner")) {
      setTitle("Matchplaner");
    } else if (path.includes("trainingsplaner")) {
      setTitle("Trainingsplaner");
    } else if (path.includes("saisonplaner")) {
      setTitle("Saisonplaner");
    } else if (path.includes("vereinsplaner")) {
      setTitle("Vereinsplaner");
    } else if (path.includes("profile")) {
      setTitle("Profil");
    } else if (path.includes("register")) {
      setTitle("Registrierung");
    } else if (path.includes("login")) {
      setTitle("Login");
    } else {
      setTitle("MatchPlaner");
    }
  }, [location]);

  const { user, token } = useSelector((state) => state.user);
  const { news } = useSelector((state) => state.team);

  // expand navigation/app bar (only if screen is smaller than md)
  const [expand, setExpand] = useState(false);

  // show notifications
  const [showNotifications, setShowNotifications] = useState(false);

  // calc the type of header based on breakpoint
  const showFullSizeHeader = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  // set a notification on read when clicked
  const readNotification = async (index) => {
    // if manager -> messages under manager, else -> messages under team
    if (user.role === "manager") {
      try {
        const res = await updateUser(
          { _id: user._id, readMessage: index },
          token
        );
        dispatch(updateSuccess(res));
      } catch (error) {
        dispatch(updateError(error));
        console.log(error);
      }
    } else {
      console.log("Update team-messages");
      // try {
      //   const res = await updateTeam({ _id: user._id, readMessage: index }, token);
      //   dispatch(updateSuccess(res));
      // } catch (error) {
      //   dispatch(updateError(error));
      //   console.log(error);
      // }
    }
  };

  // hide expand navbar when media query changes
  useEffect(() => {
    setExpand(false);
  }, [showFullSizeHeader]);

  const FullSizeHeader = () => (
    <Grid
      container
      width="100%"
      alignItems="center"
      marginY="auto"
      paddingX={3}
    >
      {/* left */}
      <Grid item xs container justifyContent="flex-start">
        {/* home button */}
        <Grid item>
          <Link to={user ? "/" + user.role : "#"}>
            <Tooltip title="Dashboard">
              <SvgIcon
                className="pointer"
                sx={{ visibility: !user && "hidden" }}
              >
                <HomeIcon />
              </SvgIcon>
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      {/* center */}
      <Grid item xs="auto">
        {/* title */}
        <Box
          sx={{
            margin: "auto",
            backgroundColor: "var(--lightgreen)",
            borderRadius: "5px",
            padding: 1,
          }}
        >
          <Typography color="primary.contrastText" textAlign="center">
            {title}
          </Typography>
        </Box>
      </Grid>
      {/* right */}
      <Grid item xs container justifyContent="flex-end">
        {/* Button/Links */}
        {user ? (
          <>
            {/* news */}
            <Grid item>
              <Badge
                badgeContent={
                  user.role === "manager"
                    ? user.manager.news.filter((obj) => obj.unread === true)
                        .length
                    : news && news.filter((obj) => obj.unread === true).length
                }
                color="primary"
              >
                <Tooltip title="Neuigkeiten">
                  <SvgIcon
                    className="pointer ms-5"
                    sx={{
                      visibility: !user && "hidden",
                      ":hover": {
                        color: "var(--lightgreen)",
                      },
                    }}
                    onClick={() => setShowNotifications(true)}
                  >
                    <Notifications />
                  </SvgIcon>
                </Tooltip>
              </Badge>
            </Grid>
            {/* Profil */}
            <Grid item>
              <Link to="/profile" className="ms-5">
                <Tooltip title="Profil">
                  <SvgIcon>
                    <AccountCircleIcon />
                  </SvgIcon>
                </Tooltip>
              </Link>
            </Grid>
            {/* Einstellungen */}
            {/* <Grid item>
              <Tooltip title="Einstellungen">
                <Link to="/settings" className="ms-5">
                  <SettingsIcon />
                </Link>
              </Tooltip>
            </Grid> */}
            {/* Logout */}
            <Grid item>
              <Tooltip title="Logout">
                <SvgIcon
                  className="pointer ms-5"
                  sx={{
                    visibility: !user && "hidden",
                    ":hover": {
                      color: "var(--lightgreen)",
                    },
                  }}
                  onClick={() => handleLogout()}
                >
                  <Logout />
                </SvgIcon>
              </Tooltip>
            </Grid>
          </>
        ) : (
          <>
            {/* Start - top */}
            <Grid item className="ms-3">
              <HashLink smooth to="/#top">
                <Typography sx={{ textTransform: "uppercase" }}>
                  Start
                </Typography>
              </HashLink>
            </Grid>
            {/* Start - features */}
            <Grid item className="ms-3">
              <HashLink smooth to="/#features-overview">
                <Typography sx={{ textTransform: "uppercase" }}>
                  Features
                </Typography>
              </HashLink>
            </Grid>
            {/* Start - pricing */}
            <Grid item className="ms-3">
              <HashLink smooth to="/#pricing">
                <Typography sx={{ textTransform: "uppercase" }}>
                  Preise
                </Typography>
              </HashLink>
            </Grid>
            {/* Login */}
            <Grid item className="ms-3">
              <Link to="/login">
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    paddingX: "5px",
                  }}
                >
                  Login
                </Typography>
              </Link>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );

  const SmallSizeHeader = () => (
    <Grid
      container
      width="100%"
      alignItems="center"
      marginY="auto"
      paddingX={1}
    >
      {/* left */}
      <Grid item xs container justifyContent="flex-start">
        {/* home button */}
        <Grid item>
          <Link to={user ? "/" + user.role : "#"}>
            <Tooltip title="Dashboard">
              <SvgIcon
                className="pointer"
                sx={{ visibility: !user && "hidden" }}
              >
                <HomeIcon />
              </SvgIcon>
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      {/* center */}
      <Grid item xs="auto">
        <Box
          sx={{
            margin: "auto",
            backgroundColor: "var(--lightgreen)",
            borderRadius: "5px",
            paddingX: 2,
            paddingY: 1,
          }}
        >
          <Typography color="primary.contrastText">{title}</Typography>
        </Box>
      </Grid>
      {/* right */}
      <Grid item xs container justifyContent="flex-end">
        {/* notifications */}
        {user && (
          <Grid item>
            {/* <Tooltip title="Neuigkeiten"> */}
            <Badge
              badgeContent={
                user.role === "manager"
                  ? user.manager.news.filter((obj) => obj.unread === true)
                      .length
                  : news && news.filter((obj) => obj.unread === true).length
              }
              color="primary"
            >
              <Tooltip title="Neuigkeiten">
                <SvgIcon
                  className="pointer"
                  sx={{
                    visibility: !user && "hidden",
                    ":hover": {
                      color: "var(--lightgreen)",
                    },
                  }}
                  onClick={() => setShowNotifications(true)}
                >
                  <Notifications />
                </SvgIcon>
              </Tooltip>
            </Badge>
            {/* </Tooltip> */}
          </Grid>
        )}
        {/* menu */}
        <Grid item>
          <SvgIcon
            className="pointer"
            onClick={() => {
              setExpand(!expand);
            }}
            sx={{
              ml: 2,
              ":hover": {
                color: "var(--lightgreen)",
              },
            }}
          >
            <Menu />
          </SvgIcon>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        minHeight: "50px", // min height, so Collapse can take more height if expanded
        paddingY: 1,
      }}
      className="header"
      id="header"
    >
      {showFullSizeHeader ? <FullSizeHeader /> : <SmallSizeHeader />}

      {/* collapse menu */}
      <Collapse in={expand} timeout="auto" unmountOnExit orientation="vertical">
        {user ? (
          <>
            {/* Profil */}
            <Link
              to={"/profile"}
              className="mx-4"
              onClick={() => {
                setExpand(false);
              }}
            >
              <Typography>Profil</Typography>
            </Link>
            {/* Logout */}
            <Link
              to="/"
              className="mx-4"
              onClick={() => {
                setExpand(!expand);
                handleLogout();
              }}
            >
              <Typography>Logout</Typography>
            </Link>
          </>
        ) : (
          <>
            {/* Start */}
            <Link
              to="/"
              className="mx-4"
              onClick={() => {
                setExpand(false);
              }}
            >
              <Typography>Start</Typography>
            </Link>
            {/* Registrierung */}
            <Link
              to="/register"
              className="mx-4"
              onClick={() => {
                setExpand(false);
              }}
            >
              <Typography>Registration</Typography>
            </Link>
            {/* Login */}
            <Link
              to="/login"
              className="mx-4"
              onClick={() => {
                setExpand(false);
              }}
            >
              <Typography>Login</Typography>
            </Link>
          </>
        )}
      </Collapse>

      {/* notifications (only if user is logged in) */}
      {user && (
        <Dialog
          open={showNotifications}
          onClose={() => setShowNotifications(false)}
        >
          <DialogTitle>
            News
            <IconButton
              aria-label="close"
              onClick={() => setShowNotifications(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              {user.role === "manager" ? (
                user.manager.news.length > 0 ? (
                  user.messages.map((obj, index) => (
                    <Grid item xs={12} key={index} container>
                      <Grid item xs={1}>
                        {obj.unread && <Badge color="primary" variant="dot" />}
                      </Grid>
                      <Grid item xs="auto">
                        <Link
                          to={obj.link}
                          onClick={() => {
                            obj.unread && readNotification(index);
                            obj.link !== "#" && setShowNotifications(false);
                          }}
                        >
                          <Typography>{obj.message}</Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <Grid item>
                    <Typography>
                      Hier siehst Du alle Deine Neuigkeiten.
                    </Typography>
                  </Grid>
                )
              ) : news && news.length > 0 ? (
                user.messages.map((obj, index) => (
                  <Grid item xs={12} key={index} container>
                    <Grid item xs={1}>
                      {obj.unread && <Badge color="primary" variant="dot" />}
                    </Grid>
                    <Grid item xs="auto">
                      <Link
                        to={obj.link}
                        onClick={() => {
                          obj.unread && readNotification(index);
                          obj.link !== "#" && setShowNotifications(false);
                        }}
                      >
                        <Typography>{obj.message}</Typography>
                      </Link>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid item>
                  <Typography>
                    Hier siehst Du alle Deine Neuigkeiten.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </AppBar>
  );
}

export default Header;
