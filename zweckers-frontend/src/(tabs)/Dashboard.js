import '../styles/Dashboard.css';
import React, { useState } from 'react';

function Dashboard() {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    // Handle file input change
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".xlsx"))) {
            setFile(selectedFile);
            setUrl(""); // Clear the URL input
            console.log("File selected:", selectedFile);
        } else {
            alert("Only CSV and XLSX files are supported.");
        }
    };

    // Handle drag-and-drop events
    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".xlsx"))) {
            setFile(droppedFile);
            setUrl(""); // Clear the URL input
            console.log("File dropped:", droppedFile);
        } else {
            alert("Only CSV and XLSX files are supported.");
        }
    };

    // Handle URL input change
    const handleUrlChange = (event) => {
        const inputUrl = event.target.value;
        setUrl(inputUrl);
        setFile(null); // Clear the file state
        console.log("URL entered:", inputUrl);
    };

    // Handle "Let's Go" button click
    const handleLetsGoClick = () => {
        if (file) {
            console.log("Processing file:", file.name);
            // Add your file upload logic here
        } else if (url) {
            console.log("Processing URL:", url);
            // Add your URL processing logic here
        }
    };

    return (
        <div>
            {/* URL/File Box */}
            <div className="URLBox">
                {/* File Upload Button */}
                <button
                    className="AttachButton" 
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    <ion-icon name="attach"></ion-icon>
                </button>
                <input 
                    type="file" 
                    id="fileInput" 
                    style={{ display: 'none' }} 
                    accept=".csv,.xlsx"
                    onChange={handleFileChange}
                />

                {/* URL Form */}
                <form className="URLForm">
                    <label htmlFor="url"></label>
                    <input 
                        type="text" 
                        id="url" 
                        placeholder="Insert your URL here"
                        className="URLInput" 
                        value={url}
                        onChange={handleUrlChange}
                    />
                </form>
            </div>

            {/* Drag-and-Drop Board */}
            <div 
                className="Board"
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
            >
                <p className="BoardHeader">Ready to get started? Attach your file or paste a URL.</p>
                <p className="BoardSubtitle">Only CSV and XLSX files are supported. Web links are supported as well.</p>
                {file && <p className="FileName">Selected File: {file.name}</p>}
                {url && <p className="UrlName">Entered URL: {url}</p>}

                {/* "Let's Go" Button */}
                <button 
                    className="LetsGoButton" 
                    onClick={handleLetsGoClick}
                    disabled={!file && !url}
                >
                    Let’s Go
                </button>
            </div>

        </div>
    );
}

export default Dashboard;
