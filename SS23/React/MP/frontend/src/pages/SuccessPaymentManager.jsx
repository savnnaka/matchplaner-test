import { Typography, Link } from "@mui/material";
import { useState } from "react";

function SuccessPaymentManager() {
  const { user } = useState((state) => state.user);

  // new allocation is set in the step before paying/stripe
  const newAllocation = JSON.parse(localStorage.getItem("newAllocation"));

  // save new value of allocation with user and delete temporary value
  if (newAllocation) {
    // const userData = {
    //   allocation: newAllocation,
    // };
    // dispatch(update(userData));
    localStorage.removeItem("newAllocation");
  }

  // if user is logged in the first time (and submit new allocation), set firstVisit to false
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
      <Link className="pointer" href="/manager">
        Zurück zum Dashboard...
      </Link>
    </>
  );
}

export default SuccessPaymentManager;
