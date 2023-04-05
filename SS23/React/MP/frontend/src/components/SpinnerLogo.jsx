import Logo from "../images/mp-logo-round.png";
import { Modal } from "@mui/material";

function SpinnerLogo() {
  return (
    <Modal
      open={true}
      sx={{
        position: "fixed",
        top: "-84px", // negative offset (header), so that logo is centered
        right: "0",
        bottom: "0",
        left: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "5000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        className="loadingContent"
        src={Logo}
        alt="Loading..."
        sx={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </Modal>
  );
}

export default SpinnerLogo;
