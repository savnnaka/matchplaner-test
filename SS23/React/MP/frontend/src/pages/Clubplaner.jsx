import {
  Container,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Link as MuiLink,
  TextField,
  MenuItem,
  Checkbox,
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Badge,
} from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  DateTimePicker,
  PickersDay,
  DayCalendarSkeleton,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  AddCircle,
  ArrowBackIos,
  CheckBoxOutlineBlank,
  CheckBox,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function Clubplaner() {
  // set custom title (for google analytics)
  useEffect(() => {
    document.title = "MatchPlaner | Vereinsplaner";
  }, []);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user appointments = user.appoinntments
  // club appointments = appointments (club === user.club)

  const dummyAppointments = [
    // match
    {
      club: "1. FC MatchPlaner",
      creator: {
        email: "ak@herren.test",
        role: "coach",
      },
      type: "match",
      // date: dayjs("2023-03-10"),
      date: "2023-03-10",
      time: "19:00",
      opponent: "TSV Stuttgart",
      destination: 1,
      facility: 2,
      game: 1,
    },
    {
      club: "1. FC MatchPlaner",
      creator: {
        email: "ak@frauen.test",
        role: "coach",
      },
      type: "match",
      // date: dayjs("2023-04-17"),
      date: "2023-04-17",
      time: "18:30",
      opponent: "TSV Sickenhausen",
      destination: 2,
      facility: 0,
      game: 3,
    },
    // unit
    {
      club: "1. FC MatchPlaner",
      creator: {
        email: "ak@herren.test",
        role: "coach",
      },
      type: "unit",
      // date: dayjs("2023-03-11"),
      date: "2023-03-11",
      time: "14:45",
      facility: 1,
      frequency: 1,
    },
    {
      club: "1. FC MatchPlaner",
      creator: {
        email: "ak@frauen.test",
        role: "coach",
      },
      type: "unit",
      // date: dayjs("2023-03-21"),
      date: "2023-03-21",
      time: "22:00",
      facility: 1,
      frequency: 1,
    },
    // other
    {
      club: "1. FC MatchPlaner",
      creator: {
        email: "ak2@herren.test",
        role: "manager",
      },
      type: "other",
      title: "Trainersitzung",
      // date: dayjs("2023-03-22"),
      date: "2023-03-22",
      time: "19:32",
      info: "Themen sind dies das.",
    },
    {
      club: "1. FC MatchPlaner",
      creator: {
        email: "ak3@herren.test",
        role: "manager",
      },
      type: "other",
      title: "Schiri-Schulung",
      // date: dayjs("2023-03-10"),
      date: "2023-03-10",
      time: "00:12",
      info: "Wen's interessiert",
    },
  ];

  const [pickedDate, setPickedDate] = useState(dayjs("2023-03-08"));
  const [pickedDay, setPickedDay] = useState(dayjs("2023-03-08").get("date"));
  const [pickedMonth, setPickedMonth] = useState(
    dayjs("2023-03-08").get("month")
  );
  const [pickedYear, setPickedYear] = useState(dayjs("2023-03-08").get("year"));

  const [appointmentsOnSpecificDay, setAppointmentsOnSpecificDay] = useState(
    []
  );

  const [facilityFilter, setFacilityFilter] = useState([]);
  const [userFilter, setUserFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const allFacilites = [
    { label: "Spielstätte 1", id: 1 },
    { label: "Spielstätte 2", id: 2 },
  ];

  const allUser = [
    { label: "Selbst", id: 1 },
    { label: "Coaches", id: 2 },
    { label: "Manager", id: 3 },
  ];
  const allTypes = [
    { label: "Spiel", id: 1 },
    { label: "Training", id: 2 },
    { label: "Sonstiges", id: 3 },
  ];
  const allDestinations = [
    { label: "Heim", id: 1 },
    { label: "Auswärts", id: 2 },
  ];
  const allGameTypes = [
    { label: "Testspiel", id: 1 },
    { label: "Testspiele (Gruppe)", id: 2 },
    { label: "Turnier", id: 3 },
  ];
  const allFrequencies = [
    { label: "einmalig", id: 1 },
    { label: "wöchentlich", id: 2 },
  ];

  const [isLoading, setIsLoading] = useState(true);

  // filter appointments
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const filterAppointments = () => {
    let appointmentsToFilter = [];
    user.appointments
      ? (appointmentsToFilter = appointmentsToFilter.concat(user.appointments))
      : (appointmentsToFilter = appointmentsToFilter.concat(dummyAppointments));
    setFilteredAppointments([]);

    // if there are no filter, add all appointments, else filter and add only filtered
    if (
      typeFilter.length === 0 &&
      userFilter.length === 0 &&
      facilityFilter.length === 0
    ) {
      // add each element to filteredAppointments
      appointmentsToFilter.forEach((element) => {
        setFilteredAppointments((prev) => [...prev, element]);
      });
    } else {
      let tempAppointmentsFacility = [];
      let tempAppointmentsUser = [];
      let tempAppointmentsType = [];
      // filter for facility
      if (facilityFilter.length > 0) {
        // check for every facility if it is in the filter, then filter for those facilities
        facilityFilter.forEach((element) => {
          let elementsOfFilter = appointmentsToFilter.filter(
            (a) => a.facility === element.id
          );
          // for each found element, add to new array and remove from old array
          for (let i = 0; i < elementsOfFilter.length; i++) {
            // get id of element
            let idOfElement = appointmentsToFilter
              .map((obj) => obj.facility)
              .indexOf(element.id);
            // push element to new array
            tempAppointmentsFacility.push(appointmentsToFilter[idOfElement]);
            // remove element of old array
            appointmentsToFilter.splice(idOfElement, 1);
          }
        });
      } else {
        tempAppointmentsFacility = appointmentsToFilter;
      }

      // only filter in the remaining elements after already used filter
      if (userFilter.length > 0) {
        // eigene Termine, Coaches, Manager
        userFilter.forEach((element) => {
          if (element.label === "Selbst") {
            let elementsOfFilter = tempAppointmentsFacility.filter(
              (a) => a.creator.email === user.email
            );
            // for each found element, add to new array and remove from old array
            for (let i = 0; i < elementsOfFilter.length; i++) {
              // get id of element
              let idOfElement = tempAppointmentsFacility
                .map((obj) => obj.creator.email)
                .indexOf(user.email);
              // push element to new array
              tempAppointmentsUser.push(tempAppointmentsFacility[idOfElement]);
              // remove element of old array
              tempAppointmentsFacility.splice(idOfElement, 1);
            }
          }
          if (element.label === "Coaches") {
            let elementsOfFilter = tempAppointmentsFacility.filter(
              (a) => a.creator.role === "coach"
            );
            // for each found element, add to new array and remove from old array
            for (let i = 0; i < elementsOfFilter.length; i++) {
              // get id of element
              let idOfElement = tempAppointmentsFacility
                .map((obj) => obj.creator.role)
                .indexOf("coach");
              // push element to new array
              tempAppointmentsUser.push(tempAppointmentsFacility[idOfElement]);
              // remove element of old array
              tempAppointmentsFacility.splice(idOfElement, 1);
            }
          }
          if (element.label === "Manager") {
            let elementsOfFilter = tempAppointmentsFacility.filter(
              (a) => a.creator.role === "manager"
            );
            // for each found element, add to new array and remove from old array
            for (let i = 0; i < elementsOfFilter.length; i++) {
              // get id of element
              let idOfElement = tempAppointmentsFacility
                .map((obj) => obj.creator.role)
                .indexOf("manager");
              // push element to new array
              tempAppointmentsUser.push(tempAppointmentsFacility[idOfElement]);
              // remove element of old array
              tempAppointmentsFacility.splice(idOfElement, 1);
            }
          }
        });
      } else {
        tempAppointmentsUser = tempAppointmentsFacility;
      }

      // only filter in the remaining elements after already used filter
      if (typeFilter.length > 0) {
        // Spiel, Training, Sonstiges
        typeFilter.forEach((element) => {
          if (element.label === "Spiel") {
            let elementsOfFilter = tempAppointmentsUser.filter(
              (a) => a.type === "match"
            );
            // for each found element, add to new array and remove from old array
            for (let i = 0; i < elementsOfFilter.length; i++) {
              // get id of element
              let idOfElement = tempAppointmentsUser
                .map((obj) => obj.type)
                .indexOf("match");
              // push element to new array
              tempAppointmentsType.push(tempAppointmentsUser[idOfElement]);
              // remove element of old array
              tempAppointmentsUser.splice(idOfElement, 1);
            }
          }
          if (element.label === "Training") {
            let elementsOfFilter = tempAppointmentsUser.filter(
              (a) => a.type === "unit"
            );
            // for each found element, add to new array and remove from old array
            for (let i = 0; i < elementsOfFilter.length; i++) {
              // get id of element
              let idOfElement = tempAppointmentsUser
                .map((obj) => obj.type)
                .indexOf("unit");
              // push element to new array
              tempAppointmentsType.push(tempAppointmentsUser[idOfElement]);
              // remove element of old array
              tempAppointmentsUser.splice(idOfElement, 1);
            }
          }
          if (element.label === "Sonstiges") {
            let elementsOfFilter = tempAppointmentsUser.filter(
              (a) => a.type === "other"
            );
            // for each found element, add to new array and remove from old array
            for (let i = 0; i < elementsOfFilter.length; i++) {
              // get id of element
              let idOfElement = tempAppointmentsUser
                .map((obj) => obj.type)
                .indexOf("other");
              // push element to new array
              tempAppointmentsType.push(tempAppointmentsUser[idOfElement]);
              // remove element of old array
              tempAppointmentsUser.splice(idOfElement, 1);
            }
          }
        });
      } else {
        tempAppointmentsType = tempAppointmentsUser;
      }

      // add each element to filteredAppointments
      tempAppointmentsType.forEach((element) => {
        setFilteredAppointments((prev) => [...prev, element]);
      });
    }
  };

  // filter calendar view
  const [daysWithAppointment, setDaysWithAppointment] = useState([]);
  const viewAppointments = () => {
    setDaysWithAppointment([]);
    filteredAppointments.map((a) => {
      // only add appointment, if it is the right year and month
      if (
        // a.date.get("month") === pickedMonth &&
        dayjs(a.date).get("month") === pickedMonth &&
        // a.date.get("year") === pickedYear
        dayjs(a.date).get("year") === pickedYear
      ) {
        setDaysWithAppointment((prev) => [...prev, dayjs(a.date).get("date")]);
      }
    });
  };

  // apply filter and view on load and on filter change
  useEffect(() => {
    setIsLoading(true);
    filterAppointments();
    // viewAppointments();
    setIsLoading(false);
  }, [facilityFilter, userFilter, typeFilter]);

  // change appointments on calendar change
  useEffect(() => {
    viewAppointments();
  }, [pickedMonth, pickedYear, filteredAppointments]);

  useEffect(() => {
    setPickedDay(pickedDate.get("date"));
  }, [pickedDate]);

  // search for appointments on one specific day
  useEffect(() => {
    setAppointmentsOnSpecificDay(
      filteredAppointments.filter(
        (a) =>
          // a.date.get("date") === pickedDay &&
          dayjs(a.date).get("date") === pickedDay &&
          // a.date.get("month") === pickedMonth &&
          dayjs(a.date).get("month") === pickedMonth &&
          // a.date.get("year") === pickedYear
          dayjs(a.date).get("year") === pickedYear
      )
    );
  }, [pickedDay, filteredAppointments]);

  const DayWithAppointment = (props) => {
    const {
      daysWithAppointment = [],
      day,
      outsideCurrentMonth,
      ...other
    } = props;
    const hasAppointment =
      !props.outsideCurrentMonth &&
      daysWithAppointment.indexOf(props.day.date()) > -1;
    return (
      // <Badge
      //   key={day.toString()}
      //   overlap="circular"
      //   badgeContent={hasAppointment ? "1" : undefined}
      // >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{
          backgroundColor: hasAppointment && "rgba(255, 255, 255, 0.5)",
        }}
      />
      // </Badge>
    );
  };

  // dialog
  // open/close
  const [openNewAppointmentDialog, setOpenNewAppointmentDialog] =
    useState(false);
  // type
  const [typeNewAppointment, setTypeNewAppointment] = useState("Sonstiges"); // Sonstiges, Training, Spiel
  const [typeNewAppointmentError, setTypeNewAppointmentError] = useState(false);
  const onChangeTypeNewAppointment = (e) =>
    setTypeNewAppointment(e.target.value);
  const [dateNewAppointment, setDateNewAppointment] = useState(dayjs());
  const [dateNewAppointmentError, setDateNewAppointmentError] = useState(false);
  const onChangeDateNewAppointment = (e) =>
    setDateNewAppointment(e.target.value);
  const [timeNewAppointment, setTimeNewAppointment] = useState(
    dayjs().add(1, "m")
  );
  const [timeNewAppointmentError, setTimeNewAppointmentError] = useState(false);
  const onChangeTimeNewAppointment = (e) =>
    setTimeNewAppointment(e.target.value);
  const [facilityNewAppointment, setFacilityNewAppointment] = useState("");
  const [facilityNewAppointmentError, setFacilityNewAppointmentError] =
    useState(false);
  const onChangeFacilityNewAppointment = (e) =>
    setFacilityNewAppointment(e.target.value);
  // other
  const [titleNewAppointment, setTitleNewAppointment] = useState("");
  const [titleNewAppointmentError, setTitleNewAppointmentError] =
    useState(false);
  const onChangeTitleNewAppointment = (e) =>
    setTitleNewAppointment(e.target.value);
  const [infoNewAppointment, setInfoNewAppointment] = useState("");
  const [infoNewAppointmentError, setInfoNewAppointmentError] = useState(false);
  const onChangeInfoNewAppointment = (e) =>
    setInfoNewAppointment(e.target.value);
  // training
  const [frequencyNewAppointment, setFrequencyNewAppointment] = useState(""); // once, every week
  const [frequencyNewAppointmentError, setFrequencyNewAppointmentError] =
    useState(false);
  const onChangeFrequencyNewAppointment = (e) =>
    setFrequencyNewAppointment(e.target.value);
  // match
  const [opponentNewAppointment, setOpponentNewAppointment] = useState("");
  const [opponentNewAppointmentError, setOpponentNewAppointmentError] =
    useState(false);
  const onChangeOpponentNewAppointment = (e) =>
    setOpponentNewAppointment(e.target.value);
  const [destinationNewAppointment, setDestinationNewAppointment] =
    useState("");
  const [destinationNewAppointmentError, setDestinationNewAppointmentError] =
    useState(false);
  const onChangeDestinationNewAppointment = (e) =>
    setDestinationNewAppointment(e.target.value);
  const [gameNewAppointment, setGameNewAppointment] = useState("");
  const [gameNewAppointmentError, setGameNewAppointmentError] = useState(false);
  const onChangeGameNewAppointment = (e) =>
    setGameNewAppointment(e.target.value);

  const createAppointment = () => {
    // check for details
    let error = false;
    if (!typeNewAppointment) {
      setTypeNewAppointmentError(true);
      error = true;
    } else {
      setTypeNewAppointmentError(false);
    }
    if (!dateNewAppointment || !timeNewAppointment) {
      error = true;
    }
    // if(!dateNewAppointment) {
    //   setDateNewAppointmentError(true)
    //   error(false)
    // } else {
    //   setDateNewAppointmentError(false)
    // }
    // if(!timeNewAppointment) {
    //   setTimeNewAppointmentError(true)
    //   error(false)
    // } else {
    //   setTimeNewAppointmentError(false)
    // }
    if (typeNewAppointment === "Spiel") {
      // no required fields?
    }
    if (typeNewAppointment === "Training") {
      if (!frequencyNewAppointment) {
        setFrequencyNewAppointmentError(true);
        error = true;
      } else {
        setFrequencyNewAppointmentError(false);
      }
      // if (!facilityNewAppointment) {
      //   setFacilityNewAppointmentError(true);
      //   error(false);
      // } else {
      //   setFacilityNewAppointmentError(false);
      // }
    }
    if (typeNewAppointment === "Sonstiges") {
      if (!titleNewAppointment) {
        setTitleNewAppointmentError(true);
        error = true;
      } else {
        setTitleNewAppointmentError(false);
      }
    }

    if (error) {
      toast.error("Bitte alle benötigten Felder ausfüllen.");
    } else {
      // call backend and create appointment
      console.log("Create new Appointment");
      // reset fields of dialog
      setTypeNewAppointment("Sonstiges");
      setDateNewAppointment("");
      setTimeNewAppointment("");
      setTitleNewAppointment("");
      setInfoNewAppointment("");
      setFacilityNewAppointment("");
      setFrequencyNewAppointment("");
      setOpponentNewAppointment("");
      setGameNewAppointment("");
      setDestinationNewAppointment("");
      // setOpenNewAppointmentDialog(false)
    }
  };

  return (
    <>
      {/* Container with settings for toasts */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
      />

      <Container>
        {/* header */}
        <Grid container alignItems="center">
          {/* back button */}
          <Grid item xs>
            <Tooltip title="Zurück zum Dashboard" arrow>
              <MuiLink onClick={() => navigate("/coach")}>
                <ArrowBackIos />
              </MuiLink>
            </Tooltip>
          </Grid>
          {/* title */}
          <Grid item xs={8}>
            <Typography variant="mainHeader">VereinsPlaner</Typography>
          </Grid>
          {/* add button */}
          <Grid item xs>
            <Tooltip title="Neuen Termin anlegen" arrow>
              <IconButton onClick={() => setOpenNewAppointmentDialog(true)}>
                <AddCircle fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        {/* content */}
        <Grid container>
          {/* filter */}
          <Grid item xs={12} md={3} container direction="column">
            {/* facilites */}
            <Autocomplete
              multiple
              id="facilityFilter"
              onChange={(event, newValue) => setFacilityFilter(newValue)}
              disableCloseOnSelect
              options={allFacilites}
              getOptionLabel={(option) => {
                return option.label;
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlank fontSize="small" />}
                      checkedIcon={<CheckBox fontSize="small" />}
                      sx={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Spielstätten" />
              )}
            />
            {/* user */}
            <Autocomplete
              multiple
              id="userFilter"
              onChange={(event, newValue) => setUserFilter(newValue)}
              disableCloseOnSelect
              options={allUser}
              // defaultValue={[allUser[0]]}
              getOptionLabel={(option) => {
                return option.label;
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlank fontSize="small" />}
                      checkedIcon={<CheckBox fontSize="small" />}
                      sx={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => <TextField {...params} label="User" />}
            />
            {/* type */}
            <Autocomplete
              multiple
              id="typeFilter"
              onChange={(event, newValue) => setTypeFilter(newValue)}
              disableCloseOnSelect
              options={allTypes}
              getOptionLabel={(option) => {
                return option.label;
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, option, { selected }) => {
                return (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlank fontSize="small" />}
                      checkedIcon={<CheckBox fontSize="small" />}
                      sx={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
              renderInput={(params) => <TextField {...params} label="Art" />}
            />
          </Grid>
          {/* dates */}
          <Grid item xs={12} md={9} container>
            {/* calendar */}
            <Grid item xs={12} md={9}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"de"}
              >
                <DateCalendar
                  value={pickedDate}
                  renderLoading={() => <DayCalendarSkeleton />}
                  loading={isLoading}
                  onChange={(newDate) => setPickedDate(newDate)}
                  onMonthChange={(newMonth) => {
                    setPickedMonth(newMonth.get("month"));
                  }}
                  onYearChange={(newYear) => {
                    setPickedYear(newYear.get("year"));
                  }}
                  slots={{
                    day: DayWithAppointment,
                  }}
                  slotProps={{
                    day: {
                      daysWithAppointment,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            {/* appointments */}
            <Grid item xs={12} md={3}>
              {appointmentsOnSpecificDay.map((a, i) => {
                let time = a.time;
                let content;
                if (a.type === "other") {
                  content = a.title;
                } else if (a.type === "match") {
                  content = "Spiel gegen " + a.opponent;
                } else if (a.type === "unit") {
                  content = "Training";
                }
                return (
                  <Grid container key={i}>
                    <Grid item marginRight={1}>
                      <Typography>{time} Uhr</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{content}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* add new appointment */}
      <Dialog
        open={openNewAppointmentDialog}
        onClose={() => setOpenNewAppointmentDialog(false)}
      >
        <DialogTitle>
          Neuen Termin anlegen
          <IconButton
            aria-label="close"
            onClick={() => setOpenNewAppointmentDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography>Terminart</Typography>
            </Grid>
            <Grid item>
              <TextField
                select
                id="type"
                name="type"
                value={typeNewAppointment}
                onChange={onChangeTypeNewAppointment}
                error={typeNewAppointmentError}
              >
                {allTypes.map((t, index) => (
                  <MenuItem key={index} value={t.label}>
                    {t.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography>Datum</Typography>
            </Grid>
            <Grid item>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"de"}
              >
                <DatePicker
                  value={dateNewAppointment}
                  onChange={(newDate) => setDateNewAppointment(newDate)}
                  disablePast
                />

                {/* <DateTimePicker label="Wähle Tag und Uhrzeit" /> */}
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography>Uhrzeit</Typography>
            </Grid>
            <Grid item>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"de"}
              >
                <TimePicker
                  value={timeNewAppointment}
                  onChange={(newTime) => setTimeNewAppointment(newTime)}
                  disablePast
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          {typeNewAppointment === "Sonstiges" && (
            <>
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Titel</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="title"
                    name="title"
                    value={titleNewAppointment}
                    onChange={onChangeTitleNewAppointment}
                    error={titleNewAppointmentError}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Info</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="info"
                    name="info"
                    value={infoNewAppointment}
                    onChange={onChangeInfoNewAppointment}
                  />
                </Grid>
              </Grid>
            </>
          )}
          {typeNewAppointment === "Training" && (
            <>
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Häufigkeit</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    id="frequency"
                    name="frequency"
                    value={frequencyNewAppointment}
                    onChange={onChangeFrequencyNewAppointment}
                    error={frequencyNewAppointmentError}
                  >
                    {allFrequencies.map((f, index) => (
                      <MenuItem key={index} value={f.id}>
                        {f.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}
          {typeNewAppointment === "Spiel" && (
            <>
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Gegner</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="opponent"
                    name="opponent"
                    value={opponentNewAppointment}
                    onChange={onChangeOpponentNewAppointment}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Spielart</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    id="game"
                    name="game"
                    value={gameNewAppointment}
                    onChange={onChangeGameNewAppointment}
                  >
                    {allGameTypes.map((g, index) => (
                      <MenuItem key={index} value={g.id}>
                        {g.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Spielort</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    id="destination"
                    name="destination"
                    value={destinationNewAppointment}
                    onChange={onChangeDestinationNewAppointment}
                  >
                    {allDestinations.map((d, index) => (
                      <MenuItem key={index} value={d.id}>
                        {d.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}
          {typeNewAppointment !== "other" && (
            <>
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography>Platz</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    id="facility"
                    name="facility"
                    value={facilityNewAppointment}
                    onChange={onChangeFacilityNewAppointment}
                  >
                    {allFacilites.map((f, index) => (
                      <MenuItem key={index} value={f.id}>
                        {f.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewAppointmentDialog(false)}>
            Abbrechen
          </Button>
          <Button onClick={() => createAppointment()}>Bestätigen</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Clubplaner;
