import '../styles/Main.css'
import SidePanel from './SidePanel'
import Dashboard from './Dashboard'

function Main() {
  return (
    <div className="MainContainer">
      {/* Side Panel Bar */}
      <SidePanel className="SidePanel"/>

      {/* Dashboard */}
      <Dashboard className="Dashboard"/>
      {/* Chatbot */}
    </div>
  );
}

export default Main;
