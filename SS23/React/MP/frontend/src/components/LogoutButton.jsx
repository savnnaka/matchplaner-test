import { useEffect, useState } from "react";
import { Logout } from "@mui/icons-material";

const LogoutButton = ({ handleLogout }) => {
  // const [lastActive, setLastActive] = useState(Date.now());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (Date.now() - lastActive > 1000 * 60 * 60) {
  //       // perform logout after 1 hour of inactivity
  //       console.log("Logout due to 1 hour of inactivity");
  //       console.log("zuletzt aktiv (date): ", Date(lastActive));
  //       console.log("zuletzt aktiv vor: ", Date.now() - lastActive);
  //       handleLogout();
  //     }
  //   }, 1000 * 60 * 10); // check every 10 minutes

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [lastActive]);

  // nur der obere Teil loggt einfach nach einer Stunde aus
  // mit dem unteren Teil gibt es einen infinite loop

  // useEffect(() => {
  //   // Update the last active time whenever the component is rendered
  //   console.log("Neu geladen");
  //   setLastActive(Date.now());
  // });

  return (
    // <IconButton onClick={onLogout}>
    <Logout onClick={handleLogout} />
    // {/* </IconButton> */}
  );
};

export default LogoutButton;
