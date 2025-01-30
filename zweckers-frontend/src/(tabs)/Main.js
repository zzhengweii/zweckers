import { useState } from 'react';
import '../styles/Main.css';
import SidePanel from './SidePanel';
import Dashboard from './Dashboard';
import Chatbot from './Chatbot';

function Main() {
  const [activeView, setActiveView] = useState('dashboard'); // Default view

  return (
    <div className="MainContainer">
      {/* Side Panel Bar */}
      <SidePanel setActiveView={setActiveView} activeView={activeView} />

      {/* Conditional rendering for active view */}
      <div className="MainContent">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'chatbot' && <Chatbot />}
      </div>
    </div>
  );
}

export default Main;
