import Logo from "../assets/images/Logo.png";
import "../styles/SidePanel.css";
import { NavLink } from "react-router-dom";

function SidePanel() {
  return (
    <div>
      {/* Side Panel Bar */}
      <div className="SidePanel">
        {/* Zweckers Logo */}
        <div className="FullLogo">
          <img className="LogoImage" src={Logo} alt="ZweckersLogo" />
          <p className="GroupName">zweckers</p>
        </div>

        {/* Dashboard Button */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "Button active" : "Button")}
        >
          <ion-icon name="analytics-outline"></ion-icon>
          <p className="ButtonName">Dashboard</p>
        </NavLink>

        {/* Chatbot Button */}
        <NavLink
          to="/chatbot"
          className={({ isActive }) => (isActive ? "Button active" : "Button")}
        >
          <ion-icon name="chatbox-ellipses"></ion-icon>
          <p className="ButtonName">Chatbot</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SidePanel;
