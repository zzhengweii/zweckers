import "../styles/Dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from Flask backend
    axios
      .get("http://127.0.0.1:5001/get_dct")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <iframe
        className="Board"
        src="http://127.0.0.1:5001/view_html"
        title="NER Entities HTML"
      />
    </div>
  );
}

export default Dashboard;
