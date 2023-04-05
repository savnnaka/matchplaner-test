import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { register, checkRegistrationCode } from "../features/user/userAPI";
import {
  registerLoading,
  registerSuccess,
  registerError,
  registerCodeValidationLoading,
  registerCodeValidationSuccess,
  registerCodeValidationError,
} from "../features/user/userActions";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function RegistrationCoach({ pwProps }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // input fields coach
  const [emailCoach, setEmailCoach] = useState("");
  const [passwordCoach, setPasswordCoach] = useState("");
  const [showPasswordCoach, setShowPasswordCoach] = useState(false);
  const [password2Coach, setPassword2Coach] = useState("");
  const [showPassword2Coach, setShowPassword2Coach] = useState(false);
  const [nameCoach, setNameCoach] = useState("");
  const [surnameCoach, setSurnameCoach] = useState("");
  const [code, setCode] = useState("");
  const [fixAssociation, setFixAssociation] = useState("");
  const [age, setAge] = useState({ label: "", value: "" });
  const [league, setLeague] = useState({ label: "", value: "" });
  const onEmailCoachChanged = (e) => setEmailCoach(e.target.value);
  const onPasswordCoachChanged = (e) => setPasswordCoach(e.target.value);
  const onPassword2CoachChanged = (e) => setPassword2Coach(e.target.value);
  const onNameCoachChanged = (e) => setNameCoach(e.target.value);
  const onSurnameCoachChanged = (e) => setSurnameCoach(e.target.value);
  const onCodeChanged = (e) => setCode(e.target.value);
  const onAgeChanged = (e) => {
    // reset league
    setLeague({
      label: "",
      value: "",
    });
    // set age
    setAge({
      label: allAges && allAges.find((el) => el.value === e.target.value).name,
      value: e.target.value,
    });
  };
  const onLeagueChanged = (e) => {
    setLeague({
      label:
        possibleLeagues &&
        possibleLeagues.find((el) => el.value === e.target.value).name,
      value: e.target.value,
    });
  };
  const [emailCoachError, setEmailCoachError] = useState(false);
  const [passwordCoachError, setPasswordCoachError] = useState(false);
  const [pwValidationLength, setPwValidationLength] = useState(false);
  const [pwValidationNumber, setPwValidationNumber] = useState(false);
  const [pwValidationCapital, setPwValidationCapital] = useState(false);
  const [pwValidationSpecialChars, setPwValidationSpecialChars] =
    useState(false);
  const [password2CoachError, setPassword2CoachError] = useState(false);
  const [nameCoachError, setNameCoachError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [leagueError, setLeagueError] = useState(false);

  const [stepCoach, setStepCoach] = useState(0);

  // all possible ages
  const allAges = [
    { name: "Senioren", value: "senioren" },
    { name: "Seniorinnen", value: "seniorinnen" },
    { name: "Herren", value: "herren" },
    { name: "Frauen", value: "frauen" },
    { name: "A-Junioren (U19)", value: "U19m" },
    { name: "A-Juniorinnen (U19)", value: "U19f" },
    { name: "A-Junioren (U18)", value: "U18m" },
    { name: "A-Juniorinnen (U18)", value: "U18f" },
    { name: "B-Junioren (U17)", value: "U17m" },
    { name: "B-Juniorinnen (U17)", value: "U17f" },
    { name: "B-Junioren (U16)", value: "U16m" },
    { name: "B-Juniorinnen (U16)", value: "U16f" },
    { name: "C-Junioren (U15)", value: "U15m" },
    { name: "C-Juniorinnen (U15)", value: "U15f" },
    { name: "C-Junioren (U14)", value: "U14m" },
    { name: "C-Juniorinnen (U14)", value: "U14f" },
    { name: "D-Junioren (U13)", value: "U13m" },
    { name: "D-Juniorinnen (U13)", value: "U13f" },
    { name: "D-Junioren (U12)", value: "U12m" },
    { name: "D-Juniorinnen (U12)", value: "U12f" },
    { name: "E-Junioren (U11)", value: "U11m" },
    { name: "E-Juniorinnen (U11)", value: "U11f" },
    { name: "E-Junioren (U10)", value: "U10m" },
    { name: "E-Juniorinnen (U10)", value: "U10f" },
    { name: "F-Junioren (U9)", value: "U9m" },
    { name: "F-Juniorinnen (U9)", value: "U9f" },
    { name: "F-Junioren (U8)", value: "U8m" },
    { name: "F-Juniorinnen (U8)", value: "U8f" },
    { name: "Bambini (U7)", value: "U7" },
    { name: "Mini-Bambini (U6)", value: "U6" },
  ];

  // filter given array for string in array of names and return values (array of name and value)
  // and also add the top leagues
  const filterLeagueArray = (givenAge, givenArray, topLeagues) => {
    let filteredLeagueArray;

    // find the age-string in the given leagues-array and return the array of objects with league-name and league-value
    let objectLeagues = givenArray.find((element) =>
      element.name.includes(givenAge)
    ); // is an array with one element (object with names of ages and values of leagues)
    let objectTopLeagues = topLeagues.find((element) =>
      element.name.includes(givenAge)
    ); // is an array with one element (object with names of ages and values of leagues)

    let arrayLeague = objectLeagues ? objectLeagues.value : [];
    let arrayTopLeague = objectTopLeagues ? objectTopLeagues.value : null;

    if (arrayTopLeague) {
      filteredLeagueArray = arrayTopLeague.concat(arrayLeague);
    } else {
      filteredLeagueArray = arrayLeague;
    }

    if (filteredLeagueArray.length === 0) {
      filteredLeagueArray = [{ name: "Keine Ligen vorhanden", value: "" }];
    }

    return filteredLeagueArray;
  };

  // calculate possible leagues
  const [possibleLeagues, setPossibleLeagues] = useState([]);
  useEffect(() => {
    getLeagueOptions();
  }, [age]);

  // DEUTSCHLAND
  // Baden
  const allLeaguesGermanyBA = [
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga Südwest", value: 4 },
        { name: "Oberliga Baden-Württemberg", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
        { name: "Kreisklasse C", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m", "U15m", "U14m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
        { name: "Kreisklasse C", value: 11 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Kreisliga", value: 7 },
      ],
    },
    {
      name: ["U19f", "U18f", "U17f", "U16f", "U15f", "U14f", "U13f", "U12f"],
      value: [{ name: "Landesliga", value: 6 }],
    },
  ];
  // Bayern
  const allLeaguesGermanyBY = [
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga Bayern", value: 4 },
        { name: "Bayernliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse", value: 9 },
        { name: "A Klasse", value: 10 },
        { name: "B Klasse", value: 11 },
        { name: "C Klasse", value: 12 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m"],
      value: [
        { name: "Bayernliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksoberliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse", value: 9 },
        { name: "Gruppe", value: 10 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Bayernliga", value: 5 },
        { name: "Bezirksoberliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse", value: 9 },
        { name: "Gruppe", value: 10 },
        { name: "Förderliga", value: 11 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Bezirksoberliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse", value: 9 },
        { name: "Gruppe", value: 10 },
        { name: "Förderliga", value: 11 },
      ],
    },
    {
      name: ["U11m", "U11f", "U10m", "U10f", "U9m", "U8m", "U7", "U6"],
      value: [{ name: "Gruppe", value: 10 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Bayernliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksoberliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "Kreisliga", value: 9 },
        { name: "Kreisklasse", value: 10 },
        { name: "A Klasse", value: 11 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Bayernliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksoberliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "Gruppe", value: 10 },
      ],
    },
    {
      name: ["U15f", "U14f"],
      value: [
        { name: "Bezirksoberliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "Gruppe", value: 10 },
      ],
    },
    {
      name: ["U13f", "U12f"],
      value: [
        { name: "Bezirksliga", value: 8 },
        { name: "Kreisliga", value: 9 },
        { name: "Gruppe", value: 10 },
      ],
    },
    {
      name: ["U11f", "U10f"],
      value: [{ name: "Gruppe", value: 10 }],
    },
  ];
  // Berlin
  const allLeaguesGermanyBE = [
    {
      name: ["senioren"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 9 },
        { name: "Kreisliga A", value: 11 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Berlin-Liga/Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 9 },
        { name: "Kreisliga A", value: 11 },
        { name: "Kreisliga B", value: 12 },
        { name: "Kreisliga C", value: 13 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 9 },
      ],
    },
    {
      name: ["U17m", "U16m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 9 },
        { name: "Kreisliga A", value: 11 },
        { name: "Kreisklasse A", value: 12 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Landesklasse", value: 8 },
        { name: "Bezirksliga", value: 9 },
        { name: "Bezirksklasse", value: 10 },
        { name: "Kreisliga A", value: 11 },
        { name: "Kreisklasse A", value: 12 },
        { name: "Kreisklasse B", value: 13 },
        { name: "Kreisklasse C", value: 14 },
        { name: "Kreisklasse D", value: 15 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Landesklasse", value: 8 },
        { name: "Bezirksliga", value: 9 },
        { name: "Bezirksklasse", value: 10 },
        { name: "Kreisklasse A", value: 12 },
        { name: "Kreisklasse B", value: 13 },
        { name: "Kreisklasse C", value: 14 },
        { name: "Kreisklasse D", value: 15 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Landesklasse", value: 8 },
        { name: "Bezirksklasse", value: 10 },
        { name: "Kreisliga A", value: 11 },
        { name: "Kreisklasse B", value: 13 },
        { name: "Kreisklasse C", value: 14 },
      ],
    },
    {
      name: ["U9m", "U8m"],
      value: [
        { name: "Landesklasse", value: 8 },
        { name: "Bezirksklasse", value: 10 },
        { name: "Kreisklasse B", value: 13 },
      ],
    },
    {
      name: ["frauen", "U13f", "U12f"],
      value: [
        { name: "Verbandsliga", value: "" },
        { name: "Landesliga", value: "" },
        { name: "Bezirksliga", value: "" },
      ],
    },
    {
      name: ["U17f", "U16f", "U15f", "U14f"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksklasse", value: 7 },
      ],
    },
    {
      name: ["U11f", "U10f"],
      value: [{ name: "Landesklasse", value: 6 }],
    },
  ];
  // Brandenburg
  const allLeaguesGermanyBB = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Landesklasse", value: 8 },
        { name: "Kreisoberliga", value: 9 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
        { name: "2.Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesklasse", value: 8 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U17m", "U16m"],
      value: [
        { name: "Landesliga", value: 7 },
        { name: "Landesklasse", value: 8 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Landesliga", value: 7 },
        { name: "Landesklasse", value: 8 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
        { name: "2.Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U13m", "U12m", "U11m", "U10m"],
      value: [
        { name: "Landesliga", value: 7 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
        { name: "2.Kreisklasse", value: 12 },
        { name: "3.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U9m", "U8m"],
      value: [
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
        { name: "2.Kreisklasse", value: 12 },
        { name: "3.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Landesliga", value: 5 },
        { name: "Kreisliga", value: 6 },
      ],
    },
    {
      name: ["U17f", "U16f", "U15f", "U14f", "U13f", "U12f"],
      value: [{ name: "Landesliga", value: 5 }],
    },
  ];
  // Bremen
  const allLeaguesGermanyHB = [
    {
      name: ["senioren"],
      value: [
        { name: "1.Kreisklasse", value: 12 },
        { name: "2.Kreisklasse", value: 13 },
        { name: "3.Kreisklasse", value: 14 },
        { name: "4.Kreisklasse", value: 15 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 8 },
        { name: "1.Kreisliga (A)/Stadtliga", value: 9 },
        { name: "2.Kreisliga (B)", value: 10 },
        { name: "3.Kreisliga (C)", value: 11 },
        { name: "1.Kreisklasse", value: 12 },
        { name: "2.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "1.Landesklasse", value: 7 },
      ],
    },
    {
      name: ["U17m", "U16m"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Bezirksliga", value: 8 },
        { name: "1.Bezirksklasse", value: 9 },
        { name: "2.Bezirksklasse", value: 10 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Bezirksliga", value: 8 },
        { name: "1.Bezirksklasse", value: 9 },
        { name: "2.Bezirksklasse", value: 10 },
        { name: "1.Kreisliga (A)/Stadtliga", value: 11 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Bezirksliga", value: 8 },
        { name: "1.Kreisliga (A)/Stadtliga", value: 11 },
        { name: "1.Kreisklasse", value: 12 },
        { name: "2.Kreisklasse", value: 13 },
        { name: "3.Kreisklasse", value: 14 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "1.Kreisklasse", value: 12 },
        { name: "2.Kreisklasse", value: 13 },
        { name: "3.Kreisklasse", value: 14 },
        { name: "4.Kreisklasse", value: 15 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
      ],
    },
    {
      name: ["U17f", "U16f", "U15f", "U14f", "U13f", "U12f", "U11f", "U10f"],
      value: [{ name: "Landesliga", value: 6 }],
    },
  ];
  // Hamburg
  const allLeaguesGermanyHH = [
    {
      name: ["senioren", "U19m", "U18m", "U17m", "U16m", "U15m", "U14m"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisklasse", value: 9 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga Hamburg/Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse", value: 9 },
        { name: "Kreisklasse B", value: 10 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisklasse", value: 9 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Sonderklasse", value: 9 },
      ],
    },
    {
      name: ["U17f", "U16f", "U15f", "U14f"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Kreisklasse", value: 8 },
      ],
    },
    {
      name: ["U13f", "U12f"],
      value: [{ name: "Kreisklasse", value: 8 }],
    },
  ];
  // Hessen
  const allLeaguesGermanyHE = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisoberliga", value: 8 },
        { name: "Kreisliga A", value: 9 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Hessenliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Gruppenliga", value: 7 },
        { name: "Kreisoberliga", value: 8 },
        { name: "Kreisliga A", value: 9 },
        { name: "Kreisliga B", value: 10 },
        { name: "Kreisliga C", value: 11 },
        { name: "Kreisliga D", value: 12 },
        { name: "1.Kreisklasse", value: 13 },
        { name: "2.Kreisklasse", value: 14 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m", "U15m", "U14m"],
      value: [
        { name: "Hessenliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Gruppenliga", value: 7 },
        { name: "Kreisliga A", value: 9 },
        { name: "1.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Gruppenliga", value: 7 },
        { name: "Kreisliga A", value: 9 },
        { name: "1.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreisliga A", value: 9 },
        { name: "1.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U9m", "U8m", "U7", "U6"],
      value: [{ name: "1.Kreisklasse", value: 13 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Hessenliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Gruppenliga", value: 7 },
        { name: "Oberliga", value: 8 },
        { name: "A-Liga", value: 9 },
        { name: "B-Liga", value: 10 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Hessenliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "A-Liga", value: 9 },
      ],
    },
    {
      name: ["U15f", "U14f"],
      value: [
        { name: "Hessenliga", value: 5 },
        { name: "A-Liga", value: 9 },
      ],
    },
    {
      name: ["U13f", "U12f"],
      value: [
        { name: "Gruppenliga", value: 7 },
        { name: "A-Liga", value: 9 },
      ],
    },
    {
      name: ["U11f", "U10f"],
      value: [{ name: "A-Liga", value: 9 }],
    },
  ];
  // Mecklenburg-Vorpommern
  const allLeaguesGermanyMV = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisoberliga", value: 9 },
        { name: "Kreisliga", value: 10 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Landesklasse", value: 8 },
        { name: "Kreisoberliga", value: 9 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisoberliga", value: 9 },
      ],
    },
    {
      name: ["U17m", "U16m", "U15m", "U14m", "U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisoberliga", value: 9 },
        { name: "Kreisliga", value: 10 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreisoberliga", value: 9 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U9m", "U8m"],
      value: [
        { name: "Kreisoberliga", value: 9 },
        { name: "Kreisliga", value: 10 },
      ],
    },
    {
      name: ["U7", "U6"],
      value: [{ name: "Kreisoberliga", value: 9 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Kreisoberliga", value: 6 },
        { name: "Kreisliga", value: 7 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [{ name: "Verbandsliga", value: 5 }],
    },
  ];
  // Mittelrhein
  const allLeaguesGermanyMR = [
    {
      name: ["senioren"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Kreisliga A", value: 8 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisliga B", value: 9 },
        { name: "Kreisliga C", value: 10 },
        { name: "Kreisliga D", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m", "U15m", "U14m", "U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreissonderliga", value: 8 },
        { name: "Kreisleistungsklasse", value: 9 },
        { name: "1.Kreisklasse", value: 10 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreissonderliga", value: 8 },
        { name: "1.Kreisklasse", value: 10 },
      ],
    },
    {
      name: ["U9m", "U8m"],
      value: [{ name: "1.Kreisklasse", value: 10 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga A", value: 8 },
      ],
    },
    {
      name: ["U19f", "U18f"],
      value: [{ name: "Bezirksliga", value: 7 }],
    },
    {
      name: ["U17f", "U16f", "U15f", "U14f"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Bezirksliga", value: 7 },
        { name: "1.Kreisklasse", value: 8 },
      ],
    },
    {
      name: ["U13f", "U12f", "U11f", "U10f"],
      value: [{ name: "1.Kreisklasse", value: 8 }],
    },
  ];
  // Niederrhein
  const allLeaguesGermanyNR = [
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisliga B", value: 9 },
        { name: "Kreisliga C", value: 10 },
        { name: "Kreisliga D", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m", "U15m", "U14m"],
      value: [
        { name: "Niederrheinliga", value: 5 },
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisleistungsklasse", value: 11 },
        { name: "Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U17m", "U16m"],
      value: [
        { name: "Niederrheinliga", value: 5 },
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisliga B", value: 9 },
        { name: "Kreisleistungsklasse", value: 11 },
        { name: "Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Niederrheinliga", value: 5 },
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisliga B", value: 9 },
        { name: "Kreisliga C", value: 10 },
        { name: "Kreisleistungsklasse", value: 11 },
        { name: "Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U11m", "U10m", "U9m", "U8m", "U7", "U6"],
      value: [{ name: "Kreisklasse", value: 12 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Niederrheinliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga A", value: 8 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Niederrheinliga", value: 5 },
        { name: "Kreisklasse", value: 8 },
      ],
    },
    {
      name: ["U15f", "U14f"],
      value: [
        { name: "Leistungsklasse", value: 7 },
        { name: "Kreisklasse", value: 8 },
      ],
    },
    {
      name: ["U19f", "U18f", "U13f", "U12f", "U11f", "U10f"],
      value: [{ name: "Kreisklasse", value: 8 }],
    },
    {
      name: ["U9f", "U8f"],
      value: [{ name: "Kreisliga C", value: 8 }],
    },
  ];
  // Niedersachsen
  const allLeaguesGermanyNI = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
        { name: "2.Kreisklasse", value: 10 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
        { name: "2.Kreisklasse", value: 10 },
        { name: "3.Kreisklasse", value: 11 },
        { name: "4.Kreisklasse", value: 12 },
        { name: "5.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m"],
      value: [
        { name: "Niedersachsenliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
        { name: "2.Kreisklasse", value: 10 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
        { name: "2.Kreisklasse", value: 10 },
        { name: "3.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U13m", "U12m", "U11m", "U10m", "U9m", "U8m"],
      value: [
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
        { name: "2.Kreisklasse", value: 10 },
        { name: "3.Kreisklasse", value: 11 },
        { name: "4.Kreisklasse", value: 12 },
        { name: "5.Kreisklasse", value: 13 },
        { name: "6.Kreisklasse", value: 14 },
        { name: "7.Kreisklasse", value: 15 },
      ],
    },
    {
      name: ["U7"],
      value: [
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
        { name: "2.Kreisklasse", value: 10 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Oberliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
        { name: "2.Kreisklasse", value: 10 },
        { name: "3.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U19f", "U18f", "U9f", "U8f"],
      value: [{ name: "Kreisliga", value: 8 }],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Niedersachsenliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
      ],
    },
    {
      name: ["U15f", "U14f"],
      value: [
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
      ],
    },
    {
      name: ["U13f", "U12f", "U11f", "U10f"],
      value: [
        { name: "Kreisliga", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
      ],
    },
  ];
  // Rheinland
  const allLeaguesGermanyRL = [
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Rheinlandliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisliga B", value: 9 },
        { name: "Kreisliga C", value: 10 },
        { name: "Kreisliga D", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m", "frauen"],
      value: [
        { name: "Rheinlandliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisklasse", value: 9 },
      ],
    },
    {
      name: ["U17m", "U16m", "U15m", "U14m", "U13m", "U12m"],
      value: [
        { name: "Rheinlandliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Leistungsklasse", value: 8 },
        { name: "Kreisklasse", value: 9 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Leistungsklasse", value: 8 },
        { name: "Kreisklasse", value: 9 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Rheinlandliga", value: 5 },
        { name: "Bezirksliga", value: 6 },
        { name: "Kreisklasse", value: 7 },
      ],
    },
    {
      name: ["U17f", "U16f", "U15f", "U14f", "U13f", "U12f", "U11f", "U10f"],
      value: [{ name: "Kreisklasse", value: 7 }],
    },
  ];
  // Saarland
  const allLeaguesGermanySL = [
    {
      name: ["senioren"],
      value: [{ name: "Kreisliga A", value: 10 }],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Saarland-Liga", value: 6 },
        { name: "Verbandsliga", value: 7 },
        { name: "Landesliga", value: 8 },
        { name: "Bezirksliga", value: 9 },
        { name: "Kreisliga A", value: 10 },
        { name: "Kreisliga B", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Verbandsliga", value: 7 },
        { name: "Landesliga", value: 8 },
        { name: "Bezirksliga", value: 9 },
        { name: "Kreisliga A", value: 10 },
      ],
    },
    {
      name: ["U17m", "U16m", "U15m", "U14m"],
      value: [
        { name: "Verbandsliga", value: 7 },
        { name: "Landesliga", value: 8 },
        { name: "Bezirksliga", value: 9 },
        { name: "Kreisliga A", value: 10 },
        { name: "2.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Landesliga", value: 8 },
        { name: "Kreisliga A", value: 10 },
        { name: "2.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreisliga A", value: 10 },
        { name: "2.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Bezirksklasse", value: 8 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [{ name: "Verbandsliga", value: 5 }],
    },
    {
      name: ["U15f", "U14f"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
      ],
    },
    {
      name: ["U13f", "U12f"],
      value: [{ name: "Landesliga", value: 6 }],
    },
  ];
  // Sachsen
  const allLeaguesGermanySN = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisoberliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "1.Kreisklasse", value: 12 },
        { name: "2.Kreisklasse", value: 13 },
        { name: "3.Kreisklasse", value: 14 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Landesklasse", value: 7 },
        { name: "Kreisoberliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "2.Kreisliga (B)", value: 10 },
        { name: "3.Kreisliga (C)", value: 11 },
        { name: "1.Kreisklasse", value: 12 },
        { name: "2.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Landesliga", value: 6 },
        { name: "Landesklasse", value: 7 },
        { name: "Kreisoberliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
      ],
    },
    {
      name: ["U17m", "U16m"],
      value: [
        { name: "Landesliga", value: 6 },
        { name: "Landesklasse", value: 7 },
        { name: "Kreisoberliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "1.Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Landesliga", value: 6 },
        { name: "Landesklasse", value: 7 },
        { name: "Kreisoberliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "2.Kreisliga (B)", value: 10 },
        { name: "1.Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Landesliga", value: 6 },
        { name: "Landesklasse", value: 7 },
        { name: "Kreisoberliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "2.Kreisliga (B)", value: 10 },
        { name: "3.Kreisliga (C)", value: 11 },
        { name: "1.Kreisklasse", value: 12 },
        { name: "2.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreisoberliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "2.Kreisliga (B)", value: 10 },
        { name: "1.Kreisklasse", value: 12 },
        { name: "2.Kreisklasse", value: 13 },
      ],
    },
    {
      name: ["U9m", "U8m"],
      value: [
        { name: "Kreisoberliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "2.Kreisliga (B)", value: 10 },
        { name: "1.Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Landesliga", value: 5 },
        { name: "Landesklasse", value: 6 },
        { name: "Kreisoberliga", value: 7 },
        { name: "1.Kreisliga (A)", value: 8 },
        { name: "1.Kreisklasse", value: 9 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Landesliga", value: 5 },
        { name: "Landesklasse", value: 6 },
      ],
    },
    {
      name: ["U15f", "U14f"],
      value: [{ name: "Landesklasse", value: 6 }],
    },
    {
      name: ["U13f", "U12f"],
      value: [{ name: "Kreisoberliga", value: 7 }],
    },
  ];
  // Sachsen-Anhalt
  const allLeaguesGermanyST = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Landesklasse", value: 8 },
        { name: "Kreisoberliga", value: 9 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
        { name: "2.Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
      ],
    },
    {
      name: ["U17m", "U16m", "U15m", "U14m", "U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
        { name: "2.Kreisklasse", value: 12 },
      ],
    },
    {
      name: ["U9m", "U8m"],
      value: [
        { name: "Kreisliga", value: 10 },
        { name: "1.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U7", "U6"],
      value: [{ name: "Kreisliga", value: 10 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Regionalklasse", value: 7 },
      ],
    },
    {
      name: ["U17f", "U16f", "U15f", "U14f"],
      value: [{ name: "Regionalklasse", value: 7 }],
    },
  ];
  // Schleswig-Holstein
  const allLeaguesGermanySH = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Verbandsliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
        { name: "Kreisklasse C", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m"],
      value: [
        { name: "Oberliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Oberliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 7 },
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
        { name: "Kreisklasse C", value: 11 },
        { name: "Kreisklasse D", value: 12 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
        { name: "Kreisklasse C", value: 11 },
        { name: "Kreisklasse D", value: 12 },
        { name: "Kreisklasse E", value: 13 },
      ],
    },
    {
      name: ["U9m", "U8m"],
      value: [
        { name: "Kreisliga", value: 8 },
        { name: "Kreisklasse A", value: 9 },
        { name: "Kreisklasse B", value: 10 },
        { name: "Kreisklasse C", value: 11 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Oberliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Kreisliga", value: 7 },
        { name: "Kreisklasse A", value: 8 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Landesliga", value: 6 },
        { name: "Kreisliga", value: 7 },
      ],
    },
    {
      name: ["U13f", "U12f"],
      value: [{ name: "Kreisliga", value: 7 }],
    },
  ];
  // Südbaden
  const allLeaguesGermanySB = [
    {
      name: ["senioren"],
      value: [{ name: "Kreisklasse", value: 9 }],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "2.Kreisliga (B)", value: 10 },
        { name: "3.Kreisliga (C)", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "Kreisklasse", value: 10 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "Kreisklasse", value: 10 },
        { name: "Kleinfeldklasse", value: 11 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Bezirksliga", value: 8 },
        { name: "1.Kreisliga (A)", value: 9 },
        { name: "Kreisklasse", value: 10 },
        { name: "Kleinfeldklasse", value: 11 },
      ],
    },
    {
      name: ["U11m", "U10m", "U11f", "U10f"],
      value: [{ name: "Kleinfeldklasse", value: 11 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "1.Kreisliga (A)", value: 8 },
        { name: "2.Kreisliga (B)", value: 9 },
        { name: "Kleinfeldklasse", value: 10 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Bezirksliga", value: 7 },
        { name: "1.Kreisliga (A)", value: 8 },
        { name: "Kleinfeldklasse", value: 10 },
      ],
    },
    {
      name: ["U15f", "U14f"],
      value: [
        { name: "Bezirksliga", value: 7 },
        { name: "1.Kreisliga (A)", value: 8 },
        { name: "Kreisklasse", value: 9 },
        { name: "Kleinfeldklasse", value: 10 },
      ],
    },
    {
      name: ["U13f", "U12f"],
      value: [
        { name: "Bezirksliga", value: 7 },
        { name: "1.Kreisliga (A)", value: 8 },
        { name: "Kleinfeldklasse", value: 10 },
      ],
    },
  ];
  // Südwest
  const allLeaguesGermanySW = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisliga", value: 9 },
        { name: "2.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "A-Klasse", value: 9 },
        { name: "B-Klasse", value: 10 },
        { name: "C-Klasse", value: 11 },
        { name: "D-Klasse", value: 12 },
        { name: "Reserveklasse", value: 13 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisliga", value: 9 },
      ],
    },
    {
      name: ["U17m", "U16m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisliga", value: 9 },
        { name: "1.Kreisklasse", value: 10 },
      ],
    },
    {
      name: ["U15m", "U14m", "U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisliga", value: 9 },
        { name: "1.Kreisklasse", value: 10 },
        { name: "2.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U11m", "U10m", "U9m", "U8m"],
      value: [
        { name: "Kreisliga", value: 9 },
        { name: "1.Kreisklasse", value: 10 },
        { name: "2.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U7", "U6"],
      value: [
        { name: "1.Kreisklasse", value: 10 },
        { name: "2.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
      ],
    },
    {
      name: ["U15f", "U14f", "U13f", "U12f", "U11f", "U10f"],
      value: [{ name: "Landesliga", value: 6 }],
    },
  ];
  // Thüringen
  const allLeaguesGermanyTH = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisoberliga", value: 8 },
        { name: "Kreisliga", value: 9 },
        { name: "1.Kreisklasse", value: 10 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Kreisoberliga", value: 8 },
        { name: "Kreisliga", value: 9 },
        { name: "1.Kreisklasse", value: 10 },
        { name: "2.Kreisklasse", value: 11 },
      ],
    },
    {
      name: ["U19m", "U18m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Kreisoberliga", value: 8 },
      ],
    },
    {
      name: ["U17m", "U16m", "U15m", "U14m", "U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Kreisoberliga", value: 8 },
        { name: "Kreisliga", value: 9 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreisoberliga", value: 8 },
        { name: "Kreisliga", value: 9 },
      ],
    },
    {
      name: ["U9m", "U8m"],
      value: [{ name: "Fair-Play-Liga", value: 9 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Kreisoberliga", value: 6 },
      ],
    },
    {
      name: ["U15f", "U14f", "U13f", "U12f"],
      value: [{ name: "Verbandsliga", value: 5 }],
    },
  ];
  // Westfalen
  const allLeaguesGermanyWF = [
    {
      name: ["senioren"],
      value: [
        { name: "Kreisliga A", value: 9 },
        { name: "Kreisliga B", value: 10 },
        { name: "Kreisliga C", value: 11 },
        { name: "Kreisliga D", value: 12 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga", value: 4 },
        { name: "Oberliga", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "Kreisliga A", value: 9 },
        { name: "Kreisliga B", value: 10 },
        { name: "Kreisliga C", value: 11 },
        { name: "Kreisliga D", value: 12 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "Kreisliga A", value: 9 },
        { name: "Kreisliga B", value: 10 },
        { name: "Kreisliga C", value: 11 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "Kreisliga A", value: 9 },
        { name: "Kreisliga B", value: 10 },
        { name: "Kreisliga C", value: 11 },
        { name: "Kreisliga D", value: 12 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Bezirksliga", value: 8 },
        { name: "Kreisliga A", value: 9 },
        { name: "Kreisliga B", value: 10 },
        { name: "Kreisliga C", value: 11 },
        { name: "Kreisliga D", value: 12 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [
        { name: "Kreisliga A", value: 9 },
        { name: "Kreisliga B", value: 10 },
        { name: "Kreisliga C", value: 11 },
        { name: "Kreisliga D", value: 12 },
      ],
    },
    {
      name: ["U9m", "U8m", "U7", "U6"],
      value: [
        { name: "Kreisliga A", value: 9 },
        { name: "Kreisliga B", value: 10 },
        { name: "Kreisliga C", value: 11 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisliga B", value: 9 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Bezirksliga", value: 7 },
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisliga B", value: 9 },
      ],
    },
    {
      name: ["U15f", "U14f", "U13f", "U12f", "U9f", "U8f"],
      value: [{ name: "Kreisliga A", value: 8 }],
    },
    {
      name: ["U11f", "U10f"],
      value: [
        { name: "Kreisliga A", value: 8 },
        { name: "Kreisliga D", value: 9 },
      ],
    },
  ];
  // Württemberg
  const allLeaguesGermanyWB = [
    {
      name: ["senioren"],
      value: [
        { name: "Bezirksliga", value: 9 },
        { name: "Kreisliga A", value: 10 },
      ],
    },
    {
      name: ["herren"],
      value: [
        { name: "Regionalliga Südwest", value: 4 },
        { name: "Oberliga Baden-Württemberg", value: 5 },
        { name: "Verbandsliga", value: 6 },
        { name: "Landesliga", value: 7 },
        { name: "Bezirksliga", value: 9 },
        { name: "Kreisliga A", value: 10 },
        { name: "Kreisliga B", value: 11 },
        { name: "Kreisliga C", value: 12 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m", "U15m", "U14m"],
      value: [
        { name: "Verbandsstaffel", value: 6 },
        { name: "Landesstaffel", value: 7 },
        { name: "Regionenstaffel", value: 8 },
        { name: "Bezirksstaffel", value: 9 },
        { name: "Kreisleistungsstaffel", value: 10 },
        { name: "Kreisstaffel", value: 11 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Verbandsliga", value: 6 },
        { name: "Bezirksstaffel", value: 9 },
        { name: "Kreisleistungsstaffel", value: 10 },
        { name: "Kreisstaffel", value: 11 },
      ],
    },
    {
      name: ["U11m", "U10m"],
      value: [{ name: "Kreisstaffel", value: 11 }],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Verbandsliga", value: 5 },
        { name: "Landesliga", value: 6 },
        { name: "Regionenliga", value: 7 },
        { name: "Bezirksliga", value: 8 },
        { name: "Kreisliga A", value: 9 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Verbandsstaffel", value: 5 },
        { name: "Bezirksstaffel", value: 8 },
        { name: "Kreisstaffel", value: 9 },
      ],
    },
    {
      name: ["U15f", "U14f"],
      value: [
        { name: "Kreisleistungsstaffel", value: 8 },
        { name: "Kreisstaffel", value: 9 },
      ],
    },
    {
      name: ["U13f", "U12f", "U11f", "U10f"],
      value: [{ name: "Kreisstaffel", value: 9 }],
    },
  ];
  // TOP LIGEN
  const topLeaguesGermany = [
    {
      name: ["herren"],
      value: [
        { name: "Bundesliga", value: 1 },
        { name: "2.Bundesliga", value: 2 },
        { name: "3.Liga", value: 3 },
      ],
    },
    {
      name: ["U19m", "U18m", "U17m", "U16m"],
      value: [
        { name: "Bundesliga", value: 1 },
        { name: "Regionalliga", value: 3 },
        { name: "Oberliga", value: 4 },
      ],
    },
    {
      name: ["U15m", "U14m"],
      value: [
        { name: "Regionalliga", value: 3 },
        { name: "Oberliga", value: 4 },
        // { name: "U14-Junioren-Nachwuchs-Cup West", value: 2 },
        // { name: "U14-Sonderspielrunde Süd/Südwest", value: 2 },
      ],
    },
    {
      name: ["U13m", "U12m"],
      value: [
        { name: "Regionalliga", value: 3 },
        // { name: "U13-Junioren-Nachwuchs-Cup", value: 1 },
        // { name: "U13-Talente-Spielrunde Nordost", value: 2 },
        // { name: "U12-Junioren-Nachwuchs-Cup", value: 3 },
      ],
    },
    {
      name: ["frauen"],
      value: [
        { name: "Frauen-Bundesliga", value: 1 },
        { name: "2.Frauen-Bundesliga", value: 2 },
        { name: "Regionalliga", value: 3 },
        { name: "Oberliga", value: 4 },
      ],
    },
    {
      name: ["U17f", "U16f"],
      value: [
        { name: "Bundesliga", value: 1 },
        { name: "Regionalliga", value: 3 },
        { name: "Oberliga", value: 4 },
      ],
    },
  ];

  // render leagues based on association (of manager)
  const getLeagueOptions = () => {
    let possibleLeagues;
    if (!age) {
      setPossibleLeagues([
        { name: "Bitte zuerst das Alter auswählen", value: "" },
      ]);
      return;
    }

    switch (fixAssociation) {
      case "BA":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyBA,
          topLeaguesGermany
        );
        break;
      case "BY":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyBY,
          topLeaguesGermany
        );
        break;
      case "BE":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyBE,
          topLeaguesGermany
        );
        break;
      case "BB":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyBB,
          topLeaguesGermany
        );
        break;
      case "HB":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyHB,
          topLeaguesGermany
        );
        break;
      case "HH":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyHH,
          topLeaguesGermany
        );
        break;
      case "HE":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyHE,
          topLeaguesGermany
        );
        break;
      case "MV":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyMV,
          topLeaguesGermany
        );
        break;
      case "MR":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyMR,
          topLeaguesGermany
        );
        break;
      case "NR":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyNR,
          topLeaguesGermany
        );
        break;
      case "NI":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyNI,
          topLeaguesGermany
        );
        break;
      case "RL":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyRL,
          topLeaguesGermany
        );
        break;
      case "SL":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanySL,
          topLeaguesGermany
        );
        break;
      case "SN":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanySN,
          topLeaguesGermany
        );
        break;
      case "ST":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyST,
          topLeaguesGermany
        );
        break;
      case "SH":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanySH,
          topLeaguesGermany
        );
        break;
      case "SB":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanySB,
          topLeaguesGermany
        );
        break;
      case "SW":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanySW,
          topLeaguesGermany
        );
        break;
      case "TH":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyTH,
          topLeaguesGermany
        );
        break;
      case "WF":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyWF,
          topLeaguesGermany
        );
        break;
      case "WB":
        possibleLeagues = filterLeagueArray(
          age.value,
          allLeaguesGermanyWB,
          topLeaguesGermany
        );
        break;

      default:
        possibleLeagues = [{ name: "Keine Ligen vorhanden", value: "" }];
        break;
    }

    setPossibleLeagues(possibleLeagues);
  };

  const { hasLength, hasNumber, hasCapital, hasSpecialChar } = pwProps;

  // create account for coach
  const registerCoach = async () => {
    const userData = {
      name: nameCoach,
      surname: surnameCoach,
      email: emailCoach,
      password: passwordCoach,
      role: "coach",
      code,
      league,
      age,
    };

    // set item to local storage (so we can resend the email in registration success)
    localStorage.setItem("data_resend", emailCoach);

    try {
      // init registration flow
      dispatch(registerLoading());
      // register user
      await register(userData);
      // go on
      dispatch(registerSuccess());
      // return <Link to="/register/success" />;
      navigate("/register/success");
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // dispatch(updateError(message));
      dispatch(registerError());
      console.log(error);
      toast.error("Hat leider nicht geklappt. Bitte erneut versuchen.");
    }
  };

  // check code of coach
  const registerCoachStepCode = async (e) => {
    e.preventDefault();

    // TODO
    // hier dann schauen, ob testphase oder nicht
    // entsprechend zufällig alter und liga zuweisen und dann testphase starten

    // set error if there is no code
    if (!code) {
      setCodeError(true);
      return;
    }
    setCodeError(false);

    try {
      // init validation flow
      dispatch(registerCodeValidationLoading());
      // check if code is valid
      const response = await checkRegistrationCode(code);
      // go on
      dispatch(registerCodeValidationSuccess());
      setFixAssociation(response.verband);
      setStepCoach(2);
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // dispatch(updateError(message));
      dispatch(registerCodeValidationError());
      toast.error("Falscher Code");
    }
  };

  // check personal data of coach
  const registerCoachStepPersonalData = async (e) => {
    e.preventDefault();

    let error = false;

    // set error if there is an empty input
    if (!nameCoach) {
      setNameCoachError(true);
      error = true;
    } else {
      setNameCoachError(false);
    }

    if (!emailCoach) {
      setEmailCoachError(true);
      error = true;
    } else {
      setEmailCoachError(false);
    }

    if (!passwordCoach) {
      setPasswordCoachError(true);
      error = true;
    } else {
      setPasswordCoachError(false);
    }

    const hasL = hasLength(passwordCoach);
    const hasN = hasNumber(passwordCoach);
    const hasC = hasCapital(passwordCoach);
    const hasS = hasSpecialChar(passwordCoach);

    setPwValidationLength(hasL);
    setPwValidationNumber(hasN);
    setPwValidationCapital(hasC);
    setPwValidationSpecialChars(hasS);

    if (!hasL || !hasN || !hasC || !hasS) {
      setPasswordCoachError(true);
      error = true;
    } else {
      setPasswordCoachError(false);
    }

    if (!password2Coach || passwordCoach !== password2Coach) {
      setPassword2CoachError(true);
      error = true;
    } else {
      setPassword2CoachError(false);
    }

    // return if there is an error
    if (error) {
      return;
    }

    // go to next step if everything is ok
    setStepCoach(1);
  };

  // check team data of coach
  const registerCoachStepTeamData = async (e) => {
    e.preventDefault(); // do not allow to submit the form, until all checks are made

    let error = false;

    // set error if there is age and league is not selected
    if (!age.value) {
      setAgeError(true);
      error = true;
    } else {
      setAgeError(false);
    }

    // console.log(age.length);

    // für kleine Jugenden (unter E-Junioren/Juniorinnen) gibt es keinen Spielbetrieb
    // hier schauen, dass der String länger als 3 Zeichen ist, da die unteren Jugenden einen kürzeren value-String haben
    // if (!league && age.length > 3) {
    //   setLeagueError(true);
    //   error = true;
    // } else {
    //   setLeagueError(false);
    // }

    // return when there is an error
    if (error) {
      return;
    }

    registerCoach();
  };

  return (
    <>
      {/* multistep registration */}
      <Stepper orientation="vertical" activeStep={stepCoach}>
        {/* personal data */}
        <Step>
          <StepLabel>Persönliche Daten angeben</StepLabel>
          <StepContent>
            <Grid container justifyContent="center" rowSpacing={1}>
              <Grid item>
                <Typography variant="body2">
                  Trage bitte deine persönlichen Daten ein. Bitte beachte, dass
                  der Name später nicht mehr geändert werden kann!
                </Typography>
              </Grid>
              <form>
                <Grid container spacing={1}>
                  <Grid item xs={12} mt="10px">
                    <TextField
                      error={nameCoachError}
                      required
                      autoFocus
                      id="name"
                      label="Name"
                      helperText={nameCoachError && "Bitte Name angeben"}
                      value={nameCoach}
                      name="nameCoach"
                      size="small"
                      onChange={onNameCoachChanged}
                      inputProps={{
                        style: {
                          paddingRight: "60px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      // error={surnameCoachError}
                      // required
                      id="surname"
                      label="Nachname"
                      // helperText={surnameCoachError && "Bitte Name angeben"}
                      value={surnameCoach}
                      name="surnameCoach"
                      size="small"
                      onChange={onSurnameCoachChanged}
                      inputProps={{
                        style: {
                          paddingRight: "60px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={emailCoachError}
                      required
                      id="email"
                      label="E-Mail"
                      helperText={emailCoachError && "Bitte E-Mail angeben"}
                      type="email"
                      value={emailCoach}
                      name="emailCoach"
                      size="small"
                      onChange={onEmailCoachChanged}
                      inputProps={{
                        style: {
                          paddingRight: "60px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={passwordCoachError}
                      required
                      id="passwordCoach"
                      label="Passwort"
                      helperText={
                        passwordCoachError && (
                          <>
                            Das Passwort braucht mindestens: <br />
                            {!pwValidationLength && (
                              <>
                                7 Zeichen <br />
                              </>
                            )}
                            {!pwValidationNumber && (
                              <>
                                1 Zahl <br />
                              </>
                            )}
                            {!pwValidationCapital && (
                              <>
                                1 Großbuchstaben <br />
                              </>
                            )}
                            {!pwValidationSpecialChars && <>1 Sonderzeichen</>}
                          </>
                        )
                      }
                      type={showPasswordCoach ? "text" : "password"}
                      value={passwordCoach}
                      name="passwordCoach"
                      size="small"
                      onChange={onPasswordCoachChanged}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPasswordCoach(!showPasswordCoach)
                              }
                            >
                              {showPasswordCoach ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={password2CoachError}
                      required
                      id="password2Coach"
                      label="Passwort bestätigen"
                      helperText={
                        password2CoachError &&
                        "Passwörter stimmen nicht überein"
                      }
                      type={showPassword2Coach ? "text" : "password"}
                      value={password2Coach}
                      name="password2Coach"
                      size="small"
                      onChange={onPassword2CoachChanged}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPassword2Coach(!showPassword2Coach)
                              }
                            >
                              {showPassword2Coach ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button disabled>Zurück</Button>
                    <Button
                      type="submit"
                      onClick={registerCoachStepPersonalData}
                    >
                      Weiter
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </StepContent>
        </Step>
        {/* code */}
        <Step>
          <StepLabel>Zugangscode angeben</StepLabel>
          <StepContent>
            <Grid container justifyContent="center" rowSpacing={1}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Wenn Du bereits einen Zugangscode hast, kannst du ihn hier
                  angeben. Damit wirst Du direkt deinem Team zugewiesen. Hast Du
                  noch keinen Zugangscode, kannst Du MatchPlaner auch 1 Woche
                  lang kostenlos testen.
                </Typography>
              </Grid>
              <form>
                <Grid container justifySelf="center">
                  <Grid item xs={12} mt="10px">
                    <TextField
                      // error={codeError}
                      autoFocus
                      id="code"
                      label="Zugangscode angeben"
                      // helperText={codeError && "Bitte Code angeben"}
                      type="code"
                      value={code}
                      name="code"
                      size="small"
                      onChange={onCodeChanged}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={() => setStepCoach(0)}>Zurück</Button>
                    {/* <Button disabled>Testphase</Button> */}
                    <Button
                      type="submit"
                      onClick={registerCoachStepCode}
                      disabled={!code}
                    >
                      Weiter
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </StepContent>
        </Step>
        {/* team data */}
        <Step>
          <StepLabel>Mannschaftsdaten angeben</StepLabel>
          <StepContent>
            <Grid container rowSpacing={1}>
              <Grid item>
                <Typography variant="body2">
                  Trage bitte die Daten für deine Mannschaft ein. Die Daten
                  können jederzeit über das Profil aktualisiert werden.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  size="small"
                  label="Altersklasse"
                  // defaultValue=""
                  name="age"
                  id="age"
                  value={age.value}
                  onChange={onAgeChanged}
                  error={ageError}
                  helperText={ageError && "Wähle die passende Altersklasse aus"}
                  // SelectProps={{
                  //   MenuProps: {
                  //     PaperProps: { sx: { maxHeight: 200 } },
                  //   },
                  // }}
                  sx={{ width: "200px" }}
                >
                  {allAges.map((age, i) => (
                    <MenuItem key={i} value={age.value}>
                      {age.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  size="small"
                  label="Spielklasse"
                  // defaultValue=""
                  name="league"
                  id="league"
                  value={league.value}
                  onChange={onLeagueChanged}
                  error={leagueError}
                  helperText={
                    leagueError && "Wähle die passende Spielklasse aus"
                  }
                  // SelectProps={{
                  //   MenuProps: {
                  //     PaperProps: { sx: { maxHeight: 200 } },
                  //   },
                  // }}
                  sx={{ width: "200px" }}
                >
                  {possibleLeagues.map((league, i) => (
                    <MenuItem key={i} value={league.value}>
                      {league.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <Button onClick={() => setStepCoach(1)}>Zurück</Button>
                <Button onClick={registerCoachStepTeamData}>Weiter</Button>
              </Grid>
            </Grid>
          </StepContent>
        </Step>
      </Stepper>
    </>
  );
}

export default RegistrationCoach;
