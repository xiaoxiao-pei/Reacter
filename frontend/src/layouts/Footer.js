import React from "react";
import { ModeContext } from "../App";

function Footer() {
  const [isDark, setIsDark] = React.useContext(ModeContext);

  const footerDark = {
    backgroundColor: "black",
    color: "#C2DCB1",
  };

  const footerLight = {
    backgroundColor: "#C2DCB1",
    color: "black",
  };

  return (
    <footer style={isDark ? footerDark : footerLight}>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <p>&copy; Copy by Reacter</p>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <p>Address: 123 Boulevard DesJadins</p>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <p>Phone: +1 514-111-1234</p>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <p>Email: reacter@gmai.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
