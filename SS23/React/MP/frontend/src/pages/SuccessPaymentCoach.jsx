import { Typography, Link } from "@mui/material";
import { useSelector } from "react-redux";

function SuccessPaymentCoach() {
  const { user } = useSelector((state) => state.user);

  // newPackage is not in JSON format, so just get it
  const newPackage = localStorage.getItem("newPackage");

  // set user properties based on the new package and remove the temporary value
  if (newPackage) {
    // let userData;
    // switch (newPackage) {
    //   case "basic":
    //     userData = {
    //       matchplaner: true,
    //       eventplaner: true,
    //       reiseplaner: true,
    //       trainingsplaner: false,
    //       taktikplaner: false,
    //       saisonplaner: false,
    //     };
    //     break;
    //   case "training":
    //     userData = {
    //       matchplaner: true,
    //       eventplaner: true,
    //       reiseplaner: true,
    //       trainingsplaner: true,
    //       taktikplaner: false,
    //       saisonplaner: false,
    //     };
    //     break;
    //   case "tactics":
    //     userData = {
    //       matchplaner: true,
    //       eventplaner: true,
    //       reiseplaner: true,
    //       trainingsplaner: false,
    //       taktikplaner: true,
    //       saisonplaner: false,
    //     };
    //     break;
    //   case "saison":
    //     userData = {
    //       matchplaner: true,
    //       eventplaner: true,
    //       reiseplaner: true,
    //       trainingsplaner: false,
    //       taktikplaner: false,
    //       saisonplaner: true,
    //     };
    //     break;
    //   case "premium":
    //     userData = {
    //       matchplaner: true,
    //       eventplaner: true,
    //       reiseplaner: true,
    //       trainingsplaner: true,
    //       taktikplaner: true,
    //       saisonplaner: true,
    //     };
    //     break;

    //   default:
    //     break;
    // }
    // dispatch(update(userData));
    localStorage.removeItem("newPackage");
  }

  // set firstVisit to false, if user is logged in the first time (and has submit a package)
  if (user.firstVisit === true) {
    // const userData = {
    //   firstVisit: false,
    // };
    // dispatch(update(userData));
  }

  return (
    <>
      <Typography variant="mainHeader">
        Vielen Dank für Ihre Bestellung!
      </Typography>
      <Link className="pointer" href="/coach">
        Zurück zum Dashboard...
      </Link>
    </>
  );
}

export default SuccessPaymentCoach;
