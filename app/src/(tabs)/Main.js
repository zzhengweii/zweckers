import "../styles/Main.css";
import SidePanel from "./SidePanel";
import Dashboard from "./Dashboard";
import Chatbot from "./Chatbot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Main() {
  return (
    <Router>
      <div className="MainContainer">
        {/* Side Panel Bar */}
        <SidePanel />

        {/* Conditional rendering for active view */}
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Default route */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Main;
