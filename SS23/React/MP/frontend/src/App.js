import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import BlogPage from "./pages/Blog/BlogPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Start from "./pages/Start";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import Verification from "./pages/EmailValidation";
import RegisterSuccess from "./pages/RegisterSuccess";
import Features from "./pages/Features";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DashboardCoach from "./pages/DashboardCoach";
import DashboardManager from "./pages/DashboardManager";
import { Matchplaner } from "./pages/Matchplaner";
import Reiseplaner from "./pages/Reiseplaner";
import Eventplaner from "./pages/Eventplaner";
import Clubplaner from "./pages/Clubplaner";
import Trainingsplaner from "./pages/Trainingsplaner";
import Taktikplaner from "./pages/Taktikplaner";
import Saisonplaner from "./pages/Saisonplaner";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Help from "./pages/Help";
import Imprint from "./pages/Imprint";
import Jobs from "./pages/Jobs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Tutorials from "./pages/Tutorials";
import SuccessPaymentManager from "./pages/SuccessPaymentManager";
import SuccessPaymentCoach from "./pages/SuccessPaymentCoach";
import NoMatch from "./pages/NoMatch";
import NoInternetConnection from "./pages/NoInternetConnection";
import SpinnerLogo from "./components/SpinnerLogo";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { mainTheme } from "./Themes/mainTheme";
import { customTheme } from "./Themes/customTheme";
import isOnline from "is-online";
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import { login, logout, reset, resetUser } from "./features/auth/authSlice";
// import {
//   getAllExercises,
//   resetAllExercises,
// } from "./features/coach/coachSlice";
import { useContext } from "react";
import { useSelector } from "react-redux";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Dashboard } from "@mui/icons-material";
import {
  loginLoading,
  loginSuccess,
  loginError,
  logout,
  resetStatus,
  updateSuccess,
} from "./features/user/userActions";
import { checkToken, checkUser } from "./features/user/userAPI";
import { setAgreementCounter } from "./features/user/userActions";

import { store, persistor } from "./app/store";

import ReactGA from "react-ga4";

import history from "./utils/history";

import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import dayjs from "dayjs";
require("dayjs/locale/de");

const ProtectedRoute = ({ children, requiredRole, ...rest }) => {
  const { user, token } = useSelector((state) => state.user);
  const { clubName } = useSelector((state) => state.club);
  const { age } = useSelector((state) => state.team);

  let isAuthenticated = token ? true : false;

  if (
    !isAuthenticated &&
    !(
      rest.path === "/login" ||
      rest.path === "/register" ||
      rest.path === "/reset-password"
    )
  ) {
    // If the user is not authenticated, redirect to the login page
    // console.log("Nicht eingeloggt und nicht auf login/register");
    return <Navigate to="/login" />;
  }

  if (requiredRole && isAuthenticated) {
    // If the user is authenticated and a required role is specified, check the user's role
    // console.log("Eingeloggt und Rolle benötigt");
    const role = user.role;
    // console.log("Rolle = benötigte Rolle: ", role === requiredRole);
    if (role !== requiredRole) {
      // If the user's role does not match the required role, redirect to the homepage
      if (role) {
        let path = "/" + role;
        // console.log(path);
        return <Navigate to={path} />;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      // If coach has not init age/league or has no club, redirect to homepage (if user wants to navigate to feature per url)
      if (role === "coach") {
        if (
          !age &&
          (rest.path === "/coach/saisonplaner" ||
            rest.path === "/coach/trainingsplaner")
        ) {
          return <Navigate to="/coach" />;
        }
        if (
          !clubName &&
          (rest.path === "/coach/vereinsplaner" ||
            rest.path === "/coach/matchplaner")
        ) {
          return <Navigate to="/coach" />;
        }
      }
    }
  }

  if (
    isAuthenticated &&
    (rest.path === "/login" ||
      rest.path === "/register" ||
      rest.path === "/reset-password")
  ) {
    // If the user is logged in and trying to access the login or register page, redirect to the homepage
    // console.log("Angemeldet und auf login/register");
    const role = user.role;
    if (role) {
      let path = "/" + role;
      // console.log(path);
      return <Navigate to={path} />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

function App() {
  dayjs.locale("de");
  // const AuthContext = createContext(null);
  const dispatch = useDispatch();

  let intervalId;

  const handleLogout = () => {
    // remove JWT and user from local storage
    // localStorage.removeItem("jwt");
    // localStorage.removeItem("user");
    localStorage.clear(); // removes all items
    // dispatch action to store
    dispatch(logout());
    // remover persistor
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    // clear timer with logout
    if (intervalId) {
      clearInterval(intervalId);
    }

    return <Link to="/login" />;
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  function handleOnline() {
    setIsOnline(true);
  }
  function handleOffline() {
    setIsOnline(false);
  }
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  const { user, status, token } = useSelector((state) => state.user);

  // restore user and token, if they are not present in the redux store but still in the local storage (means no logout)

  useEffect(() => {
    // console.log(user);
    const storedToken = localStorage.getItem("jwt");
    // only restore user if there is a token (so a user)
    if (storedToken) {
      // init login-restored-user flow
      dispatch(loginLoading());
      if (user) {
        dispatch(loginSuccess(storedToken, user));
      }
      if (!user) {
        // get user from local storage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        // console.log("store user from local storage into redux store");
        dispatch(loginSuccess(storedToken, storedUser));
      }
      dispatch(resetStatus());
    }
  }, [user]);

  const checkJwtExpiration = async () => {
    if (token && isOnline) {
      try {
        // verify token
        await checkToken(token);
      } catch (error) {
        // logout if token is not valid
        handleLogout();
      }
    }
  };

  useEffect(() => {
    // check JWT expiration with initialization of token
    checkJwtExpiration();
    // check JWT expiration every day (24 h)
    intervalId = setInterval(checkJwtExpiration, 24 * 60 * 60 * 1000);
    // clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [token]);

  // if (status === "loading") {
  //   return <SpinnerLogo />;
  // }

  // if (!isOnline) {
  //   return <NoInternetConnection />;
  // }

  // check user for email validation and payment
  // TODO: user.createdAt einfach als startwert nehmen und von dem wert aus dann checkUser
  // const handleCheckUser = async () => {
  //   let check = await checkUser(user);
  //   if (check.error) {
  //     toast.error(check.message);
  //     toast.info("Du wirst ausgeloggt");
  //     setTimeout(() => {
  //       handleLogout();
  //     }, 5000);
  //   }
  // };
  // useEffect(() => {
  //   if (user && (!user.hasPaid || !user.emailVerified)) {
  //     handleCheckUser();
  //     // check every 30 min
  //     intervalId = setInterval(handleCheckUser, 1000 * 60 * 30);
  //   }
  // }, []);

  // setup socket
  const {
    readyState,
    getWebSocket,
    lastJsonMessage,
    lastMessage,
    sendJsonMessage,
    sendMessage,
  } = useWebSocket("ws://localhost:8080/", {
    // onOpen: () => console.log("opened socket web"),
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: (attemptNumbers) =>
      Math.min(Math.pow(2, attemptNumbers) * 1000, 30000),
  });
  useEffect(() => {
    if (readyState === 1 && user) {
      const initializeObject = {
        type: "initialize",
        data: {
          id: user._id,
          email: user.email,
        },
      };
      sendJsonMessage(initializeObject);
    }
  }, [readyState, user]);

  useEffect(() => {
    if (lastJsonMessage) {
      const result = lastJsonMessage;
      // console.log(result);
      const { type, message, data } = result;

      //  User
      if (type === "messages") {
        dispatch(updateSuccess(data));
      }

      // Match
      if (type === "newMatch") {
        //  dispatch(setNewMatchAvailable(true));
        console.log("New Match: ", message);
      }

      if (type === "matchDeleted") {
        console.log("Match deleted: ", data);
        //  const deletedId = data._id;
        // Check if the currently Open is the one that was deleted
        //  if (currentlyOpenMatch?.id === deletedId) {
        //    dispatch(setOpenMatchForceClose(true));
        //    dispatch(getMatches({ token: user.jwt, email: user.user?.email }));
        //    console.log("Match deleted while open");
        //    setTimeout(() => {
        //      dispatch(setOpenMatchForceClose(false));
        //    }, 1000);
        //  }
      }

      // Application
      if (type === "newApplication") {
        console.log("new application");
        //  const { match, application } = data;
        //  const applicationAlreadyExists = newApplications.find(
        //    (app) => app._id === application.id
        //  );
        //  console.log(match._id);
        //  console.log(application.id);
        //  if (!applicationAlreadyExists) {
        //    dispatch(addNewApplication({ match, application }));
        //  }
      }

      if (type === "heartbeat") {
        sendJsonMessage({ type: "pong" });
      }
    }
  }, [lastJsonMessage]);

  return (
    // <AuthContext.Provider value={{ user, token }}>
    // <Context.Provider>
    <Router>
      {/* <ThemeProvider theme={mainTheme}> */}
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Header handleLogout={handleLogout} />
        <main
        // className="container-fluid"
        // style={{
        //   minHeight: "calc(100vh - 65px)", //full height - header
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        // }}
        >
          {/* <main> */}
          <Routes>
            {/* All Route-Elements that can be visited by everyone */}
            <Route index element={<Start />} />
            <Route path="/" element={<Start />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/help" element={<Help />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandcondition" element={<TermsAndConditions />} />
            <Route path="/features" element={<Features />} />
            <Route path="/tutorials" element={<Tutorials />} />
            {/* <Route path="/verify-email/:token" element={<Verification />} /> */}
            <Route path="/verify-email/*" element={<Verification />} />
            <Route path="/register/success" element={<RegisterSuccess />} />
            <Route exact path="/about" element={<About />} />
            <Route path="/blog/:id" element={<BlogPage />}/>

            {/* All Route-Elements that cannot be visited by logged in users */}
            <Route
              exact
              path="/login"
              element={
                <ProtectedRoute path="/login">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute path="/register">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute path="/reset-password">
                  <ResetPassword />
                </ProtectedRoute>
              }
            />

            {/* All Route-Elements that can only be visited by logged in users */}
            <Route
              exact
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* All Route-Elements that can be visited by logged in users and with role 'coach' */}
            <Route
              exact
              path="/coach"
              element={
                <ProtectedRoute requiredRole="coach" path="/coach">
                  <DashboardCoach />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/coach/success"
              element={
                <ProtectedRoute requiredRole="coach">
                  <SuccessPaymentCoach />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/coach/matchplaner"
              element={
                // token && user.role === "coach" ? (
                //   <Matchplaner />
                // ) : (
                //   <Navigate to="/" />
                // )
                <ProtectedRoute
                  user={user}
                  token={token}
                  // user={user}
                  // component={Matchplaner}
                  // isAuthenticated={isAuthenticated}
                  requiredRole="coach"
                  path="/coach/matchplaner"
                >
                  <Matchplaner />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/coach/trainingsplaner"
              element={
                <ProtectedRoute
                  requiredRole="coach"
                  path="/coach/trainingsplaner"
                >
                  <Trainingsplaner />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/coach/vereinsplaner"
              element={
                <ProtectedRoute
                  requiredRole="coach"
                  path="/coach/vereinsplaner"
                >
                  <Clubplaner />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/coach/eventplaner"
              element={
                <ProtectedRoute requiredRole="coach" path="/coach/eventplaner">
                  <Eventplaner />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/coach/reiseplaner"
              element={
                <ProtectedRoute requiredRole="coach" path="/coach/reiseplaner">
                  <Reiseplaner />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/coach/saisonplaner"
              element={
                <ProtectedRoute requiredRole="coach" path="/coach/saisonplaner">
                  <Saisonplaner />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/coach/taktikplaner"
              element={
                <ProtectedRoute requiredRole="coach" path="/coach/taktikplaner">
                  <Taktikplaner />
                </ProtectedRoute>
              }
            />

            {/* All Route-Elements that can be visited by logged in users and with role 'manager' */}
            <Route
              exact
              path="/manager"
              element={
                <ProtectedRoute requiredRole="manager">
                  <DashboardManager />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/manager/success"
              element={
                <ProtectedRoute requiredRole="manager">
                  <SuccessPaymentManager />
                </ProtectedRoute>
              }
            />

            {/* Route-Element if path does not match to any of those above */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </ThemeProvider>
    </Router>
    // </Context.Provider>
    // </AuthContext.Provider>
  );
}

export default App;
